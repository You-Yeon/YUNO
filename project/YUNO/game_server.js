// server.js

var express = require('express');
var app = express();
var img_routes = require('./img_routes'); // image routers
var sound_routrs = require('./sound_routes'); // sound routers
app.use('/',img_routes);
app.use('/',sound_routrs);

var http = require('http').Server(app); 
var io = require('socket.io')(http);    
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'yuyeon',
  password : '0607',
  port     : '3306',
  database : 'yuno'
});
connection.connect();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

// user infos
var g_user_name = new Array(new Array());
var g_user_num = new Array(new Array());
var g_user_state = new Array(new Array());
var g_user_socketID_check = new Array(new Array()); // check 전용
var g_user_socketID = new Array(new Array());

// game infos
var g_player_cards = new Array(new Array());
var g_dummy_cards = new Array(new Array());
var g_field_card = new Array(new Array());
var g_text_info_num = new Array(new Array());
var g_text_info_name = new Array(new Array());
var g_turn_is = new Array(); // who turn?
var g_direction_is = new Array(); // what direction?
var g_yuno_state = new Array(new Array()); // 0 : not shield, 1: shield
var g_bomb_cnt = new Array();
var g_score = new Array(new Array());
var g_end = new Array();

var g_name;
var g_num;
var g_cnt;

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

  res.send(`<script> alert("잘못된 접근"); window.close(); </script>`);

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

  // UPDATE game state
  connection.query('UPDATE user SET in_game = 1 WHERE name = \''+ g_name + '\'', function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.', err);
  });

  // make array
  if(g_user_name[room_count] === undefined){

    // user infos
    g_user_name[room_count] = new Array();
    g_user_num[room_count] = new Array();
    g_user_state[room_count] = new Array();
    g_user_socketID_check[room_count] = new Array();
    g_user_socketID[room_count] = new Array();

    // game infos
    g_player_cards[room_count] = new Array();
    g_dummy_cards[room_count] = new Array();
    g_field_card[room_count] = new Array();
    g_text_info_num[room_count] = new Array();
    g_text_info_name[room_count] = new Array();
    g_yuno_state[room_count] = new Array();
    g_score[room_count] = new Array();
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
    
    // setting yuno state
    g_yuno_state[room_count].push(0);
  }
  else{

    g_user_name[room_count].push(g_name);
    g_user_num[room_count].push(g_num);
    g_user_state[room_count].push(g_state);
    
    // setting yuno state
    g_yuno_state[room_count].push(0);

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
  g_dummy_cards[room_num].push("y_0", "y_1", "y_2", "y_3", "y_4", "y_5", "y_6", "y_7", "y_8", "y_9", "y_r", "y_b", "y_p",
  "y_1", "y_2", "y_3", "y_4", "y_5", "y_6", "y_7", "y_8", "y_9", "y_r", "y_b", "y_p",
  "r_0", "r_1", "r_2", "r_3", "r_4", "r_5", "r_6", "r_7", "r_8", "r_9", "r_r", "r_b", "r_p",
  "r_1", "r_2", "r_3", "r_4", "r_5", "r_6", "r_7", "r_8", "r_9", "r_r", "r_b", "r_p",
  "g_0", "g_1", "g_2", "g_3", "g_4", "g_5", "g_6", "g_7", "g_8", "g_9", "g_r", "g_b", "g_p",
  "g_1", "g_2", "g_3", "g_4", "g_5", "g_6", "g_7", "g_8", "g_9", "g_r", "g_b", "g_p",
  "b_0", "b_1", "b_2", "b_3", "b_4", "b_5", "b_6", "b_7", "b_8", "b_9", "b_r", "b_b", "b_p",
  "b_1", "b_2", "b_3", "b_4", "b_5", "b_6", "b_7", "b_8", "b_9", "b_r", "b_b", "b_p",
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
    temp = new Array();
  }

  // field card
  k = parseInt(Math.random()*g_dummy_cards[room_num].length);
  g_field_card[room_num].push(g_dummy_cards[room_num][k]);
  g_dummy_cards[room_num].splice(k,1);
 
}

