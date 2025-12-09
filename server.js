import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 9005

app.use(express.static(path.join(__dirname, 'dist')))

app.get(/.*/, (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
	console.log('Server Online.')
})
