const express = require('express')
const { body, validationResult } = require('express-validator')

const {
	createTask,
	getAllTasks,
	getTasksStatus,
	updateTask,
	deleteTask
} = require('../controllers/tasks.controller')

const {
	taskIdExists,
	taskStatusExists
} = require('../middlewares/tasks.middlewares')

const {
	createTaskValidators,
	updateTaskValidators,
	idValidators
} = require('../middlewares/validators.middlewares')

const tasksRouter = express.Router()

tasksRouter.post('/', createTaskValidators, createTask)
tasksRouter.get('/', getAllTasks)
tasksRouter.get('/:status', taskStatusExists, getTasksStatus)
tasksRouter.patch('/:id', taskIdExists, updateTask)
tasksRouter.delete('/:id', taskIdExists, deleteTask)

module.exports = { tasksRouter }
