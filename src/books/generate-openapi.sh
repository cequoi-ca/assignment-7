#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOCK_FILE="$SCRIPT_DIR/.openapi-generation.lock"
SWAGGER_FILE="$SCRIPT_DIR/build/swagger.json"
CLIENT_DIR="$SCRIPT_DIR/client"
CHECKSUM_FILE="$SCRIPT_DIR/.openapi-checksum"
MAX_WAIT=60  # Maximum wait time in seconds
echo "$CHECKSUM_FILE"

# Function to cleanup lock file on exit
cleanup() {
    if [ -f "$LOCK_FILE" ] && [ "$(cat "$LOCK_FILE" 2>/dev/null)" = "$$" ]; then
        rm -f "$LOCK_FILE"
    fi
}

# Set trap to cleanup on script exit
trap cleanup EXIT INT TERM

# Function to calculate checksum
calculate_checksum() {
    if command -v md5sum >/dev/null 2>&1; then
        md5sum "$1" | cut -d' ' -f1
    else
        # macOS uses md5 instead of md5sum
        md5 -q "$1"
    fi
}

# Function to acquire lock
acquire_lock() {
    local wait_count=0
    
    while true; do
        # Try to create lock file atomically
        if (set -C; echo $$ > "$LOCK_FILE") 2>/dev/null; then
            # Lock acquired successfully
            return 0
        fi
        
        # Lock file exists, check if process is still running
        local pid=$(cat "$LOCK_FILE" 2>/dev/null)
        if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
            if [ $wait_count -eq 0 ]; then
                echo "OpenAPI generation already in progress (PID: $pid). Waiting..."
            fi
            sleep 1
            wait_count=$((wait_count + 1))
            
            # Check for timeout
            if [ $wait_count -gt $MAX_WAIT ]; then
                echo "Timeout waiting for lock. Exiting."
                exit 1
            fi
        else
            # Process is not running, remove stale lock
            echo "Removing stale lock file..."
            rm -f "$LOCK_FILE"
        fi
    done
}

# Acquire lock before proceeding
acquire_lock

# Save the old swagger.json checksum if it exists
OLD_SWAGGER_CHECKSUM=""
if [ -f "$SWAGGER_FILE" ]; then
    OLD_SWAGGER_CHECKSUM=$(calculate_checksum "$SWAGGER_FILE")
fi

# Generate OpenAPI spec and routes
echo "[$$] Generating OpenAPI specification and routes..."
npx tsoa spec-and-routes

# Check if swagger.json was generated
if [ ! -f "$SWAGGER_FILE" ]; then
    echo "[$$] Error: swagger.json was not generated"
    exit 1
fi

# Calculate new checksum of swagger.json
NEW_SWAGGER_CHECKSUM=$(calculate_checksum "$SWAGGER_FILE")

# Read previous checksum from file if exists
SAVED_CHECKSUM=""
if [ -f "$CHECKSUM_FILE" ]; then
    SAVED_CHECKSUM=$(cat "$CHECKSUM_FILE")
fi

# Check if client generation is needed
# Skip if: 1) swagger hasn't changed from before tsoa run, OR 
#          2) new swagger matches saved checksum AND client exists
if [ "$OLD_SWAGGER_CHECKSUM" = "$NEW_SWAGGER_CHECKSUM" ] || \
   ([ "$NEW_SWAGGER_CHECKSUM" = "$SAVED_CHECKSUM" ] && [ -d "$CLIENT_DIR" ] && [ -f "$CLIENT_DIR/package.json" ]); then
    echo "[$$] OpenAPI spec unchanged. Client is up-to-date. Skipping generation."
else
    echo "[$$] Generating TypeScript client..."
    npx @openapitools/openapi-generator-cli generate -i "$SWAGGER_FILE" -o "$CLIENT_DIR" -g typescript-fetch
    
    # Save the checksum for future comparisons
    echo "$NEW_SWAGGER_CHECKSUM" > "$CHECKSUM_FILE"
fi

echo "[$$] OpenAPI generation completed."