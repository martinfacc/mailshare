import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import appRouter from './routes/index.js'
import requestValidation from './middlewares/requestValidation.js'

const { APP_PORT, APP_ROUTE } = process.env

const app = express()

app.use(express.json())
app.use(requestValidation)

app.use('/', appRouter)

app.listen(APP_PORT, () => {
	console.log(`Server is running on ${APP_ROUTE}`)
})
