const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => console.log(`server on port ${PORT}`))

const io = require('socket.io')(server)
app.use(express.static(path.join(__dirname, 'public')))

let connectedUser = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
  connectedUser.add(socket.id)
  console.log(socket.id);

  io.emit('user-Number', connectedUser.size);


  socket.on('disconnect', () => {
    console.log('Authenticated user disconnected', socket.id);
    connectedUser.delete(socket.id)
    io.emit('user-Number', connectedUser.size);

  })

  socket.on('message', (data) => {
    console.log(data)
    socket.broadcast.emit('chat-message', data)
  })

  
  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
    
  })
  

  
}