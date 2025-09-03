import { type Book } from './documented_types'

export async function bookCreatedOrUpdated(book: Book): Promise<void> {
  console.log('Book created or updated:', book.id)
}