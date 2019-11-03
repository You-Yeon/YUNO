// yuno_server.js

var express = require('express');
var app = express();
var http = require('http').Server(app); 
var io = require('socket.io')(http);    

// var session = require('express-session');
// var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   store: new FileStore()
// }));

app.use(bodyParser.urlencoded({ sextended: false }));
app.use(cookieParser());

var user_name = new Array(new Array());
var user_num = new Array(new Array());
var user_wins = new Array(new Array());
var user_losses = new Array(new Array());
var user_socketID = new Array(new Array());
var user_state = new Array(new Array());
var room_idx;
var name;
var win;
var lose;
var state;
// var num;

//-------------------------------------------

// user_name[0][0] = 1;
// user_name[0][1] = 1;
// user_name[0].push(1);
// user_name[0].push(1);
// user_name[1] = new Array();
// user_name[1][0] = 1;
// user_name[1].push(1);
// user_name[1].push(1);
// user_name[1].push(1);

app.get('/',function(req, res){  

  res.send(`<script> alert("잘못된 접근"); history.back(); </script>`);

});

app.post('/',function(req, res){  

  name = req.param('name');
  win = req.param('win');
  lose = req.param('lose');

  //make cookie
  res.cookie('NAME',name);

  // check room number && make array
  for( var i = 0; i < user_name.length; i++){
    if(user_name[i].length < 4){
      room_idx = i;
      break;
    } else if (i == user_name.length-1){
      room_idx = i+1;
      if(user_name[room_idx] === undefined){
          user_name[room_idx] = new Array();
          user_num[room_idx] = new Array();
          user_wins[room_idx] = new Array();
          user_losses[room_idx] = new Array();
          user_socketID[room_idx] = new Array();
          user_state[room_idx] = new Array();
        }
      break;
    }
  }

  //push values
  user_name[room_idx].push(name);
  for( var i = 1; i < 5; i++){
    if(user_num[room_idx].indexOf(i) == -1){
      user_num[room_idx].push(i);
      num = i;
      break;
    }
  }
  user_wins[room_idx].push(win);
  user_losses[room_idx].push(lose);
  if(user_state[room_idx].length == 0){
    user_state[room_idx].push('host');
    state = 'host';
  } else{
    user_state[room_idx].push('unready');
    state = 'unready'
  }

  // res.send(`${user_num[room_idx]}`);
  res.sendFile(__dirname + '/game_room.html');

});

//----------------------------------------------------------

// app.post('/game', function(req, res){
//
//   g_room_idx = req.param('room_num');
//   g_name = req.param('user_name');
//   g_num = req.param('user_num');
//   g_state = req.param('user_state');
//
//   console.log(req.param('room_num'));
//   console.log(req.param('user_name'));
//   console.log(req.param('user_state'));
//   console.log(req.param('user_num'));
//   console.log(req.param('user_socketID'));
//
//   res.sendFile(__dirname + '/main_game.html');
// });

//-----------------------------------------------------------

app.get('/img', function(req, res){
  res.sendFile(__dirname + '/images/1.png');
});

app.get('/num1', function(req, res){
  res.sendFile(__dirname + '/assets/num_button_1.png');
});

app.get('/num2', function(req, res){
  res.sendFile(__dirname + '/assets/num_button_2.png');
});

app.get('/num3', function(req, res){
  res.sendFile(__dirname + '/assets/num_button_3.png');
});

app.get('/num4', function(req, res){
  res.sendFile(__dirname + '/assets/num_button_4.png');
});


