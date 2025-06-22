const express = require('express')
const path = require('path')
const multiparty = require('multiparty')
const fse = require('fs-extra')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
