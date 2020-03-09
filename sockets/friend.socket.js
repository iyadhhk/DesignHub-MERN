//. here the server listen to event : 'send work request' of the client then send it to second client
module.exports = (io, socket) => {
  socket.on('sendWorkRequest', data => {
    console.log(data);
    io.to(data.user2Id).emit('newRequest', {
      name: data.myName,
      id: data.myId,
    });
  });
};
