const { Task } = require('../models/task.model')
const { User } = require('../models/user.model')

const createTask = async (req, res) => {
	try {
		const { userId, title, limitDate, startDate } = req.body

		const newTask = await Task.create({
			userId,
			title,
			limitDate,
			startDate
		})

		newTask.finishDate = undefined

		res.status(201).json({
			status: 'success',
			data: { newTask }
		})
	} catch (error) {
		console.log(error)
	}
}

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.findAll({
			attributes: [
				'id',
				'title',
				'limitDate',
				'startDate',
				'finishDate',
				'status'
			],
			include: [
				{
					model: User,
					attributes: ['id', 'name', 'email']
				}
			]
		})

		res.status(200).json({
			status: 'success',
			data: {
				tasks
			}
		})
	} catch (error) {
		console.log(error)
	}
}

const getTasksStatus = async (req, res) => {
	try {
		const { status } = req.params

		const task = await Task.findAll({ where: { status } })

		if (!task) {
			return res.status(404).json({
				status: 'error',
				message: 'status not found'
			})
		}

		res.status(200).json({
			status: 'success',
			data: { task }
		})
	} catch (error) {
		console.log(error)
	}
}

const updateTask = async (req, res) => {
	try {
		const { finishDate } = req.body
		const { id, status } = req.params

		const task = await Task.findOne({ where: { id, status: 'active' } })

		if (!task) {
			return res.status(404).json({
				status: 'error',
				message: 'status must to active'
			})
		}

		await task.update({
			finishDate
		})

		const catchFinishDate = task.finishDate.getTime()
		const catchLimitDate = task.limitDate.getTime()

		if (catchFinishDate <= catchLimitDate) {
			task.update({
				status: 'completed'
			})
		} else {
			task.update({
				status: 'late'
			})
		}

		res.status(200).json({
			status: 'success',
			data: { task }
		})
	} catch (error) {
		console.log(error)
	}
}

const deleteTask = async (req, res) => {
	try {
		const { id } = req.params

		const task = await Task.findOne({
			where: { id }
		})

		if (!task) {
			return res.status(404).json({
				status: 'error',
				message: 'Task no found'
			})
		}

		await task.update({
			finishDate: null,
			status: 'cancelled'
		})

		res.status(200).json({
			status: 'success',
			data: { task }
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	createTask,
	getAllTasks,
	getTasksStatus,
	updateTask,
	deleteTask
}
