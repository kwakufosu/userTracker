import * as express from 'express';
import * as path from 'path';
import { Socket } from 'socket.io';

const app = express();
app.set('port', process.env.PORT || 3000);

let http = require('http').Server(app);
// set up socket.io and bind it to our
// http server.
let io = require('socket.io')(http);

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected

io.on('connection', function (socket: any) {
  console.log('a user connected');

  interface coords {
    latitude: string;
    longitude: string;
  }

  let message: string;

  socket.on('sendLocation', (coords: coords) => {
    socket.emit(
      'locationMessage',
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    console.log(coords);
  });


});

const server = http.listen(3000, function () {
  console.log('listening on *:3000');
});
