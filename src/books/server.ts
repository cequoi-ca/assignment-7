import Koa from 'koa'
import cors from '@koa/cors'
import qs from 'koa-qs'
import KoaRouter from '@koa/router'
import bodyParser from 'koa-bodyparser'
import { RegisterRoutes } from './build/routes'
import swagger from './build/swagger.json'
import { type Server, type IncomingMessage, type ServerResponse } from 'node:http'
import { type AppBookDatabaseState, getBookDatabase } from './database_access'

export default async function (port?: number, randomizeDbs?: boolean): Promise<{ server: Server<typeof IncomingMessage, typeof ServerResponse>, state: AppBookDatabaseState }> {
  const bookDb = getBookDatabase(randomizeDbs === true ? undefined : 'mcmasterful-books')

  // TODO enable messaging
  // if (!randomizeDbs && !(global as any).MONGO_URI ) {
  //   await setupMessaging(bookDb);
  // }

  const state: AppBookDatabaseState = {
    books: bookDb,
  }

  const app = new Koa<AppBookDatabaseState, Koa.DefaultContext>()

  app.use(async (ctx, next): Promise<void> => {
    ctx.state = state
    await next()
  })

  // We use koa-qs to enable parsing complex query strings, like our filters.
  qs(app)

  // And we add cors to ensure we can access our API from the mcmasterful-books website
  app.use(cors())

  app.use(bodyParser())

  const koaRouter = new KoaRouter()

  RegisterRoutes(koaRouter)

  app.use(koaRouter.routes())
  app.use(koaRouter.allowedMethods())

  return {
    server: app.listen(port, () => {
      console.log('listening')
    }),
    state
  }
}
