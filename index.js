const exp = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = exp();
const server = http.createServer(app);

const io = new Server(server);



io.on("connection", (socket) => {
    console.log("A new user connected:", socket.id);
    
    socket.on("message_send_to_server", (message) => {
        console.log("Message received:", message);
        io.emit("message_from_server", message);
    });
});

app.use(exp.static(path.resolve("")));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/check', (req, res) => {
    res.json({
        name: "brahma",
        message: "Hi browser, I am the server"
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
