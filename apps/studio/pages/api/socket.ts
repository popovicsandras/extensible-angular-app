import { enbleCors } from 'server/cors';
import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server, {
      cors: {
        origin: "*"
      }
    });
    res.socket.server.io = io;

    io.on('connection', socket => {
      console.log('connection', socket.nsp.name);
      socket.on('updated', msg => {
        console.log(msg);
        socket.broadcast.emit('refresh', msg)
      })
    })
  }

  enbleCors(req, res);
  res.end()
}

export default SocketHandler
