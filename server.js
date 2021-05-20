const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path');
const cors = require('cors');


app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
 res.render('first')
})

 app.get('/:roomid', (req, res) => {
   res.render('room', {roomid:req.params.roomid})
 })

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)
    socket.on('send',(data) => {
      socket.to(roomId).emit('receive',{message:data.message,name:data.name})
    });

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  })
})

server.listen(3000)