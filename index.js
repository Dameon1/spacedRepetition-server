"use strict";

//requirements
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const { PORT, CLIENT_ORIGIN } = require("./config");
const { dbConnect } = require("./db-mongoose");
const { router: usersRouter } = require("./auth/users");
const { router: passportRouter } = require("./auth/passport");
const { router: questionRouter } = require("./questions/route");
const jwtStrategy = require("./auth/jwtStrategy");
const app = express();

//middleware
passport.use(jwtStrategy);
app.use(
  morgan(process.env.NODE_ENV === "production" ? "common" : "dev", {
    skip: () => process.env.NODE_ENV === "test"
  })
);
app.use(express.json());
app.use(cors({ origin: CLIENT_ORIGIN }));
app.options("*", cors());

//routes

app.use("/api/question", questionRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", passportRouter);

//server function
function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on("error", err => {
      console.error("Express failed to start");
      console.error(err);
    });
}

//start server
if (require.main === module) {
  dbConnect().then(instance => {
    const conn = instance.connections[0];
    console.info(
      `Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`
    );
    runServer();
    console.log(`Server runing on ${PORT}`);
  });
}

module.exports = { app, runServer };
