const { initModels } = require('./models/initModels')
const dotenv = require('dotenv')
const { app } = require('./app')

const { db } = require('./utils/database.util')

dotenv.config()

const startServer = async () => {
	try {
		await db.authenticate()

		initModels()

		await db.sync()

		const PORT = 7530

		app.listen(PORT, () => {
			console.log('Express app running!')
		})
	} catch (error) {
		console.log(error)
	}
}

startServer()