var ArraySort = function(room_num){

  console.log("sorting..");

  var temp;
  var index;

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

  // set text info
  for(var i = 0; i < g_user_num[room_num].length; i++){
    g_text_info_num[room_num].push(g_user_num[room_num][i]);
    g_text_info_name[room_num].push(g_user_name[room_num][i]);
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
  
  // setting turn
  index = g_user_state[room_num].indexOf("host");
  g_turn_is.push(g_user_num[room_num][index]);

  // setting direction
  g_direction_is.push(0); // 0 : 반시계, 1 : 시계
  
  // setting bomb
  g_bomb_cnt.push(0); // 폭탄 갯수

  // game
  g_end.push(0); // 0 : not end, 1 : normal end

  console.log("F g_user_num : " + g_user_num);
  console.log("F g_user_name : " + g_user_name);
  console.log("F g_user_state : " + g_user_state);
  console.log("F g_user_socketID_check : " + g_user_socketID_check);
  console.log("F g_user_socketID : " + g_user_socketID);
  console.log("F g_yuno_state : " + g_yuno_state);
  console.log("F g_bomb_cnt : "+ g_bomb_cnt);
}

io.on('connection', function(socket){

  //push socket_id
  io.to(socket.id).emit('push_socket_id', socket.id);

  //push socket id values 
  if(Array.isArray(g_user_socketID_check[room_count - 1])){
    g_user_socketID_check[room_count - 1].push(socket.id);
    g_user_socketID[room_count - 1].push('0');
    
    if(g_user_socketID_check[room_count - 1].length == g_cnt)
    {
      // socket info check - 정말 본인이 해당 소켓 아이디가 맞는지 확인.
      for(var i = 0; i < g_cnt; i++){
        io.to(g_user_socketID_check[room_count - 1][i]).emit('socket_info_check');
      }

    }   
  }

  socket.on('setting_socket', function(_socket_id, r_num, u_num){

    var index = g_user_num[r_num].indexOf(u_num);
    g_user_socketID[r_num][index] = _socket_id;
    
    var chk = g_user_socketID[r_num].indexOf('0');

    if(chk == -1){ // socket info check is done
      Shuffle_cards(room_count - 1, g_cnt); //Shuffle_cards
      ArraySort(room_count - 1); // Arrays sorting 

      for(var i = 0; i < g_cnt; i++){
        io.to(g_user_socketID[room_count - 1][i]).emit('start');
      }
    }
  });

  socket.on('get_text_info', function(r_num, u_num){

    var num_arr = new Array();
    var name_arr = new Array();

    for(var i = 0; i < g_user_num[r_num].length; i++){
      num_arr.push(g_text_info_num[r_num][i]);
      name_arr.push(g_text_info_name[r_num][i]);
    }

    var index = g_user_num[r_num].indexOf(u_num);
    io.to(g_user_socketID[r_num][index]).emit('set_text_info', num_arr, name_arr);

  });

  socket.on('get_player_nums', function(r_num, u_num, _num){

    var arr = new Array();
    var turn = g_turn_is[r_num];
    var dir = g_direction_is[r_num];

    for(var i = 0; i < g_user_num[r_num].length; i++){
      arr.push(g_user_num[r_num][i]);
    }

    var index = g_user_num[r_num].indexOf(u_num);
    io.to(g_user_socketID[r_num][index]).emit('set_player_nums_and_direction', arr, turn, dir, _num);

  });

  socket.on('pointerup_dummy', function(r_num, u_num){

    var k = parseInt(Math.random()*g_dummy_cards[r_num].length);
    var index = g_user_num[r_num].indexOf(u_num);
    var temp = g_player_cards[r_num][index].split('/');

    if(g_bomb_cnt[r_num] > 0){ // when bomb count > 0
      for(var i = 0; i < g_bomb_cnt[r_num]; i++){
        k = parseInt(Math.random()*g_dummy_cards[r_num].length);
        temp.push(g_dummy_cards[r_num][k]);
        g_dummy_cards[r_num].splice(k,1);
      }
      g_player_cards[r_num][index] = temp.join('/');
      g_bomb_cnt[r_num] = 0; // reset
      
    }
    else{ // bomb count == 0
      temp.push(g_dummy_cards[r_num][k]);
      g_dummy_cards[r_num].splice(k,1);
      g_player_cards[r_num][index] = temp.join('/');

    }

    // turn setting
    var direction;
    
    // --- setting direction
    if(g_direction_is[r_num] == 0){ // 반시계 방향 ( + )
      direction = 1;
    }
    else if(g_direction_is[r_num] == 1){ // 시계 방향 ( - )
      direction = -1;
    }
    
    // --- set shield
    g_yuno_state[r_num][index] = 0; 

    var dir = g_direction_is[r_num];
    var num_arr = new Array();
    var shield_arr = new Array();

    for(var i = 0; i < g_user_num[r_num].length; i++){
      num_arr.push(g_user_num[r_num][i]);
      shield_arr.push(g_yuno_state[r_num][i]);
    }

    // set the shield icons
    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('set_the_player_shield_icons', num_arr, shield_arr, dir);
    }

    // --- find index
    index = g_user_num[r_num].indexOf(g_turn_is[r_num]);
    index += direction;
    
    if(index == g_user_num[r_num].length){
      index = 0;
    }
    else if(index == -1){
      index = g_user_num[r_num].length - 1;
    }
    
    g_turn_is[r_num] = g_user_num[r_num][index];

    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('refresh');
    }

  });

  socket.on('dummy_add_field_cards',function(r_num){
    var k;
    var field_last_card = g_field_card[r_num][g_field_card[r_num].length - 1]; // except the last index( real field card )
    var field_length = g_field_card[r_num].length - 1;
    console.log('before dummy : ' + g_dummy_cards[r_num]);
    console.log('before field : ' + g_field_card[r_num]);
    
    g_field_card[r_num].splice(g_field_card[r_num].length - 1,1);

    // remove color cards
    var color_chk;

    // yellow color card
    color_chk = g_field_card[r_num].indexOf('y_color');
    while(color_chk != -1){ // find yellow color card
      g_field_card[r_num].splice(color_chk, 1, "c_c") // change 'color card' to 'change card'
      color_chk = g_field_card[r_num].indexOf('y_color');
    }

    // red color card
    color_chk = g_field_card[r_num].indexOf('r_color');
    while(color_chk != -1){ // find red color card
      g_field_card[r_num].splice(color_chk, 1, "c_c") // change 'color card' to 'change card'
      color_chk = g_field_card[r_num].indexOf('r_color');
    }

    // green color card
    color_chk = g_field_card[r_num].indexOf('g_color');
    while(color_chk != -1){ // find green color card
      g_field_card[r_num].splice(color_chk, 1, "c_c") // change 'color card' to 'change card'
      color_chk = g_field_card[r_num].indexOf('g_color');
    }

    // blue color card
    color_chk = g_field_card[r_num].indexOf('b_color');
    while(color_chk != -1){ // find blue color card 
      g_field_card[r_num].splice(color_chk, 1, "c_c") // change 'color card' to 'change card'
      color_chk = g_field_card[r_num].indexOf('b_color');
    }

    // push the field value
    for(var i = 0; i < field_length; i++){
      k = parseInt(Math.random()*g_field_card[r_num].length);
      g_dummy_cards[r_num].push(g_field_card[r_num][k]);
      g_field_card[r_num].splice(k, 1); // remove all value
    }
    
    g_field_card[r_num].push(field_last_card); // push last one

    console.log('after dummy : ' + g_dummy_cards[r_num]);
    console.log('after field : ' + g_field_card[r_num]);

  });

  socket.on('get_dummy_length', function(r_num, u_num, num){
    
    // num == 1 : get dummy card
    // num == 2 : refresh dummy
    var index = g_user_num[r_num].indexOf(u_num);
    var turn = g_turn_is[r_num];
    
    if(num == 1){
      io.to(g_user_socketID[r_num][index]).emit('set_dummy', g_dummy_cards[r_num].length, turn);
    }
    else if(num == 2){
      io.to(g_user_socketID[r_num][index]).emit('get_dummy', g_dummy_cards[r_num].length);
    }

  });

  socket.on('get_field_card', function(r_num){
    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('set_field_card', g_field_card[r_num][g_field_card[r_num].length-1]);
    }

  });

  socket.on('get_bomb_count', function(r_num){
    var bomb_cnt = g_bomb_cnt[r_num];

    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('set_bomb', bomb_cnt);
    }

  });
  
  socket.on('yuno_button_pointerdown', function(r_num, u_num){
    var index = g_user_num[r_num].indexOf(u_num);
    var turn = g_turn_is[r_num];
    var dir = g_direction_is[r_num];

    // //refresh only player cards
    // for(var i = 0; i < g_user_socketID[r_num].length; i++){
    //   io.to(g_user_socketID[r_num][i]).emit('refresh_only_player_cards');
    // }

    // set player nums
    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      if(i != index){
        io.to(g_user_socketID[r_num][i]).emit('set_the_other_yuno_num', 1, u_num, turn, dir);
      }
    }
  });

  socket.on('yuno_button_pointerup', function(r_num, u_num){
    var index = g_user_num[r_num].indexOf(u_num);
    var dir = g_direction_is[r_num];
    var temp;
    var shield_cnt = 0;
    var attack_cnt = 0;
    var no_effect = 0;

    // check shield
    temp = g_player_cards[r_num][index].split('/');
    if(temp.length == 1){
      shield_cnt = 1;
    }

    // check attack
    for(var i = 0; i < g_user_name[r_num].length; i++){
      if(i != index){
        temp = g_player_cards[r_num][i].split('/');
        if(temp.length == 1 && g_yuno_state[r_num][i] == 0){ // the player hasn't a shield          
          attack_cnt = 1;
        }
        else if(temp.length == 1 && g_yuno_state[r_num][i] == 1){ //  the player has a shield
          no_effect = 1;
        }
      }
    }
    
    // when the player card length is 1, but he has shield.
    // nothing effect
    if(no_effect == 1){
      // As I said it does nothing.
    }
    // when shield cnt is 1 and attack cnt is 1, show the shield attack board 
    else if(shield_cnt == 1 && attack_cnt == 1){
      // No effect yet.
    }
    // if not shield and not attack, just mistake
    else if(shield_cnt == 0 && attack_cnt == 0){
      temp = g_player_cards[r_num][index].split('/');
      for(var j = 0; j < 2; j++){
        k = parseInt(Math.random()*g_dummy_cards[r_num].length);
        temp.push(g_dummy_cards[r_num][k]);
        g_dummy_cards[r_num].splice(k,1);
      }
      g_player_cards[r_num][index] = temp.join('/');
    }
    // shield effect
    else if(shield_cnt == 1){
      var dir = g_direction_is[r_num];
      var num_arr = new Array();
      var shield_arr = new Array();
  
      // shield effect
      g_yuno_state[r_num][index] = 1; // get shield
  
      for(var i = 0; i < g_user_num[r_num].length; i++){
        num_arr.push(g_user_num[r_num][i]);
        shield_arr.push(g_yuno_state[r_num][i]);
      }

      // set the shield icons
      for(var i = 0; i < g_user_socketID[r_num].length; i++){
        io.to(g_user_socketID[r_num][i]).emit('set_the_player_shield_icons', num_arr, shield_arr, dir);
      }

    }
    // attack effect
    else if(attack_cnt == 1){
      for(var i = 0; i < g_user_name[r_num].length; i++){
        if(i != index){
          temp = g_player_cards[r_num][i].split('/');
          if(temp.length == 1 && g_yuno_state[r_num][i] == 0){ // the player hasn't a shield
            for(var j = 0; j < 2; j++){
              k = parseInt(Math.random()*g_dummy_cards[r_num].length);
              temp.push(g_dummy_cards[r_num][k]);
              g_dummy_cards[r_num].splice(k,1);
            }
            g_player_cards[r_num][i] = temp.join('/');
            
          }
        }
      }

    }

    //refresh only player cards
    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('refresh_only_player_cards');
    }

    // set player nums
    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      if(i == index){
        if(shield_cnt == 1 && attack_cnt == 1){ 
          io.to(g_user_socketID[r_num][index]).emit('show_shield_attack_board_board');
          io.to(g_user_socketID[r_num][i]).emit('set_shield_attack_board_state', 1); // set the shield attack board state = 1
        }
        io.to(g_user_socketID[r_num][i]).emit('set_player_yuno_state', 1); // set the player yuno state = 1
        
      }
      if(i != index){
        io.to(g_user_socketID[r_num][i]).emit('set_the_other_yuno_num', 0, u_num, 0, dir);
        if(shield_cnt == 1 && attack_cnt == 1){ 
          io.to(g_user_socketID[r_num][i]).emit('set_shield_attack_board_state', 1); // set the shield attack board state = 1
        }
      }
    }
  });

  socket.on('shield_pointer_up', function(r_num, u_num){
    var index = g_user_num[r_num].indexOf(u_num);
    var dir = g_direction_is[r_num];
    var num_arr = new Array();
    var shield_arr = new Array();

    // shield effect
    g_yuno_state[r_num][index] = 1; // get shield

    for(var i = 0; i < g_user_num[r_num].length; i++){
      num_arr.push(g_user_num[r_num][i]);
      shield_arr.push(g_yuno_state[r_num][i]);
    }

    // set shield attack state and set the shield icons
    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('set_shield_attack_board_state', 0); // set the shield attack board state = 0
      io.to(g_user_socketID[r_num][i]).emit('set_the_player_shield_icons', num_arr, shield_arr, dir);
    }

  });

  socket.on('attack_pointer_up', function(r_num, u_num){
    var index = g_user_num[r_num].indexOf(u_num);
    var dir = g_direction_is[r_num];
    var temp;

    // attack effect
    for(var i = 0; i < g_user_name[r_num].length; i++){
      if(i != index){
        temp = g_player_cards[r_num][i].split('/');
        if(temp.length == 1 && g_yuno_state[r_num][i] == 0){ // the player hasn't a shield
          for(var j = 0; j < 2; j++){
            k = parseInt(Math.random()*g_dummy_cards[r_num].length);
            temp.push(g_dummy_cards[r_num][k]);
            g_dummy_cards[r_num].splice(k,1);
          }
          g_player_cards[r_num][i] = temp.join('/');
          
        }
      }
    }
    
    //refresh only player cards
    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('refresh_only_player_cards');
    }

    // set shield attack state
    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('set_shield_attack_board_state', 0); // set the shield attack board state = 0
    }

  });

  socket.on('get_player_info', function(r_num, u_num){

    var index = g_user_num[r_num].indexOf(u_num);
    var temp = g_player_cards[r_num][index].split('/');
    var field = g_field_card[r_num][g_field_card[r_num].length-1];
    var bombs = g_bomb_cnt[r_num];
    var turn = g_turn_is[r_num];
    var d_length = g_dummy_cards[r_num].length;

    if(temp[0] == 0){
      temp = new Array();
    }
    io.to(g_user_socketID[r_num][index]).emit('set_player_info', temp, field, bombs, turn, d_length);

  });

  socket.on('get_other_player_info', function(r_num, u_num, move){

    var index = g_user_num[r_num].indexOf(u_num);
    index_m = parseInt((index + move) % g_user_num[r_num].length); // 0 ~ g_user_num[r_num].length - 1

    var temp = g_player_cards[r_num][index_m].split('/');

    if(temp[0] == 0){
      temp = new Array();
    }

    if(move == 1){ // sprite2
      io.to(g_user_socketID[r_num][index]).emit('set_other_player_info2', temp);
    }
    // else if(move == 2){ // sprite3
    //   io.to(g_user_socketID[r_num][index]).emit('set_other_player_info3', temp);
    // }
    else if(move == 3){ // sprite4
      io.to(g_user_socketID[r_num][index]).emit('set_other_player_info4', temp);
    }

  });
  
  socket.on('get_other_player_info3', function(r_num, u_num, move){

    var index = g_user_num[r_num].indexOf(u_num);
    index_m = parseInt((index + move) % g_user_num[r_num].length); // 0 ~ g_user_num[r_num].length - 1

    var temp = g_player_cards[r_num][index_m].split('/');
    if(temp[0] == 0){
      temp = new Array();
    }
    
    io.to(g_user_socketID[r_num][index]).emit('set_other_player_info3', temp);

  });

  socket.on('get_player_score', function(r_num){
    var temp;
    var temp_split;
    var total;

    var score_arr = new Array();
    var name_arr = new Array();

    // Calculation the score
    if(g_score[r_num].length != g_user_name[r_num].length){
      for(var i = 0; i < g_user_name[r_num].length; i++){
        temp = g_player_cards[r_num][i].split('/');
        if(temp[0] == 0){ // winner
          g_score[r_num].push(0);
        }
        else{
          total = 0;
          for(var j = 0; j < temp.length; j++){
            temp_split = temp[j].split("_");
            if(temp_split[1] == 'r' || temp_split[1] == 'b' || temp_split[1] == 'p' || temp_split[1] == 'c'){
              // arrow || ban || plus_2 || plus_4 || change_color_card = + 20 score
              total += 20;
            }
            else{ // number card ..
              total += Number(temp_split[1]);
            }
          }
          g_score[r_num].push(total);
        }
  
      }

    }

    console.log("g_user_name[r_num] :"+ g_user_name[r_num]);
    console.log("g_score[r_num] :" + g_score[r_num]);

    // set array
    for(var i = 0; i < g_user_num[r_num].length; i++){
      score_arr.push(g_score[r_num][i]);
      name_arr.push(g_user_name[r_num][i]);
    }

    // set player score
    for(var i = 0; i < g_user_socketID[r_num].length; i++){
      io.to(g_user_socketID[r_num][i]).emit('set_player_score', name_arr, score_arr, 0);
    }

  });

  socket.on('play_a_card', function(r_num, u_num, _index){

    console.log("_index :" + _index);

    var index = g_user_num[r_num].indexOf(u_num);
    var temp;
    var temp_split;

    // *** step2 change color card
    if(_index == 'y_color' || _index == 'r_color' || _index == 'g_color' || _index == 'b_color'){
      temp = _index;
      temp_split = _index.split("_"); 
    }
    else{ // if not change color card _index is index
      temp = g_player_cards[r_num][index].split('/');

      if(_index < temp.length){
        temp_split = temp[_index].split("_"); // find value
      }
      else{
        temp_split = 'err'; // out of memory
      }

      console.log("temp_split : "+ temp_split);
    }

    if(( temp_split != 'err' && temp[_index]) || _index == 'y_color' || _index == 'r_color' || _index == 'g_color' || _index == 'b_color'){ // When player have the card
      console.log("temp[_index] :" + temp[_index]);

      // when player card is change color card
      if(temp_split[1] == 'c'){ // *** step1 change color card
        // set cards
        temp.splice(_index,1);
        if(temp.length == 0){
          temp = new Array();
        }
        g_player_cards[r_num][index] = temp.join('/');

        io.to(g_user_socketID[r_num][index]).emit('set_player_info', temp, '0_0', 0, 0, 0); // block player cards
        io.to(g_user_socketID[r_num][index]).emit('show_change_color_board'); // show the change color board
        for(var i = 0; i < g_user_socketID[r_num].length; i++){ // set the color board state
          io.to(g_user_socketID[r_num][i]).emit('set_color_board_state', 1);
        }

      }
      else{
        // when player card is plus card
        if(temp_split[1] == 'p'){
          if(temp_split[0] == '4'){ // plus 4 card
            g_bomb_cnt[r_num] = g_bomb_cnt[r_num] + 4;
          }
          else{ // plus 2 card
            g_bomb_cnt[r_num] = g_bomb_cnt[r_num] + 2;
          }
        }
  
        if(temp_split[1] == 'color'){ // *** step3 change color card
          g_field_card[r_num].push(temp); // push the field card

          for(var i = 0; i < g_user_socketID[r_num].length; i++){ // set the color board state
            io.to(g_user_socketID[r_num][i]).emit('set_color_board_state', 0);
          }
          temp = g_player_cards[r_num][index].split('/');
        }
        else{
          // set cards and push the field card
          g_field_card[r_num].push(temp[_index]);
          temp.splice(_index,1);
          if(temp.length == 0){
            temp.push(0);
          }
          g_player_cards[r_num][index] = temp.join('/');

        }

        if(g_dummy_cards[r_num].length == 0 && g_field_card[r_num].length > 1){
          // 'dummy_add_field_cards'

          var k;
          var _field_last_card = g_field_card[r_num][g_field_card[r_num].length - 1]; // except the last index( real field card )
          var _field_length = g_field_card[r_num].length - 1;
          console.log('before dummy : ' + g_dummy_cards[r_num]);
          console.log('before field : ' + g_field_card[r_num]);
            
          g_field_card[r_num].splice(g_field_card[r_num].length - 1,1);
        
          // remove color cards
          var color_chk;

          // yellow color card
          color_chk = g_field_card[r_num].indexOf('y_color');
          while(color_chk != -1){ // find yellow color card
            g_field_card[r_num].splice(color_chk, 1, "c_c") // change 'color card' to 'change card'
            color_chk = g_field_card[r_num].indexOf('y_color');
          }

          // red color card
          color_chk = g_field_card[r_num].indexOf('r_color');
          while(color_chk != -1){ // find red color card
            g_field_card[r_num].splice(color_chk, 1, "c_c") // change 'color card' to 'change card'
            color_chk = g_field_card[r_num].indexOf('r_color');
          }

          // green color card
          color_chk = g_field_card[r_num].indexOf('g_color');
          while(color_chk != -1){ // find green color card
            g_field_card[r_num].splice(color_chk, 1, "c_c") // change 'color card' to 'change card'
            color_chk = g_field_card[r_num].indexOf('g_color');
          }

          // blue color card
          color_chk = g_field_card[r_num].indexOf('b_color');
          while(color_chk != -1){ // find blue color card 
            g_field_card[r_num].splice(color_chk, 1, "c_c") // change 'color card' to 'change card'
            color_chk = g_field_card[r_num].indexOf('b_color');
          }
          
          // push the field value
          for(var i = 0; i < _field_length; i++){
            k = parseInt(Math.random()*g_field_card[r_num].length);
            g_dummy_cards[r_num].push(g_field_card[r_num][k]);
            g_field_card[r_num].splice(k, 1); // remove all value
          }
            
          g_field_card[r_num].push(_field_last_card); // push last one
        
          console.log('after dummy : ' + g_dummy_cards[r_num]);
          console.log('after field : ' + g_field_card[r_num]);
        }

        // turn setting
        var direction;
        var index;
  
        // when player card is arrow card
        if(temp_split[1] == 'r'){
          if(g_direction_is[r_num] == 0){ // 반시계 방향 ( + )
            g_direction_is[r_num] = 1;
          }
          else if(g_direction_is[r_num] == 1){ // 시계 방향 ( - )
            g_direction_is[r_num] = 0;
          }
        }
  
        // --- setting direction
        if(g_direction_is[r_num] == 0){ // 반시계 방향 ( + )
          direction = 1;
        }
        else if(g_direction_is[r_num] == 1){ // 시계 방향 ( - )
          direction = -1;
        }
        
        // --- find index
        index = g_user_num[r_num].indexOf(g_turn_is[r_num]);
  
        // when player card is ban card
        if(temp_split[1] == 'b'){
          index += direction*2;
  
          if(index == g_user_num[r_num].length){
            index = 0;
          }
          else if(index == -1){
            index = g_user_num[r_num].length - 1;
          }
          else if(index == g_user_num[r_num].length + 1){
            index = 1;
          }
          else if(index == -2){
            index = g_user_num[r_num].length - 2;
          }
  
        }
        else{ // or not ban card
          index += direction;
  
          if(index == g_user_num[r_num].length){
            index = 0;
          }
          else if(index == -1){
            index = g_user_num[r_num].length - 1;
          }
        }
  
        g_turn_is[r_num] = g_user_num[r_num][index];
        console.log("g_turn_is[r_num] : " + g_turn_is[r_num]);
  
        for(var i = 0; i < g_user_socketID[r_num].length; i++){
          io.to(g_user_socketID[r_num][i]).emit('refresh');
        }

        if(temp[0] == 0){ // *****  WIN ! ***** 
          g_end[r_num] = 1; // end
          index = g_user_num[r_num].indexOf(u_num);

          for(var i = 0; i < g_user_socketID[r_num].length; i++){
            if(i == index){ // win
              io.to(g_user_socketID[r_num][i]).emit('win', 0); // win
              connection.query('UPDATE user SET wins = wins + 1 WHERE name = \''+ g_user_name[r_num][i] + '\'', function(err, rows, fields) {
                if (!err)
                  console.log('The solution is: ', rows);
                else
                  console.log('Error while performing Query.', err);
              });
            }
            else{ // lose
              io.to(g_user_socketID[r_num][i]).emit('lose'); // lose
              connection.query('UPDATE user SET losses = losses + 1 WHERE name = \''+ g_user_name[r_num][i] + '\'', function(err, rows, fields) {
                if (!err)
                  console.log('The solution is: ', rows);
                else
                  console.log('Error while performing Query.', err);
              });
            }
            // set in game state
            connection.query('UPDATE user SET in_game = 0 WHERE name = \''+ g_user_name[r_num][i] + '\'', function(err, rows, fields) {
              if (!err)
                console.log('The solution is: ', rows);
              else
                console.log('Error while performing Query.', err);
            });

            io.to(g_user_socketID[r_num][i]).emit('set_shield_attack_board_state', 1); // all player blocking

          }
        }

      }
    }

  });

  socket.on('disconnect', function(){
  
    console.log('user disconnected: ', socket.id);
  
    var r_num;
    var index;

    // find room num and index
    for(var i = 0; i < room_count; i++){
      for(var j = 0; j < g_user_socketID[i].length; j++){
        if(g_user_socketID[i][j] == socket.id){
          r_num = i;
          index = j;
        }
      }
    }

    // del cookies..    
    io.to(g_user_socketID[r_num][index]).emit('del_cookies'); 

    if(g_end[r_num] == 0){ // adnormal game
      var text_index = g_text_info_name[r_num].indexOf(g_user_name[r_num][index]);
      var num_arr = new Array();
      var name_arr = new Array();

      for(var i = 0; i < g_user_num[r_num].length; i++){
        num_arr.push(g_text_info_num[r_num][i]);
        name_arr.push(g_text_info_name[r_num][i]);
      }

      // set disconnected text
      for(var i = 0; i < g_user_socketID[r_num].length; i++){
        io.to(g_user_socketID[r_num][i]).emit('set_disconnected_player', text_index, num_arr, name_arr);
        io.to(g_user_socketID[r_num][i]).emit('set_shield_attack_board_state', 1); // all player blocking
      }

      // set score
      var temp;
      var temp_split;
      var total;
  
      var score_arr = new Array();
      var name_arr2 = new Array();
  
      // Calculation the score
      for(var i = 0; i < g_user_name[r_num].length; i++){
        if(i != index){
          temp = g_player_cards[r_num][i].split('/');
          total = 0;
          for(var j = 0; j < temp.length; j++){
            temp_split = temp[j].split("_");
            if(temp_split[1] == 'r' || temp_split[1] == 'b' || temp_split[1] == 'p' || temp_split[1] == 'c'){
              // arrow || ban || plus_2 || plus_4 || change_color_card = + 20 score
              total += 20;
            }
            else{ // number card ..
              total += Number(temp_split[1]);
            }
          }
          g_score[r_num].push(total);
        }
      }

      // update losses
      connection.query('UPDATE user SET losses = losses + 1 WHERE name = \''+ g_user_name[r_num][index] + '\'', function(err, rows, fields) {
        if (!err)
          console.log('The solution is: ', rows);
        else
          console.log('Error while performing Query.', err);
      });

      // set in game state
      connection.query('UPDATE user SET in_game = 0 WHERE name = \''+ g_user_name[r_num][index] + '\'', function(err, rows, fields) {
        if (!err)
          console.log('The solution is: ', rows);
        else
          console.log('Error while performing Query.', err);
      });

      // remove..
      g_user_name[r_num].splice(index, 1);
      g_user_socketID[r_num].splice(index, 1);

      console.log("g_user_name[r_num] :"+ g_user_name[r_num]);
      console.log("g_score[r_num] :" + g_score[r_num]);
  
      // set array
      for(var i = 0; i < g_user_name[r_num].length; i++){
        score_arr.push(g_score[r_num][i]);
        name_arr2.push(g_user_name[r_num][i]);
      }
  
      // min score is winner
      var min = Math.min.apply(null, score_arr);
      
      // set player score
      for(var i = 0; i < g_user_name[r_num].length; i++){
        if(score_arr[i] == min){ // winner
          io.to(g_user_socketID[r_num][i]).emit('win', 1); // win
          connection.query('UPDATE user SET wins = wins + 1 WHERE name = \''+ g_user_name[r_num][i] + '\'', function(err, rows, fields) {
            if (!err)
              console.log('The solution is: ', rows);
            else
              console.log('Error while performing Query.', err);
          });
        }
        else{
          io.to(g_user_socketID[r_num][i]).emit('lose'); // lose
          connection.query('UPDATE user SET losses = losses + 1 WHERE name = \''+ g_user_name[r_num][i] + '\'', function(err, rows, fields) {
            if (!err)
              console.log('The solution is: ', rows);
            else
              console.log('Error while performing Query.', err);
          });
        }
        // set in game state
        connection.query('UPDATE user SET in_game = 0 WHERE name = \''+ g_user_name[r_num][i] + '\'', function(err, rows, fields) {
            if (!err)
              console.log('The solution is: ', rows);
            else
              console.log('Error while performing Query.', err);
        });

        io.to(g_user_socketID[r_num][i]).emit('set_player_score', name_arr2, score_arr, 1);
      }
      
      g_user_num[r_num].splice(index, 1);
      g_user_state[r_num].splice(index, 1);
      g_user_socketID_check[r_num].splice(index, 1);
      g_player_cards[r_num].splice(index, 1);
      g_text_info_num[r_num].splice(index, 1);
      g_text_info_name[r_num].splice(index, 1);
      g_yuno_state[r_num].splice(index, 1);
      g_score[r_num].splice(index, 1);
      
      g_end[r_num] = 1;
    }
    else{ // normal game

      // remove..
      g_user_name[r_num].splice(index, 1);
      g_user_num[r_num].splice(index, 1);
      g_user_state[r_num].splice(index, 1);
      g_user_socketID_check[r_num].splice(index, 1);
      g_user_socketID[r_num].splice(index, 1);
      g_player_cards[r_num].splice(index, 1);
      g_text_info_num[r_num].splice(index, 1);
      g_text_info_name[r_num].splice(index, 1);
      g_yuno_state[r_num].splice(index, 1);
      g_score[r_num].splice(index, 1);

      if(g_user_name[r_num].length == 0){ // last player
        g_dummy_cards[r_num] = new Array();
        g_field_card[r_num] = new Array();
        g_turn_is[r_num] = 0;
        g_direction_is[r_num] = 0;
        g_bomb_cnt[r_num] = 0;
        g_end[r_num] = 0;

        // check remove
        console.log("remove g_user_name[r_num] :" + g_user_name[r_num]);
        console.log("remove g_user_num[r_num] :" + g_user_num[r_num]);
        console.log("remove g_user_state[r_num] :" + g_user_state[r_num]);
        console.log("remove g_user_socketID_check[r_num] :" + g_user_socketID_check[r_num]);
        console.log("remove g_user_socketID[r_num] :" + g_user_socketID[r_num]);
        console.log("remove g_player_cards[r_num] :" + g_player_cards[r_num]);
        console.log("remove g_text_info_num[r_num] :" + g_text_info_num[r_num]);
        console.log("remove g_text_info_name[r_num] :" + g_text_info_name[r_num]);
        console.log("remove g_yuno_state[r_num] :" + g_yuno_state[r_num]);
        console.log("remove g_score[r_num] :" + g_score[r_num]);

        console.log("remove g_dummy_cards[r_num] :" + g_dummy_cards[r_num]);
        console.log("remove g_field_card[r_num] :" + g_field_card[r_num]);
        console.log("remove g_turn_is :" + g_turn_is);
        console.log("remove g_direction_is :" + g_direction_is);
        console.log("remove g_bomb_cnt :" + g_bomb_cnt);
        console.log("remove g_end :" + g_end);
      }
    }
  
  });

});

http.listen(9876, function(){ //4
  console.log('server on!');
});
