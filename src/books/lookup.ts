import { z } from 'zod'
import { getBookDatabase, type BookDatabaseAccessor } from './database_access'
import { type BookID, type Book } from '../documented_types'
import { type ZodRouter } from 'koa-zod-router'
import { ObjectId } from 'mongodb'

export default  async function getBook (id: BookID, { books }: BookDatabaseAccessor): Promise<Book | false> {
  if (id.length !== 24) {
    console.error('Failed with id: ', id)
    return false
  }
  const result = await books.findOne({ _id: ObjectId.createFromHexString(id.trim()) })
  if (result === null) {
    return false
  }
  const book: Book = {
    id,
    name: result.name,
    author: result.author,
    description: result.description,
    price: result.price,
    image: result.image
  }
  return book
}