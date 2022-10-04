import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import nodemailer from 'nodemailer'
import path from 'path'
import { welcome as welcomeTemplate } from './template.js'

const {
	APP_PORT,
	MAIL_HOST,
	MAIL_PORT,
	MAIL_USERNAME,
	MAIL_PASSWORD,
	MAIL_FROM_ADDRESS,
	MAIL_FROM_NAME,
} = process.env

const __dirname = path.resolve()

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

	const status = await transporter.sendMail({
		from: `"${MAIL_FROM_NAME}" < ${MAIL_FROM_ADDRESS}>`,
		to,
		subject,
		text,
		html: '<h1>Mailshare</h1>',
	})

	console.log({ status })

	response.send('Mail sent')
})

app.get('/attachment', (request, response) => {
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

	const status = transporter.sendMail({
		from: `"${MAIL_FROM_NAME}" < ${MAIL_FROM_ADDRESS}>`,
		to,
		subject,
		text,
		html: welcomeTemplate,
		attachments: [
			{
				filename: 'logo.png',
				path: __dirname + '/public/logo.png',
				cid: 'logo',
			},
		],
	})

	console.log({ status })

	response.send('Mail sent')
})

app.listen(APP_PORT, () => {
	console.log(`Server is running on http://localhost:${APP_PORT}`)
})
