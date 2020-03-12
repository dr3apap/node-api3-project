const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");
const logger = require("./Logger/loggerMiddleWare");

const server = express();

// server.use(morgan("short"));
// server.use(helmet());
server.use(express.json());

server.use("/api/posts", logger, postRouter);
server.use("/api/users", logger, userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
