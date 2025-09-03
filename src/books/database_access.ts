import { type Collection, type Db, MongoClient } from 'mongodb'
// We are importing the book type here, so we can keep our types consistent with the front end
import { type Book } from '../documented_types'

// This is the connection string for the mongo database in our docker compose file
// We're using process.env to detect if a different mongo uri is set, primarily for testing purpuses
const uri = process.env.MONGO_URI ?? 'mongodb://mongo-books'

// This is the collection name for the mongo database in our docker compose file
const bookCollectionName = process.env.BOOK_COLLECTION_NAME ?? 'books'

// We're setting up a client, opening the database for our project, and then opening
// a typed collection for our books.
export const client = new MongoClient(uri)

// We're moving the setup of the database and collections into a function with a returned value,
// to allow us to isolate them in tests

export interface BookDatabaseAccessor {
  database: Db
  books: Collection<Book>
}

export interface AppBookDatabaseState {
  books: BookDatabaseAccessor
}

export function getBookDatabase(dbName?: string): BookDatabaseAccessor {
  const database = client.db(dbName ?? Math.floor(Math.random() * 100000).toPrecision().toString())
  const books = database.collection<Book>(bookCollectionName)

  return {
    database,
    books
  }
}

if (import.meta.vitest !== undefined) {
  const { test, expect } = import.meta.vitest

  test('Can Setup Test DB', () => {
    const { database } = getBookDatabase()
    expect(database.databaseName, `URI: ${uri}, DB: ${database.databaseName}`).not.toEqual('mcmasterful-books')
  })
}
