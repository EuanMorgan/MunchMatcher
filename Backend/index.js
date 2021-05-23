const express = require("express");
const { userJoin } = require("./utils/users");

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ userID, username, roomID }) => {
    console.log(`${username} joined room ${roomID}`);
    const user = userJoin(userID, roomID, username);

    console.log(user);

    socket.join(user.room);

    io.to(user.room).emit("newJoin", `${user.username} joined`);

    socket.on("disconnect", () => {
      io.to(user.room).emit("newJoin", `${user.username} has left`);
    });
  });
});

server.listen(port, () => console.log(`listening on port ${port}`));
