import express from 'express'
import { resetPassword } from '../apps/appointment-scheduler/index.js'

const appRouter = express.Router()

appRouter.post('/appointment-scheduler/reset-password', resetPassword)

export default appRouter
