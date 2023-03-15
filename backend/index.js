const http = require("http");
const cors = require("cors");
const express = require("express");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 5000;

const USERS = [{}];

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.send("It's working!");
})

const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
	console.log("New connection");

	socket.on('joined', (data) => {
		USERS[socket.id] = data.user;
		console.log(`${data.user} has joined`);
		socket.broadcast.emit('userJoined', {user:'Admin', message:`${USERS[socket.id]} has joined Chit-Chat`});
		socket.emit('welcome', {user:'Admin', message: `Welcome ${USERS[socket.id]} to Chit-Chat`});
	});

	socket.on('message', ({message, id}) => {
		io.emit('sendMessage', {user: USERS[id], message, id})	
	})

	socket.on('disconnectd', () => {
		socket.broadcast.emit('leave', {user: 'Admin', message: `${USERS[socket.id]} has left`});
		console.log(`${USERS[socket.id]} left`);
	})
})

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})