require("dotenv").config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')

const port = process.env.PORT
const uri = process.env.DB_CONNECTION_STRING

const app = express()

const mongoose = require('mongoose')

const ConnectMongoDB = async() => {
  try {
    await mongoose.connect(uri)
    console.log("Successfully connected to MongoDB!");
  } catch(error){
    console.error(error);
  }
}

ConnectMongoDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', router)

app.listen(port, () => {console.log(`Server started on port ${port}`)})
