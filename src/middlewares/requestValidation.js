import dotenv from 'dotenv'
dotenv.config()

const { APP_TOKEN } = process.env

const requestValidation = (request, response, next) => {
	const appToken = request.headers['app-token']
	if (appToken === APP_TOKEN) return next()
	response.status(403).end()
}

export default requestValidation
