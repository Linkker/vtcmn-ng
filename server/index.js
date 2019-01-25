const http = require('http');
var debug = require('debug')('angular2-nodejs:server');
const app = require('./app');

const port = process.env.PORT || 3001;

const server = http.createServer(app);

var io = require('socket.io').listen(server);

server.listen(port);


//Chat
//const chatRooms = ["trungtam", "noidung", "tonghop", "thehien", "hkcn"];
var listUser =[]
io.on('connection',(socket)=>{
  console.log('new connection made.');

  socket.on('join', function(data){
    //joining
    if(listUser.findIndex(x=>x.user===data.user)!=-1){
      socket.leave(listUser.findIndex(x=>x.user===data.user).room);
      listUser.splice(listUser.findIndex(x=>x.user===data.user),1);
      console.log('tìm thấy và xóa')
    };
    //socket.leave(data.room);
    //listUser.splice(listUser.findIndex,1);

      socket.join(data.room);
      listUser.push(data);
      console.log('ten duoc them');
      //var list = [];
      //list = listUser.filter(u=>u.room===data.room);
      console.log(data.user + 'joined the room : ' + data.room);
      socket.broadcast.to(data.room).emit('new message', {user:data.user, message:'-- Vừa đăng nhập phòng chat --'});
      console.log(listUser);
      //sockets.to(data.room).emit('getList', listUser);
      io.sockets.emit('getlist', listUser);
  });

  socket.on('leave', function(data){
    console.log(data.user + 'left the room : ' + data.room);
    let findIndex=listUser.findIndex(x=>x.user===data.user);
    console.log('-- tim logout -->'+findIndex);
    listUser.splice(findIndex,1);
    //io.in(data.room).emit('new message', {user:data.user, message:'-- Đã thoát phòng chat --'});
    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'-- Vừa thoát --'});
    socket.leave(data.room);
    socket.broadcast.emit('getlist', listUser);
    //sockets.to(data.room).emit('getList', listUser);
    //io.in(data.room).emit('getlist', listUser);
  });

  socket.on('message',function(data){
    io.in(data.room).emit('new message', {user:data.user, message:data.message});
  })
});

/**
* Listen on provided port, on all network interfaces.
*/

server.on('error', onError);
server.on('listening', onListening);

/**
* Normalize a port into a number, string, or false.
*/

function normalizePort(val) {
var port = parseInt(val, 10);

if (isNaN(port)) {
  // named pipe
  return val;
}

if (port >= 0) {
  // port number
  return port;
}

return false;
}

/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
if (error.syscall !== 'listen') {
  throw error;
}

var bind = typeof port === 'string'
  ? 'Pipe ' + port
  : 'Port ' + port;

// handle specific listen errors with friendly messages
switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
}
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
var addr = server.address();
var bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + addr.port;
debug('Listening on ' + bind);
}

//Thông báo server đang chạy
console.log('Server started at port: ',port);
