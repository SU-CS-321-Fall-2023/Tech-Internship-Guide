require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const mongoose = require("mongoose");
const { testPasswordHelper } = require("./password-helper");

const port = process.env.PORT || 4000;
const uri = process.env.DB_CONNECTION_STRING

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
    },
    store: store,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["*", "http://127.0.0.1:54579", "http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", router);

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await testPasswordHelper();
});
