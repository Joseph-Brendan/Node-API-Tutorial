const express = require('express')
const app = express()
const authUrls = require('./api/auth')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const lapUrl = require('./lap')


dotenv.config()

mongoose.connect(process.env.DB_CONNECTION,
{ useUnifiedTopology: true }, () => console.log('DB has been connected'))

app.use(express.json())
app.use('/api/auth', authUrls)
app.use('/api/lap', lapUrl)

app.listen(3000, () => console.log('Server is running'))


