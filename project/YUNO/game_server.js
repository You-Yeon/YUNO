// server.js

var express = require('express');
var app = express();
var http = require('http').Server(app); //1
var io = require('socket.io')(http);    //1
var path = require('path');

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

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

var g_user_name = new Array(new Array());
var g_user_num = new Array(new Array());
var g_user_socketID = new Array(new Array());
var g_user_cnt = new Array();
// var g_user_state = new Array(new Array());
// var g_room_idx;
var g_name;
var g_num;
var g_cnt;
// var g_state;

var room_count = 0;

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
  g_cnt = req.param('user_cnt');
  // g_room_idx = req.param('room_num');
  // g_state = req.param('user_state');

  console.log("cookie name :" + req.cookies.NAME);
  console.log("user_name :" + req.param('user_name'));
  console.log("user_num :" + req.param('user_num'));
  console.log("user_cnt :" + req.param('user_cnt'));


  // make array
  if(g_user_name[room_count] === undefined){

    g_user_name[room_count] = new Array();
    g_user_num[room_count] = new Array();
    g_user_socketID[room_count] = new Array();
    // g_user_state[room_count] = new Array();
  }

  // check room number
  if (g_user_name[room_count].length < g_cnt - 1){

    g_user_name[room_count].push(g_name);
    g_user_num[room_count].push(g_num);
  }
  else{

    g_user_name[room_count].push(g_name);
    g_user_num[room_count].push(g_num);
    g_user_cnt.push(g_cnt);

    room_count++;
  }

  console.log(g_user_name);
  console.log(g_user_num);
  console.log(g_user_cnt);

  res.sendFile(__dirname + '/main_game.html');

});

//----------------------------------------------------------

app.get('/phaser.min.js', function(req, res){
  res.sendFile(path.resolve('../../phaser.min.js'));
});

app.get('/game.js', function(req, res){
  res.sendFile(__dirname + '/game.js');
});

//----------------------------------------------------------

app.get('/assets/board', function(req, res){
  res.sendFile(__dirname + '/assets/board.png');
});

app.get('/assets/board2', function(req, res){
  res.sendFile(__dirname + '/assets/board2.png');
});

app.get('/assets/board3', function(req, res){
  res.sendFile(__dirname + '/assets/board3.png');
});

app.get('/assets/board4', function(req, res){
  res.sendFile(__dirname + '/assets/board4.png');
});

app.get('/assets/back_card', function(req, res){
  res.sendFile(__dirname + '/assets/back_card.png');
});

app.get('/assets/card_dummy', function(req, res){
  res.sendFile(__dirname + '/assets/card_dummy.png');
});

app.get('/assets/yuno_button_on', function(req, res){
  res.sendFile(__dirname + '/assets/yuno_button_on.png');
});

app.get('/assets/yuno_button_off', function(req, res){
  res.sendFile(__dirname + '/assets/yuno_button_off.png');
});

app.get('/assets/y_card_0', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_0.png');
});

app.get('/assets/y_card_1', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_1.png');
});

app.get('/assets/y_card_2', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_2.png');
});

app.get('/assets/y_card_3', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_3.png');
});

app.get('/assets/y_card_4', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_4.png');
});

app.get('/assets/y_card_5', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_5.png');
});

app.get('/assets/y_card_6', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_6.png');
});

app.get('/assets/y_card_7', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_7.png');
});

app.get('/assets/y_card_8', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_8.png');
});

app.get('/assets/y_card_9', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_9.png');
});

app.get('/assets/y_card_arrow', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_arrow.png');
});

app.get('/assets/y_card_ban', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_ban.png');
});

app.get('/assets/y_card_plus_2', function(req, res){
  res.sendFile(__dirname + '/assets/y_card_plus_2.png');
});

app.get('/assets/r_card_0', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_0.png');
});

app.get('/assets/r_card_1', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_1.png');
});

app.get('/assets/r_card_2', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_2.png');
});

app.get('/assets/r_card_3', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_3.png');
});

app.get('/assets/r_card_4', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_4.png');
});

app.get('/assets/r_card_5', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_5.png');
});

app.get('/assets/r_card_6', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_6.png');
});

app.get('/assets/r_card_7', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_7.png');
});

app.get('/assets/r_card_8', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_8.png');
});

app.get('/assets/r_card_9', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_9.png');
});

app.get('/assets/r_card_arrow', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_arrow.png');
});

app.get('/assets/r_card_ban', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_ban.png');
});

app.get('/assets/r_card_plus_2', function(req, res){
  res.sendFile(__dirname + '/assets/r_card_plus_2.png');
});

app.get('/assets/g_card_0', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_0.png');
});

app.get('/assets/g_card_1', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_1.png');
});

app.get('/assets/g_card_2', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_2.png');
});

app.get('/assets/g_card_3', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_3.png');
});

app.get('/assets/g_card_4', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_4.png');
});

app.get('/assets/g_card_5', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_5.png');
});

app.get('/assets/g_card_6', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_6.png');
});

app.get('/assets/g_card_7', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_7.png');
});

app.get('/assets/g_card_8', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_8.png');
});

app.get('/assets/g_card_9', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_9.png');
});

app.get('/assets/g_card_arrow', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_arrow.png');
});

app.get('/assets/g_card_ban', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_ban.png');
});

app.get('/assets/g_card_plus_2', function(req, res){
  res.sendFile(__dirname + '/assets/g_card_plus_2.png');
});

app.get('/assets/b_card_0', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_0.png');
});

app.get('/assets/b_card_1', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_1.png');
});

