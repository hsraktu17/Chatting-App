"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const PORT = 3000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const users = {};
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
        }
        else {
            console.log("Error sending message: Invalid data");
        }
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        delete users[socket.id];
    });
});
server.listen(PORT, () => console.log(`WebSocket server is running on port ${PORT}`));
