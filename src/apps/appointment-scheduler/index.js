import { send } from '../../nodemailer.js'
import { getTemplate, getAttachments } from '../index.js'

const APP_NAME = 'appointment-scheduler'

export const resetPassword = async (request, response, next) => {
	try {
		console.log({ body: request.body })
		const { to, data } = request.body

		const subject = 'Cambiar contraseña | Appointment Scheduler'
		const text = 'Appointment Scheduler'

		const params = {
			app: APP_NAME,
			template: 'resetPassword',
			data,
		}
		const html = await getTemplate(params)
		const attachments = await getAttachments(params)

		const status = await send({
			to,
			subject,
			text,
			html,
			attachments,
		})

		response.status(200).json(status)
	} catch (error) {
		next(error)
	}
}

export default []
