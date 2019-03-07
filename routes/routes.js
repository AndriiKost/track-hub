const express = require('express')
const app = express()

const users = require('./api/users')
const applications = require('./api/applications')

app.use('/users', users);
app.use('/applications', applications);

module.exports = app;