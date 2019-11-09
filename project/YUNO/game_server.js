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

// user infos
var g_user_name = new Array(new Array());
var g_user_num = new Array(new Array());
var g_user_state = new Array(new Array());
var g_user_socketID = new Array(new Array());

var g_sort_chk = new Array();

// game infos
var g_player_cards = new Array(new Array());
var g_dummy_cards = new Array(new Array());
var g_field_card = new Array(new Array());
var g_bomb_cnt = new Array();

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

    // user infos
    g_user_name[room_count] = new Array();
    g_user_num[room_count] = new Array();
    g_user_state[room_count] = new Array();
    g_user_socketID[room_count] = new Array();

    // game infos
    g_player_cards[room_count] = new Array();
    g_dummy_cards[room_count] = new Array();
    g_field_card[room_count] = new Array();
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

var Shuffle_cards = function(room_num, user_count){

  var temp = new Array();
  var k;
  
  //dummy cards
  g_dummy_cards[room_num].push("y0", "y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9", "y_r", "y_b", "y_p",
  "y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9", "y_r", "y_b", "y_p",
  "r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r_r", "r_b", "r_p",
  "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r_r", "r_b", "r_p",
  "g0", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g_r", "g_b", "g_p",
  "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g_r", "g_b", "g_p",
  "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b_r", "b_b", "b_p",
  "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b_r", "b_b", "b_p",
  "4_p", "4_p", "4_p", "4_p", "c_c", "c_c","c_c","c_c");

  // player cards
  for(var i = 0; i < user_count; i++){
    for(var j = 0; j < 7; j++)
    {
      k = parseInt(Math.random()*g_dummy_cards[room_num].length);
      temp.push(g_dummy_cards[room_num][k]);
      g_dummy_cards[room_num].splice(k,1);
    }
    g_player_cards[room_num].push(temp.join('/'));
    console.log("temp : "+ temp);
    temp = new Array();
  }

  //field card
  k = parseInt(Math.random()*g_dummy_cards[room_num].length);
  g_field_card[room_num].push(g_dummy_cards[room_num][k]);
  g_dummy_cards[room_num].splice(k,1);

  console.log("g_dummy_cards : "+ g_dummy_cards);
  console.log("g_player_cards : "+ g_player_cards);
  console.log("g_field_card : "+ g_field_card);
}

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
      Shuffle_cards(room_count - 1, g_cnt); //Shuffle_cards
      ArraySort(room_count - 1); // Arrays sorting 

      for(var i = 0; i < g_cnt; i++){
        io.to(g_user_socketID[room_count - 1][i]).emit('start');
      }
    }
  }

  console.log('user connected: ', socket.id);
  console.log(g_user_num);
  console.log(g_user_name);
  console.log(g_user_state);
  console.log(g_user_socketID);

  socket.on('get_player_nums', function(r_num, u_num){

    if(g_sort_chk[r_num] == 1){ // only after sort
      var arr = new Array();

      for(var i = 0; i < g_user_num[r_num].length; i++){
        arr.push(g_user_num[r_num][i]);
      }

      var index = g_user_num[r_num].indexOf(u_num);
      io.to(g_user_socketID[r_num][index]).emit('set_player_nums', arr);
    }

  });

  socket.on('pointerup_dummy', function(r_num, u_num){

    var k = parseInt(Math.random()*g_dummy_cards[r_num].length);
    var index = g_user_num[r_num].indexOf(u_num);
    var temp = g_player_cards[r_num][index].split('/');

    temp.push(g_dummy_cards[r_num][k]);
    g_player_cards[r_num][index] =temp.join('/');
    g_dummy_cards[r_num].splice(k,1);

    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('refresh');
    }
  });

  socket.on('get_dummy_length', function(r_num, u_num){
    
    var index = g_user_num[r_num].indexOf(u_num);
    io.to(g_user_socketID[r_num][index]).emit('set_dummy', g_dummy_cards[r_num].length);

  });

  socket.on('get_field_card', function(r_num){

    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('set_field_card', g_field_card[r_num][g_field_card[r_num].length-1]);
    }

  });

  socket.on('get_player_info', function(r_num, u_num){

    var index = g_user_num[r_num].indexOf(u_num);
    var temp = g_player_cards[r_num][index].split('/');
    
    io.to(g_user_socketID[r_num][index]).emit('set_player_info', temp);

  });

  socket.on('get_other_player_info', function(r_num, u_num, move){

    var index = g_user_num[r_num].indexOf(u_num);
    index_m = parseInt((index + move) % g_user_num[r_num].length); // 0 ~ g_user_num[r_num].length - 1

    console.log("g_user_num[r_num] :" + g_user_num[r_num]);
    console.log("index :"+ index);
    console.log("move :"+ move);
    console.log("index_m :" + index_m);
    var temp = g_player_cards[r_num][index_m].split('/');
    
    if(move == 1){ // sprite2
      io.to(g_user_socketID[r_num][index]).emit('set_other_player_info2', temp);
    }
    else if(move == 2){ // sprite3
      io.to(g_user_socketID[r_num][index]).emit('set_other_player_info3', temp);
    }
    else if(move == 3){ // sprite4
      io.to(g_user_socketID[r_num][index]).emit('set_other_player_info4', temp);
    }

  });

  
  socket.on('get_other_player_info3', function(r_num, u_num, move){

    var index = g_user_num[r_num].indexOf(u_num);
    index_m = parseInt((index + move) % g_user_num[r_num].length); // 0 ~ g_user_num[r_num].length - 1

    console.log("g_user_num[r_num] :" + g_user_num[r_num]);
    console.log("index :"+ index);
    console.log("move :"+ move);
    console.log("index_m :" + index_m);
    var temp = g_player_cards[r_num][index_m].split('/');
    
    io.to(g_user_socketID[r_num][index]).emit('set_other_player_info3', temp);

  });

  socket.on('play_a_card', function(r_num, u_num, _index){

    var index = g_user_num[r_num].indexOf(u_num);
    var temp = g_player_cards[r_num][index].split('/');

    if(temp[_index]){ // When matching
      console.log("match");
      console.log("temp[_index] :" + temp[_index]);
      g_field_card[r_num].push(temp[_index]);
      temp.splice(_index,1);
      g_player_cards[r_num][index] = temp.join('/');

    }

    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('refresh');
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
