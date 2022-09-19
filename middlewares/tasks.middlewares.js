const { Task } = require('../models/task.model')

const taskIdExists = async (req, res, next) => {
	try {
		const { id } = req.params

		const task = await Task.findOne({ where: { id } })

		if (!task) {
			return res.status(404).json({
				status: 'error',
				message: 'Task not found'
			})
		}

		req.task = task
		next()
	} catch (error) {
		console.log(error)
	}
}

const taskStatusExists = async (req, res, next) => {
	try {
		const { status } = req.params

		const task = await Task.findOne({ where: { status } })

		if (!task) {
			return res.status(404).json({
				status: 'error',
				message: 'Status not found'
			})
		}

		req.task = task
		next()
	} catch (error) {
		console.log(error)
	}
}

module.exports = { taskIdExists, taskStatusExists }
