import express from 'express'
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
//routes
import movieRoutes from './routes/movieRoutes.js'
import fileUpload from 'express-fileupload'

const app = express()
dotenv.config()

//middlewares
app.use(bodyparser.json({ limit: '30mb', extended: true }))
app.use(bodyparser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(
	fileUpload({
		useTempFiles: true,
	}),
)
//use routes
app.use('/movies', movieRoutes)

//database to mongodb connection
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

//database connection
mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(PORT, () => console.log(`SERVER RUNNING AT ${PORT}`))
	})
	.catch((err) => console.log(err))
