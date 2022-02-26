const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 8080;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("receiveMsg", (msg) => {
    console.log("receiveMsg : " + msg);
    socket.emit("receiveMsg", msg);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
