import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users: { [key: string]: string } = {};

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  io.on("join", (username) => {
    users[socket.id] = username;
    console.log(`${username} joined ID: ${socket.id}`);
    console.log(users);
  });
});

app.listen(3001, () => console.log("socket.io started"));
