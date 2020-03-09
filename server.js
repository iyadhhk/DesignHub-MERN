const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
//. real time code------------------------------
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// listen to event connection from client=socket
io.on('connection', socket => {
  require('./sockets/init.sockets')(socket);
  require('./sockets/friend.socket')(io, socket);
});

//.real time end -------------------------------
// Connect DATABASE
connectDB();
// init middleware this allows us to get the data in req.body
app.use(express.json({ extended: false }));
app.use(fileUpload());
app.use(express.static(__dirname + '/client/public/uploads'));

app.use(cors());
// enable files upload
// app.use('./uploads', express.static('./client/public/uploads'));

//Define routes
app.use('/api/users', require('./routes/api/users')); // the endpoint is /api/users
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/resources', require('./routes/api/resources'));
app.use('/api/store', require('./routes/api/store'));
app.use('/api/project', require('./routes/api/project'));
app.use('/api/portfolio', require('./routes/api/portfolio'));
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