app.get('/assets/b_card_2', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_2.png');
});

app.get('/assets/b_card_3', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_3.png');
});

app.get('/assets/b_card_4', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_4.png');
});

app.get('/assets/b_card_5', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_5.png');
});

app.get('/assets/b_card_6', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_6.png');
});

app.get('/assets/b_card_7', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_7.png');
});

app.get('/assets/b_card_8', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_8.png');
});

app.get('/assets/b_card_9', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_9.png');
});

app.get('/assets/b_card_arrow', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_arrow.png');
});

app.get('/assets/b_card_ban', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_ban.png');
});

app.get('/assets/b_card_plus_2', function(req, res){
  res.sendFile(__dirname + '/assets/b_card_plus_2.png');
});

app.get('/assets/card_plus_4', function(req, res){
  res.sendFile(__dirname + '/assets/card_plus_4.png');
});

app.get('/assets/change_color_card', function(req, res){
  res.sendFile(__dirname + '/assets/change_color_card.png');
});

app.get('/assets/num_button_1', function(req, res){
  res.sendFile(__dirname + '/assets/num_button_1.png');
});

app.get('/assets/num_button_2', function(req, res){
  res.sendFile(__dirname + '/assets/num_button_1.png');
});

app.get('/assets/num_button_3', function(req, res){
  res.sendFile(__dirname + '/assets/num_button_1.png');
});

app.get('/assets/num_button_4', function(req, res){
  res.sendFile(__dirname + '/assets/num_button_1.png');
});

app.get('/assets/yuno_num_button', function(req, res){
  res.sendFile(__dirname + '/assets/yuno_num_button.png');
});

app.get('/assets/other_back_card', function(req, res){
  res.sendFile(__dirname + '/assets/other_back_card.png');
});

app.get('/assets/focus_num_button_1', function(req, res){
  res.sendFile(__dirname + '/assets/focus_num_button_1.png');
});

app.get('/assets/focus_num_button_2', function(req, res){
  res.sendFile(__dirname + '/assets/focus_num_button_1.png');
});

app.get('/assets/focus_num_button_3', function(req, res){
  res.sendFile(__dirname + '/assets/focus_num_button_1.png');
});

app.get('/assets/focus_num_button_4', function(req, res){
  res.sendFile(__dirname + '/assets/focus_num_button_1.png');
});

app.get('/assets/focus_yuno_num_button', function(req, res){
  res.sendFile(__dirname + '/assets/focus_yuno_num_button.png');
});

app.get('/assets/choose_color_board', function(req, res){
  res.sendFile(__dirname + '/assets/choose_color_board.png');
});

app.get('/assets/red_color_card', function(req, res){
  res.sendFile(__dirname + '/assets/red_color_card.png');
});

app.get('/assets/blue_color_card', function(req, res){
  res.sendFile(__dirname + '/assets/blue_color_card.png');
});

app.get('/assets/yellow_color_card', function(req, res){
  res.sendFile(__dirname + '/assets/yellow_color_card.png');
});

app.get('/assets/green_color_card', function(req, res){
  res.sendFile(__dirname + '/assets/green_color_card.png');
});

app.get('/assets/direction', function(req, res){
  res.sendFile(__dirname + '/assets/direction.png');
});

app.get('/assets/direction2', function(req, res){
  res.sendFile(__dirname + '/assets/direction2.png');
});

//----------------------------------------------------------

// io.on('connection', function(socket){

//   //push values
//   if(Array.isArray(g_user_socketID[room_count])){
//     g_user_socketID[room_count].push(socket.id);
//   }

//   var g_room_num = room_count;

//   io.to(socket.id).emit('set_board', g_user_name[g_room_num].length);

//   console.log('user connected: ', socket.id);
//   console.log(g_user_num);
//   console.log(g_user_state);
//   console.log(g_user_name);
//   console.log(g_user_socketID);

//   socket.on('aa', function(aa){
//     console.log(aa);
//     io.to(socket.id).emit('set_board', g_room_idx);
//   });

//   // socket.on('disconnect', function(){
//   //
//   //   console.log('user disconnected: ', socket.id);
//   //
//   //   for( var i = 0; i < user_socketID[room_num].length; i++){
//   //     io.to(user_socketID[room_num][i]).emit('receive message',name + '님이 퇴장하였습니다.');
//   //   }
//   //
//   //   //del data
//   //   var temp = user_socketID[room_num].indexOf(socket.id);
//   //
//   //   user_name[room_num].splice(temp,1);
//   //   user_num[room_num].splice(temp,1);
//   //   user_wins[room_num].splice(temp,1);
//   //   user_losses[room_num].splice(temp,1);
//   //   user_state[room_num].splice(temp,1);
//   //   user_socketID[room_num].splice(temp,1);
//   //
//   //   //set host
//   //   if(user_state[room_num].length != 0){
//   //     user_state[room_num][0] = 'host';
//   //     state = 'host';
//   //
//   //     io.to(user_socketID[room_num][0]).emit('set state',state);
//   //   }
//   //
//   //   //set values
//   //   for( var i = 0; i < user_socketID[room_num].length; i++){
//   //     io.to(user_socketID[room_num][i]).emit('clear');
//   //     for( var j = 0; j < user_name[room_num].length; j++){
//   //         io.to(user_socketID[room_num][i]).emit('change value',user_name[room_num][j], user_wins[room_num][j], user_losses[room_num][j], user_state[room_num][j], user_num[room_num][j]);
//   //     }
//   //   }
//   //
//   // });

// });

http.listen(9876, function(){ //4
  console.log('server on!');
});
