const express = require('express')
const { body, validationResult } = require('express-validator')

const {
	createUser,
	getAllUsers,
	updateUser,
	deleteUser
} = require('../controllers/users.controller')

const { userExists } = require('../middlewares/users.middlewares')

const {
	createUserValidators,
	updateUserValidators,
	idValidators
} = require('../middlewares/validators.middlewares')

const usersRouter = express.Router()

usersRouter.post('/', createUserValidators, createUser)
usersRouter.get('/', getAllUsers)
usersRouter.patch('/:id', userExists, updateUserValidators, updateUser)
usersRouter.delete('/:id', userExists, idValidators, deleteUser)

module.exports = { usersRouter }
