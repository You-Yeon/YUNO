// server.js

var express = require('express');
var app = express();
var routes = require('./img_routes'); // img routers
app.use('/',routes);

var http = require('http').Server(app); 
var io = require('socket.io')(http);    
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

var g_user_name = new Array(new Array());
var g_user_num = new Array(new Array());
var g_user_state = new Array(new Array());
var g_user_socketID = new Array(new Array());
// var g_user_cnt = new Array();
var g_sort_chk = new Array();
var g_name;
var g_num;
var g_cnt;

var room_count = 0;
var io_room_count = 0;

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

app.get('/',function(req, res){  //2

  res.send(`<script> alert("잘못된 접근"); history.back(); </script>`);

});

app.post('/',function(req, res){ 

  g_name = req.param('user_name');
  g_num = req.param('user_num');
  g_state = req.param('user_state');
  g_cnt = req.param('user_cnt');

  console.log("cookie name :" + req.cookies.NAME);
  console.log("user_name :" + req.param('user_name'));
  console.log("user_num :" + req.param('user_num'));
  console.log("user_state :" + req.param('user_state'));
  console.log("user_cnt :" + req.param('user_cnt'));

  // make array
  if(g_user_name[room_count] === undefined){

    g_user_name[room_count] = new Array();
    g_user_num[room_count] = new Array();
    g_user_state[room_count] = new Array();
    g_user_socketID[room_count] = new Array();
  }

  // set cookie
  res.cookie('CNT',g_cnt);
  res.cookie('P_NUM',g_num);
  res.cookie('R_NUM',room_count);

  // check room number
  if (g_user_name[room_count].length < g_cnt - 1){

    g_user_name[room_count].push(g_name);
    g_user_num[room_count].push(g_num);
    g_user_state[room_count].push(g_state);
  }
  else{

    g_user_name[room_count].push(g_name);
    g_user_num[room_count].push(g_num);
    g_user_state[room_count].push(g_state);
    // g_user_cnt.push(g_cnt);

    room_count++;
  }

  res.sendFile(__dirname + '/main_game.html');

});

//----------------------------------------------------------

app.get('/phaser.min.js', function(req, res){ // phaser 3.7.x
  res.sendFile(path.resolve('../../phaser.min.js'));
});

app.get('/game.js', function(req, res){ // in game
  res.sendFile(__dirname + '/game.js');
});

//----------------------------------------------------------

var ArraySort = function(room_num){

  console.log("sorting..");

  var temp;

  // num sorting
  for ( var i = 0; i < g_user_name[room_num].length - 1; i++){
    for ( var j = 0; j < g_user_name[room_num].length - 1- i; j++){
      if (g_user_num[room_num][j] > g_user_num[room_num][j + 1]){
          //name change
          temp = g_user_name[room_num][j];
          g_user_name[room_num][j] = g_user_name[room_num][j + 1];
          g_user_name[room_num][j + 1] = temp;

          //num change 
          temp = g_user_num[room_num][j];
          g_user_num[room_num][j] = g_user_num[room_num][j + 1];
          g_user_num[room_num][j + 1] = temp;

          //state change
          temp = g_user_state[room_num][j];
          g_user_state[room_num][j] = g_user_state[room_num][j + 1];
          g_user_state[room_num][j + 1] = temp;

          //socket change
          temp = g_user_socketID[room_num][j];
          g_user_socketID[room_num][j] = g_user_socketID[room_num][j + 1];
          g_user_socketID[room_num][j + 1] = temp;
      }
    }
  }

  //host change the position to index 0

  for ( var i = 0; i < g_user_name[room_num].length; i++){
    if(g_user_state[room_num][i] == "host"){
      if(i == 0){
        break;
      }
        
      //name change
      temp = g_user_name[room_num][0];
      g_user_name[room_num][0] = g_user_name[room_num][i];
      g_user_name[room_num][i] = temp;

      //num change 
      temp = g_user_num[room_num][0];
      g_user_num[room_num][0] = g_user_num[room_num][i];
      g_user_num[room_num][i] = temp;

      //state change
      temp = g_user_state[room_num][0];
      g_user_state[room_num][0] = g_user_state[room_num][i];
      g_user_state[room_num][i] = temp;

      //socket change
      temp = g_user_socketID[room_num][0];
      g_user_socketID[room_num][0] = g_user_socketID[room_num][i];
      g_user_socketID[room_num][i] = temp;

      break;
    }
  }
  
  //check
  g_sort_chk.push(1);
}

io.on('connection', function(socket){

  console.log("length :" + g_user_name[io_room_count].length);
  console.log("g_cnt : "+ g_cnt);
  console.log("room_cunt : " + room_count);

  //push values 
  if(Array.isArray(g_user_socketID[room_count - 1])){
    g_user_socketID[room_count - 1].push(socket.id);
    
    if(g_user_socketID[room_count - 1].length == g_cnt)
    {
      ArraySort(room_count - 1); // Arrays sorting 
    }
  }

  console.log('user connected: ', socket.id);
  console.log(g_user_num);
  console.log(g_user_name);
  console.log(g_user_state);
  console.log(g_user_socketID);

  socket.on('get_player_nums', function(r_num){

    if(g_sort_chk[r_num] == 1){ // only after sort
      var arr = new Array();

      for(var i = 0; i < g_user_num[r_num].length; i++){
        arr.push(g_user_num[r_num][i]);
      }

      for(var i = 0; i < g_user_socketID[r_num].length; i++){
        io.to(g_user_socketID[r_num][i]).emit('set_player_nums', arr);
      }
    }

  });


  // ---------------- del
  //
  // socket.on('disconnect', function(){
  
  //   console.log('user disconnected: ', socket.id);
  
  //   for( var i = 0; i < user_socketID[room_num].length; i++){
  //     io.to(user_socketID[room_num][i]).emit('receive message',name + '님이 퇴장하였습니다.');
  //   }
  
  //   //del data
  //   var temp = user_socketID[room_num].indexOf(socket.id);
  
  //   user_name[room_num].splice(temp,1);
  //   user_num[room_num].splice(temp,1);
  //   user_wins[room_num].splice(temp,1);
  //   user_losses[room_num].splice(temp,1);
  //   user_state[room_num].splice(temp,1);
  //   user_socketID[room_num].splice(temp,1);
  
  //   //set host
  //   if(user_state[room_num].length != 0){
  //     user_state[room_num][0] = 'host';
  //     state = 'host';
  
  //     io.to(user_socketID[room_num][0]).emit('set state',state);
  //   }
  
  //   //set values
  //   for( var i = 0; i < user_socketID[room_num].length; i++){
  //     io.to(user_socketID[room_num][i]).emit('clear');
  //     for( var j = 0; j < user_name[room_num].length; j++){
  //         io.to(user_socketID[room_num][i]).emit('change value',user_name[room_num][j], user_wins[room_num][j], user_losses[room_num][j], user_state[room_num][j], user_num[room_num][j]);
  //     }
  //   }
  
  // });

});

http.listen(9876, function(){ //4
  console.log('server on!');
});
