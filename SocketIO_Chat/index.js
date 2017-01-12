var express = require('express');
var app = express();
app.set("view engine","ejs");
app.set("views","./");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var arrayUseronline = [];
server.listen(process.env.PORT || 3000, () => console.log('listening on *:3000'));

// The event will be called when a client is connected.
io.on('connect', (socket) => {
  console.log('Co nguoi vua ket noi, ID: ', socket.id);
  socket.on("client-send-username",function(data) {
    console.log('Co nguoi vua dang ky la: ' + data);
    if(arrayUseronline.indexOf(data)>=0)
    {
      socket.emit("server-send-register-fail",data);
    }else{
      arrayUseronline.push(data);
      socket.username = data;
      io.sockets.emit("server-send-register-success",{username: data,id: socket.id});
    }

  })

  socket.on("client-send-msg",function(data) {
    io.sockets.emit("server-send-msg",{username: socket.username, msg: data});
    console.log(data);
  })
});

app.get("/",function(req,res){
  res.render("trangchu");
})
