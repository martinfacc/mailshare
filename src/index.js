import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import nodemailer from 'nodemailer'

const {
	APP_PORT,
	MAIL_HOST,
	MAIL_PORT,
	MAIL_USERNAME,
	MAIL_PASSWORD,
	MAIL_FROM_ADDRESS,
	MAIL_FROM_NAME,
} = process.env

const app = express()

app.get('/', async (request, response) => {
	const { to, subject, text } = request.query

	const transporter = nodemailer.createTransport({
		host: MAIL_HOST,
		port: MAIL_PORT,
		secure: false,
		auth: {
			user: MAIL_USERNAME,
			pass: MAIL_PASSWORD,
		},
	})

	await transporter.sendMail({
		from: `"${MAIL_FROM_NAME}" < ${MAIL_FROM_ADDRESS}>`,
		to,
		subject,
		text,
		html: '<h1>Mailshare</h1>',
	})
	response.send('Email sent')
})

app.listen(APP_PORT, () => {
	console.log(`Server is running on http://localhost:${APP_PORT}`)
})
