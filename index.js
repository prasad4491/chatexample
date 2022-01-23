const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/app.html', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://ec2-13-126-18-30.ap-south-1.compute.amazonaws.com');
  res.sendFile(__dirname + '/app.html');
});
app.get('/socket.io.min.js', (req, res) => {
  res.sendFile(__dirname + '/socket.io.min.js');
});
app.get('/jquery-3.6.0.min.js', (req, res) => {
  res.sendFile(__dirname + '/jquery-3.6.0.min.js');
});
io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