io.on('connection', function(socket){

  //push values
  if(Array.isArray(user_socketID[room_idx])){
    user_socketID[room_idx].push(socket.id);
  }

  var room_num = room_idx;

  console.log('user connected: ', socket.id);
  io.to(socket.id).emit('set name',name);
  io.to(socket.id).emit('set state',state);

  //set values
  for( var i = 0; i < user_socketID[room_num].length; i++){
    io.to(user_socketID[room_num][i]).emit('clear');
    io.to(user_socketID[room_num][i]).emit('receive message',name + '님이 입장하셨습니다.');
    for( var j = 0; j < user_name[room_num].length; j++){
        io.to(user_socketID[room_num][i]).emit('change value',user_name[room_num][j], user_wins[room_num][j], user_losses[room_num][j], user_state[room_num][j], user_num[room_num][j]);
    }
  }

  socket.on('disconnect', function(){

    console.log('user disconnected: ', socket.id);

    for( var i = 0; i < user_socketID[room_num].length; i++){
      io.to(user_socketID[room_num][i]).emit('receive message',name + '님이 퇴장하였습니다.');
    }

    //del data
    var temp = user_socketID[room_num].indexOf(socket.id);

    user_name[room_num].splice(temp,1);
    user_num[room_num].splice(temp,1);
    user_wins[room_num].splice(temp,1);
    user_losses[room_num].splice(temp,1);
    user_state[room_num].splice(temp,1);
    user_socketID[room_num].splice(temp,1);

    //set host
    if(user_state[room_num].length != 0){
      user_state[room_num][0] = 'host';
      state = 'host';

      io.to(user_socketID[room_num][0]).emit('set state',state);
    }

    //set values
    for( var i = 0; i < user_socketID[room_num].length; i++){
      io.to(user_socketID[room_num][i]).emit('clear');
      for( var j = 0; j < user_name[room_num].length; j++){
          io.to(user_socketID[room_num][i]).emit('change value',user_name[room_num][j], user_wins[room_num][j], user_losses[room_num][j], user_state[room_num][j], user_num[room_num][j], user_num[room_num].length);
      }
    }

  });

  socket.on('check_state', function(){

    //check member
    if( user_socketID[room_num].length == 1 ){ // member < 2
      io.to(socket.id).emit('less member');
    }
    else{ // member >= 2
      if( user_state[room_num].indexOf('unready') != -1){ // unready true
        io.to(socket.id).emit('unready member');
      }
      else{ // start  
        for( var i = 0; i < user_socketID[room_num].length; i++){
          io.to(user_socketID[room_num][i]).emit('start', user_name.length, user_name[room_num][i], user_state[room_num][i], user_num[room_num][i], user_num[room_num].length);
        }

      }
    }

  });

  socket.on('ready', function(){
    //change value
    var temp = user_socketID[room_num].indexOf(socket.id);
    user_state[room_num][temp] = 'ready';
    state = 'ready';
    io.to(socket.id).emit('set state',state);

    //set values
    for( var i = 0; i < user_socketID[room_num].length; i++){
      io.to(user_socketID[room_num][i]).emit('clear');
      for( var j = 0; j < user_name[room_num].length; j++){
          io.to(user_socketID[room_num][i]).emit('change value',user_name[room_num][j], user_wins[room_num][j], user_losses[room_num][j], user_state[room_num][j], user_num[room_num][j]);
      }
    }
  });

  socket.on('unready', function(){
    //change value
    var temp = user_socketID[room_num].indexOf(socket.id);
    user_state[room_num][temp] = 'unready';
    state = 'unready';
    io.to(socket.id).emit('set state',state);

    //set values
    for( var i = 0; i < user_socketID[room_num].length; i++){
      io.to(user_socketID[room_num][i]).emit('clear');
      for( var j = 0; j < user_name[room_num].length; j++){
          io.to(user_socketID[room_num][i]).emit('change value',user_name[room_num][j], user_wins[room_num][j], user_losses[room_num][j], user_state[room_num][j], user_num[room_num][j]);
      }
    }
  });

  socket.on('send message', function(name,text){
    var msg = name + ' : ' + text;
    console.log(msg);
    for( var i = 0; i < user_socketID[room_num].length; i++){
      io.to(user_socketID[room_num][i]).emit('receive message', msg);
    }
  });

});

http.listen(9877, function(){ //4
  console.log('server on!');
});
