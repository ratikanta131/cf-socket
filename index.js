let app = require('express')();
let server = require('http').createServer(app);

let io = require('socket.io')(server, {
    cors: {
      origins: ['http://localhost:8100']
    }
  });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', function(){
        io.emit('users-changed', {user: socket.username, event: 'left'});   
    });
    
    socket.on('set-name', (name) => {
        console.log('>>>>> ' + name);
        socket.username = name;
        io.emit('users-changed', {user: name, event: 'joined'});    
    });
    
    socket.on('send-message', (message) => {
        io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
    });

});

server.listen(3000, function(){
    console.log('Server started!');
})