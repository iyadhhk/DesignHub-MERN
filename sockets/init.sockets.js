module.exports = socket => {
  socket.on('joinNotificationsRoom', id => {
    socket.join(id);
    console.log('joined', id);
  });
};

//. here the server join the user to a room specified to him by his id

//. sever listen to user event 'join..' console in the server terminal joined id

//. we send notification to user by joining him to a room taged by his id and communicate to that room because we cant use the user socket (the socket id changes every time the client change the page)
