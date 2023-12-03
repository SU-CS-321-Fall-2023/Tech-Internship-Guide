require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const mongoose = require("mongoose");

const port = process.env.PORT || 4000;
const uri = process.env.DB_CONNECTION_STRING;

const app = express();

const ConnectMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
};

ConnectMongoDB();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const store = new mongoSession({
  uri,
  collection: "userSessions",
});
store.on("error", (err) => console.error(err));

app.use(
  session({
    secret: process.env.SECRET_STRING,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24
    },
    store: store,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});
