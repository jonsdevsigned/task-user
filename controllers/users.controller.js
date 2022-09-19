const { User } = require('../models/user.model.js')
const { Task } = require('../models/task.model')

const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body

		const newUser = await User.create({ name, email, password })

		newUser.password = undefined

		res.status(201).json({
			status: 'success',
			data: { newUser }
		})
	} catch (error) {
		console.log(error)
	}
}

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: ['id', 'name', 'email'],
			where: { status: 'active' },
			include: [
				{
					model: Task,
					attributes: ['id', 'title', 'limitDate', 'startDate', 'finishDate']
				}
			]
		})

		res.status(200).json({
			status: 'success',
			data: {
				users
			}
		})
	} catch (error) {
		console.log(error)
	}
}

const updateUser = async (req, res) => {
	try {
		const { name, email } = req.body
		const { id } = req.params

		const user = await User.findOne({ where: { id } })

		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'User not found'
			})
		}

		await user.update({
			name,
			email
		})

		user.password = undefined

		res.status(200).json({
			status: 'success',
			data: { user }
		})
	} catch (error) {
		console.log(error)
	}
}

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params

		const user = await User.findOne({
			where: { id },
			attributes: ['id', 'name', 'email']
		})

		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'User no found'
			})
		}

		await user.update({
			status: 'disabled'
		})

		res.status(200).json({
			status: 'success',
			data: { user }
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = { createUser, getAllUsers, updateUser, deleteUser }
