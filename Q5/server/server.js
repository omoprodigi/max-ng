const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./src/message');
const {Users} = require('./src/user');

const public = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(public));



io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!params.name.trim().length > 0) {
      return callback('Display Name is required.');
    }

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name);

    io.emit('updateUserList', users.getUserList());
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && message.text.trim().length > 0) {
      io.emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.emit('updateUserList', users.getUserList());
      io.emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(3000, () => {
    console.log('Listening to port 3000');
})
