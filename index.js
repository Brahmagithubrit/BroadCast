const exp = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = exp();
const server = http.createServer(app);

const io = new Server(server);

// Socket.io connection handling
io.on("connection", (socket) => {
    console.log("A new user is connected: ", socket.id);

    // Listen for message from client
    socket.on("message_send_to_server", (message) => {
        console.log("Received message: ", message);

        // Broadcast the message to all connected clients
        io.emit("message_from_server", message);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });
});

// Serve the main HTML file directly from the current directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Test route for basic server functionality
app.get('/check', (req, res) => {
    res.json({
        name: "brahma",
        message: "Hi browser, I am the server."
    });
});

// Start the server
server.listen(5000, () => console.log("Server running on port 5000..."));
