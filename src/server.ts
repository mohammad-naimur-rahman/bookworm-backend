import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

process.on('uncaughtException', err => {
  console.log(`Uncaught exception detected ~ ${err}`)
  process.exit(1)
})

let server: Server

const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`🛢 Database is connected successfully`)

    server = app.listen(config.port, () =>
      console.log(`Application  listening on port ${config.port}`)
    )
  } catch (err) {
    console.log('Failed to connect database', err)
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        console.log(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', err => {
  console.log(`SIGTERM detected ~ ${err}`)
  if (server) {
    server.close()
  }
})
