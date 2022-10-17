import Handlebars from 'handlebars'
import { promises as fs } from 'fs'

export const getTemplate = async ({ app, template: folder, data }) => {
	const route = 'src/apps/' + app + '/templates/' + folder + '/index.hbs'
	const buffer = await fs.readFile(route)
	const template = Handlebars.compile(buffer.toString())
	return template(data)
}

export const getAttachments = async ({ app, template: folder }) => {
	const route = 'src/apps/' + app + '/templates/' + folder + '/attachments'
	const files = await fs.readdir(route, { withFileTypes: true })
	const filteredFiles = files.filter((file) => !file.isDirectory())
	const attachments = filteredFiles.map((file) => ({
		path: route + '/' + file.name,
		filename: file.name,
		cid: file.name.split('.')[0],
	}))
	return attachments
}
