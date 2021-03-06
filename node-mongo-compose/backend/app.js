const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const cors = require('cors')

// Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

// Middlewares
server.use(express.urlencoded({urlencoded: true}))
server.use(express.json())
server.use(cors())

// ODM
const Client = restful.model('Client', {
    name: { type: String, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({ new: true, runValidators: true })

// Routes
Client.register(server, '/clients')

// Start
server.listen(3000)