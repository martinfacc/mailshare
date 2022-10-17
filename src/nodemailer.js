import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

const {
	MAIL_HOST,
	MAIL_PORT,
	MAIL_USERNAME,
	MAIL_PASSWORD,
	MAIL_FROM_ADDRESS,
	MAIL_FROM_NAME,
} = process.env

const config = {
	host: MAIL_HOST,
	port: MAIL_PORT,
	secure: false,
	auth: {
		user: MAIL_USERNAME,
		pass: MAIL_PASSWORD,
	},
}

export const send = async ({ to, subject, text, html, attachments }) => {
	const transporter = nodemailer.createTransport(config)

	const status = await transporter.sendMail({
		from: '"' + MAIL_FROM_NAME + '" <' + MAIL_FROM_ADDRESS + '>',
		to,
		subject,
		text,
		html,
		attachments,
	})

	return status
}
