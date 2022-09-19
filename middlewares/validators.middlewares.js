const { body, validationResult } = require('express-validator')

const checkValidations = (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((err) => err.msg)

		const message = errorMessages.join('. ')

		return res.status(400).json({
			status: 'error',
			message
		})
	}
	next()
}

const createUserValidators = [
	body('name')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isString()
		.withMessage(
			"Name must be a text, can't content numbers or characters specials"
		)
		.isLength({ min: 3, max: 70 })
		.withMessage('Name must be at least 3 characters'),
	body('email')
		.notEmpty()
		.withMessage('Email cannot be empty')
		.isEmail()
		.withMessage('Must provide a valid email'),
	body('password')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isString()
		.withMessage("Password must be a text, can't characters specials")
		.isLength({ min: 8, max: 20 })
		.withMessage('Password must be more than 8 and less than 20 characters'),
	checkValidations
]

const updateUserValidators = [
	body('name')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isString()
		.withMessage(
			"Name must be a text, can't content numbers or characters specials"
		)
		.isLength({ min: 3, max: 70 })
		.withMessage('Name must be at least 3 characters'),
	body('email')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isEmail()
		.withMessage('Must provide a valid email'),
	checkValidations
]

const createTaskValidators = [
	body('userId')
		.notEmpty()
		.withMessage('User Id cannot be empty')
		.isNumeric()
		.withMessage('User Id must be a number'),
	body('title')
		.notEmpty()
		.withMessage('Title cannot be empty')
		.isString()
		.withMessage('Title must be a text'),
	body('limitDate').notEmpty().withMessage('Limit date cannot be empty'),
	body('startDate').notEmpty().withMessage('Start date cannot be empty'),
	checkValidations
]

const updateTaskValidators = [
	body('finishtDate').notEmpty().withMessage('Limit date cannot be empty'),
	checkValidations
]

const idValidators = [
	body('id')
		.notEmpty()
		.withMessage('Id cannot be empty')
		.isNumeric()
		.withMessage('Id must be a number'),
	checkValidations
]

module.exports = {
	createUserValidators,
	updateUserValidators,
	createTaskValidators,
	updateTaskValidators,
	idValidators
}
