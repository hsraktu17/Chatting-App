import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server);

const users: { [key: string]: string } = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join", (username) => {
    users[socket.id] = username;
    console.log(`${username} joined with ID: ${socket.id}`);
    console.log(users);
  });

  socket.on("private", ({ receiver, message }) => {
    const senderUsername = users[socket.id];
    const receiverName = users[receiver];
    if (senderUsername && receiver && message) {
      io.to(receiver).emit("private", {
        receiver: receiverName,
        sender: senderUsername,
        message,
      });
    } else {
      console.log("Error sending message: Invalid data");
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id];
  });
});

server.listen(PORT, () =>
  console.log(`WebSocket server is running on port ${PORT}`),
);
