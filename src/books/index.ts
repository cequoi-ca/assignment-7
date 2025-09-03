import server from './server'

const port = process.env.BOOKS_PORT ?? '3000';
server(parseInt(port)).then(({ server, state }) => {
  console.log(`[Books Service] Started on port ${port}`)
}).catch((err) => {
  console.error('[Books Service] Failed to start:', err)
}
)
