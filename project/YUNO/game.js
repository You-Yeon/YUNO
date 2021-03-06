//------ getting cookies

  // getCookie
  var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
  };

  var user_count = getCookie("CNT");
  var user_num = getCookie("P_NUM");
  var room_num = getCookie("R_NUM");

  console.log("user_num : " + user_num);
  console.log("room_num : " + room_num);

//------


var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 600,
    audio: {
      noAudio: true
    },
    physics : {
      default: 'arcade',
      arcade: { debug: true }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  // load image
  this.load.image('background', '/assets/background');
  this.load.image('board', '/assets/board');
  this.load.image('board2', '/assets/board2');
  this.load.image('board3', '/assets/board3');
  this.load.image('board4', '/assets/board4');
  this.load.image('back_card', '/assets/back_card');
  this.load.image('card_dummy','/assets/card_dummy');
  this.load.image('yuno_button_on','/assets/yuno_button_on');
  this.load.image('yuno_button_off','/assets/yuno_button_off');

  this.load.image('y_0', '/assets/y_card_0');
  this.load.image('y_1', '/assets/y_card_1');
  this.load.image('y_2', '/assets/y_card_2');
  this.load.image('y_3', '/assets/y_card_3');
  this.load.image('y_4', '/assets/y_card_4');
  this.load.image('y_5', '/assets/y_card_5');
  this.load.image('y_6', '/assets/y_card_6');
  this.load.image('y_7', '/assets/y_card_7');
  this.load.image('y_8', '/assets/y_card_8');
  this.load.image('y_9', '/assets/y_card_9');
  this.load.image('y_r', '/assets/y_card_arrow');
  this.load.image('y_b', '/assets/y_card_ban');
  this.load.image('y_p', '/assets/y_card_plus_2');

  this.load.image('r_0', '/assets/r_card_0');
  this.load.image('r_1', '/assets/r_card_1');
  this.load.image('r_2', '/assets/r_card_2');
  this.load.image('r_3', '/assets/r_card_3');
  this.load.image('r_4', '/assets/r_card_4');
  this.load.image('r_5', '/assets/r_card_5');
  this.load.image('r_6', '/assets/r_card_6');
  this.load.image('r_7', '/assets/r_card_7');
  this.load.image('r_8', '/assets/r_card_8');
  this.load.image('r_9', '/assets/r_card_9');
  this.load.image('r_r', '/assets/r_card_arrow');
  this.load.image('r_b', '/assets/r_card_ban');
  this.load.image('r_p', '/assets/r_card_plus_2');

  this.load.image('g_0', '/assets/g_card_0');
  this.load.image('g_1', '/assets/g_card_1');
  this.load.image('g_2', '/assets/g_card_2');
  this.load.image('g_3', '/assets/g_card_3');
  this.load.image('g_4', '/assets/g_card_4');
  this.load.image('g_5', '/assets/g_card_5');
  this.load.image('g_6', '/assets/g_card_6');
  this.load.image('g_7', '/assets/g_card_7');
  this.load.image('g_8', '/assets/g_card_8');
  this.load.image('g_9', '/assets/g_card_9');
  this.load.image('g_r', '/assets/g_card_arrow');
  this.load.image('g_b', '/assets/g_card_ban');
  this.load.image('g_p', '/assets/g_card_plus_2');

  this.load.image('b_0', '/assets/b_card_0');
  this.load.image('b_1', '/assets/b_card_1');
  this.load.image('b_2', '/assets/b_card_2');
  this.load.image('b_3', '/assets/b_card_3');
  this.load.image('b_4', '/assets/b_card_4');
  this.load.image('b_5', '/assets/b_card_5');
  this.load.image('b_6', '/assets/b_card_6');
  this.load.image('b_7', '/assets/b_card_7');
  this.load.image('b_8', '/assets/b_card_8');
  this.load.image('b_9', '/assets/b_card_9');
  this.load.image('b_r', '/assets/b_card_arrow');
  this.load.image('b_b', '/assets/b_card_ban');
  this.load.image('b_p', '/assets/b_card_plus_2');

  this.load.image('4_p', '/assets/card_plus_4');
  this.load.image('c_c', '/assets/change_color_card');

  this.load.image('num_1', '/assets/num_button_1');
  this.load.image('num_2', '/assets/num_button_2');
  this.load.image('num_3', '/assets/num_button_3');
  this.load.image('num_4', '/assets/num_button_4');
  this.load.image('num_yuno', '/assets/yuno_num_button');

  this.load.image('other_card', '/assets/other_back_card');
  this.load.image('p_other_card', '/assets/p_other_back_card');

  this.load.image('f_num_1', '/assets/focus_num_button_1');
  this.load.image('f_num_2', '/assets/focus_num_button_2');
  this.load.image('f_num_3', '/assets/focus_num_button_3');
  this.load.image('f_num_4', '/assets/focus_num_button_4');
  this.load.image('f_num_yuno', '/assets/focus_yuno_num_button');

  this.load.image('choose_color_board', '/assets/choose_color_board');
  this.load.image('r_color', '/assets/red_color_card');
  this.load.image('b_color', '/assets/blue_color_card');
  this.load.image('y_color', '/assets/yellow_color_card');
  this.load.image('g_color', '/assets/green_color_card');

  this.load.image('r_direction', '/assets/direction');
  this.load.image('l_direction', '/assets/direction2');

  this.load.image('bomb', '/assets/bomb');

  this.load.image('choose_shield_attack_board', '/assets/choose_shield_attack_board');
  this.load.image('shield_button_on', '/assets/shield_button_on');
  this.load.image('shield_button_off', '/assets/shield_button_off');
  this.load.image('attack_button_on', '/assets/attack_button_on');
  this.load.image('attack_button_off', '/assets/attack_button_off');

  this.load.image('u_shield_icon', '/assets/u_shield_icon');
  this.load.image('o_shield_icon', '/assets/o_shield_icon');

  this.load.image('win', '/assets/win');
  this.load.image('lose', '/assets/lose');

  // load audio
  this.load.audio('card_sound', ['assets/taking_card_sound.mp3','assets/taking_card_sound.ogg']);
  this.load.audio('bomb_sound', ['assets/bomb_sound.mp3', 'assets/bomb_sound.ogg']);
}

var sprite; // player card images
var sprite1; // other player card images.. 
var sprite2;
var sprite3;
var sprite4;

var color_board_state = 0; // 0 : not choose time, 1 : choose time
var shield_attack_board_state = 0; // 0 : not choose time, 1 : choose time
var player_yuno_state = 0; // 0 : player can push the yuno button, 1 : player can't push the yuno button 

var color_board_sprite; // change color sprites.. 
var color_board;
var y_color;
var r_color;
var g_color;
var b_color;

var shield_attack_board_sprite; // choose the shield or attack button
var shield_attack_board;
var shield_button;
var attack_button;

var total_card; // cards..
var field_card;
var dummy;

var yuno_button; // yuno button..

var player_num1; // player num..
var player_num2;
var player_num3;
var player_num4;

var player1_num_img;
var player2_num_img;
var player3_num_img;
var player4_num_img;

var temp_player_num2; 
var temp_player_num3;
var temp_player_num4;

var temp_player2_num_img; // for other yuno num setting..
var temp_player3_num_img;
var temp_player4_num_img;

var player1_shield_img; // shield icon image..
var player2_shield_img;
var player3_shield_img;
var player4_shield_img;

var user_text1; // texts..
var user_text2;
var user_text3;
var user_text4;
var direction_text;

var rank_text; // rank..
var rank1_text;
var rank2_text;
var rank3_text;
var rank4_text;

var game_direction;
var direction_img;

var bomb;
var bomb_text;

var card_sound;
var bomb_sound;

var socket_id;

function create ()
{
  // players setting..
  // user_count = 2  -- player 1 && player 3
  // user_count = 3  -- player 1 && player 2 && player 3
  // user_count = 4  -- player 1 && player 2 && player 3 && player 4

  var _this = this;
  game.socket = io();

  // // ----- set sounds
  // card_sound = this.sound.add('card_sound');
  // bomb_sound = this.sound.add('bomb_sound');

  // ----- get sockect id
  game.socket.on('push_socket_id', function(_socket_id){
    socket_id = _socket_id
    console.log(user_num + " : " + socket_id);
  });

  // ----- sockect info check
  game.socket.on('socket_info_check', function(){
    game.socket.emit('setting_socket',socket_id, room_num, user_num);
  });

  // ----- start
  game.socket.on('start', function(){

    // ----- set background
    _this.add.image(550,300,'background');

    // ----- set board
    if (user_count == 2){
      _this.add.image(450,300,'board2');
    }
    else if (user_count == 3){
      _this.add.image(450,300,'board3');
    }
    else if (user_count == 4){
      _this.add.image(450,300,'board4');
    }

    // ----- set texts

    // get_text_info
    game.socket.emit('get_text_info',room_num, user_num);

    // ----- set cards

    // dummy cards
    dummy = _this.add.sprite(500,250,'card_dummy').setInteractive();
    dummy.inputEnabled = true;

    dummy.on('pointerup', function(pointer){
      if(shield_attack_board_state == 0){ // not choose shield attack time
        // ----- get dummy length
        game.socket.emit('get_dummy_length',room_num, user_num, 1);
      }
    });

    // ----- set direction text
    direction_text = _this.add.text(910, 550, "진행 방향 : 반시계 방향", {
      font: "30px DungGeunMo",
      fill: "#56FF37",
      align: "center"
    });

    direction_text.setStroke('#000', 7);

    // ----- set bomb image and text
    bomb = _this.add.sprite(495, 241,'bomb').setInteractive();
    bomb.on('pointerup', function(pointer){

      // ----- get dummy length
      game.socket.emit('get_dummy_length',room_num, user_num, 1);
    });
    bomb.visible = false;

    bomb_text = _this.add.text(480, 238, "0", {
      font: "25px DungGeunMo",
      fill: "#000000",
      align: "center"
    });
    bomb_text.setStroke('#fff', 4);
    bomb_text.visible = false;

    //player cards
    sprite1 = _this.add.group();

    if (user_count > 2){
      sprite2 = _this.add.group();
    }
      
    sprite3 = _this.add.group();
    
    if (user_count == 4){
      sprite4 = _this.add.group();
    }

    //----- player_cards

    // player1
    get_card(_this);
    
    // player2
    if (user_count > 2){
      other_card(_this,2);
    }

    // player3
    other_card(_this,3);
    
    // plyer 4
    if (user_count == 4){
      other_card(_this,4);
    }

    //----- field_card
    field_card = _this.add.image(380,250,'back_card');
    
    // get_field_card
    game.socket.emit('get_field_card',room_num);

    // ----- set player nums and direction
    game.socket.emit('get_player_nums',room_num, user_num, 1);

    // ----- set player shield icon image
    player1_shield_img = _this.add.image(675,430,'u_shield_icon');
    player2_shield_img = _this.add.image(796,112,'o_shield_icon');
    player3_shield_img = _this.add.image(320,92,'o_shield_icon');
    player4_shield_img = _this.add.image(103,346,'o_shield_icon');

    player1_shield_img.visible = false;
    player2_shield_img.visible = false;
    player3_shield_img.visible = false;
    player4_shield_img.visible = false;

    // ----- set yuno_button
    yuno_button = _this.add.image(790,528,'yuno_button_on').setInteractive();
    yuno_button.inputEnabled = true;
    
    yuno_button.on('pointerup', function(pointer){
      if(color_board_state == 0){ // not choose color time
        if(shield_attack_board_state == 0){ // not choose shield attack time
          if(player_yuno_state == 0){ // not use the yuno button this turn
            yuno_button.setTexture('yuno_button_on');
            player_num1.setTexture(player1_num_img);

            game.socket.emit('yuno_button_pointerup',room_num, user_num);

          }
        }
      }
    });
    yuno_button.on('pointerdown', function(pointer){
      if(color_board_state == 0){ // not choose color time
        if(shield_attack_board_state == 0){ // not choose shield attack time
          if(player_yuno_state == 0){ // not use the yuno button this turn
            yuno_button.setTexture('yuno_button_off');
            if(player1_num_img == 'f_num_1' || player1_num_img == 'f_num_2' || player1_num_img == 'f_num_3' || player1_num_img == 'f_num_4'){
              player_num1.setTexture('f_num_yuno');
            }
            else if(player1_num_img == 'num_1' || player1_num_img == 'num_2' || player1_num_img == 'num_3' || player1_num_img == 'num_4'){
              player_num1.setTexture('num_yuno');
            }

            game.socket.emit('yuno_button_pointerdown',room_num, user_num);
          }
        }
      }
    });

    // ----- set color board
    color_board_sprite = _this.add.group();
    color_board = color_board_sprite.create(450, 260, 'choose_color_board');
    y_color = color_board_sprite.create(300, 280, 'y_color').setInteractive();
    r_color = color_board_sprite.create(400, 280, 'r_color').setInteractive();
    g_color = color_board_sprite.create(500, 280, 'g_color').setInteractive();
    b_color = color_board_sprite.create(600, 280, 'b_color').setInteractive();

    color_board_sprite.inputEnabled = false;
    color_board.visible = false;
    y_color.visible = false;
    r_color.visible = false;
    g_color.visible = false;
    b_color.visible = false;

    y_color.on('pointerup', function(pointer){
      color_board_sprite.inputEnabled = false;
      color_board.visible = false;
      y_color.visible = false;
      r_color.visible = false;
      g_color.visible = false;
      b_color.visible = false;

      field_card.visible = true;
      game_direction.visible = true;
      dummy.visible = true;

      // ----- play a card
      game.socket.emit('play_a_card',room_num, user_num, "y_color");

    });
    r_color.on('pointerup', function(pointer){
      color_board_sprite.inputEnabled = false;
      color_board.visible = false;
      y_color.visible = false;
      r_color.visible = false;
      g_color.visible = false;
      b_color.visible = false;

      field_card.visible = true;
      game_direction.visible = true;
      dummy.visible = true;

      // ----- play a card
      game.socket.emit('play_a_card',room_num, user_num, "r_color");

    });
    g_color.on('pointerup', function(pointer){
      color_board_sprite.inputEnabled = false;
      color_board.visible = false;
      y_color.visible = false;
      r_color.visible = false;
      g_color.visible = false;
      b_color.visible = false;
      
      field_card.visible = true;
      game_direction.visible = true;
      dummy.visible = true;
      
      // ----- play a card
      game.socket.emit('play_a_card',room_num, user_num, "g_color");

    });
    b_color.on('pointerup', function(pointer){
      color_board_sprite.inputEnabled = false;
      color_board.visible = false;
      y_color.visible = false;
      r_color.visible = false;
      g_color.visible = false;
      b_color.visible = false;
    
      field_card.visible = true;
      game_direction.visible = true;
      dummy.visible = true;

      // ----- play a card
      game.socket.emit('play_a_card',room_num, user_num, "b_color");

    });

    // ----- set shield attack board
    shield_attack_board_sprite = _this.add.group();
    shield_attack_board = shield_attack_board_sprite.create(450, 260, 'choose_shield_attack_board');
    shield_button = shield_attack_board_sprite.create(370, 280, 'shield_button_on').setInteractive();
    attack_button = shield_attack_board_sprite.create(530, 280, 'attack_button_on').setInteractive();

    shield_attack_board_sprite.inputEnabled = false;
    shield_attack_board.visible = false;
    shield_button.visible = false;
    attack_button.visible = false;

    shield_button.on('pointerup', function(pointer){
      shield_button.setTexture('shield_button_on');
      shield_attack_board_sprite.inputEnabled = false;
      shield_attack_board.visible = false;
      shield_button.visible = false;
      attack_button.visible = false;

      field_card.visible = true;
      game_direction.visible = true;
      dummy.visible = true;

      // ----- shield
      game.socket.emit('shield_pointer_up',room_num, user_num);

    });
    shield_button.on('pointerdown', function(pointer){
      shield_button.setTexture('shield_button_off');
    });

    attack_button.on('pointerup', function(pointer){
      attack_button.setTexture('attack_button_on');
      shield_attack_board_sprite.inputEnabled = false;
      shield_attack_board.visible = false;
      shield_button.visible = false;
      attack_button.visible = false;

      field_card.visible = true;
      game_direction.visible = true;
      dummy.visible = true;

      // ----- attack
      game.socket.emit('attack_pointer_up',room_num, user_num);

    });
    attack_button.on('pointerdown', function(pointer){
      attack_button.setTexture('attack_button_off');

    });

  });

  // ----- refresh
  game.socket.on('refresh', function(){
    refresh_cards(_this);
  });

  // ----- set dummy
  game.socket.on('set_dummy', function(length, _turn){
    if(user_num == _turn){
      game.socket.emit('pointerup_dummy',room_num, user_num);

      if(length == 1){
        // dummy add the field cards
        game.socket.emit('dummy_add_field_cards',room_num);
      }
      else if(length == 2){
        dummy.setTexture('back_card');
      }

    }

  });

  // ----- get dummy
  game.socket.on('get_dummy', function(length){
    console.log("dummy length :" + length);

    if(length == 0){
      dummy.visible = false;
    }
    else if(length == 1){
      dummy.visible = true;
      dummy.setTexture('back_card');
    }
    else{
      dummy.visible = true;
      dummy.setTexture('card_dummy');
    }
    
  });

  // ----- set_text_info (player)
  game.socket.on('set_text_info', function(num_arr, name_arr){
    // user text
    if(user_count == 2){ 
      user_text1 = _this.add.text(910, 20, "Player"+ num_arr[0] +' : ' + name_arr[0], {
        font: "30px DungGeunMo",
        fill: "#56FF37",
        align: "center"
      });

      user_text1.setStroke('#000', 7);

      user_text2 = _this.add.text(910, 70, 'Player'+ num_arr[1] +' : ' + name_arr[1], {
        font: "30px DungGeunMo",
        fill: "#56FF37",
        align: "center"
      });

      user_text2.setStroke('#000', 7);

    }
    else if(user_count == 3){
      user_text1 = _this.add.text(910, 20, "Player"+ num_arr[0] +' : ' + name_arr[0], {
        font: "30px DungGeunMo",
        fill: "#56FF37",
        align: "center"
      });

      user_text1.setStroke('#000', 7);

      user_text2 = _this.add.text(910, 70, 'Player'+ num_arr[1] +' : ' + name_arr[1], {
        font: "30px DungGeunMo",
        fill: "#56FF37",
        align: "center"
      });

      user_text2.setStroke('#000', 7);

      user_text3 = _this.add.text(910, 120, 'Player'+ num_arr[2] +' : ' + name_arr[2], {
        font: "30px DungGeunMo",
        fill: "#56FF37",
        align: "center"
      });

      user_text3.setStroke('#000', 7);
      
    }
    else if(user_count == 4){
      user_text1 = _this.add.text(910, 20, "Player"+ num_arr[0] +' : ' + name_arr[0], {
        font: "30px DungGeunMo",
        fill: "#56FF37",
        align: "center"
      });

      user_text1.setStroke('#000', 7);

      user_text2 = _this.add.text(910, 70, 'Player'+ num_arr[1] +' : ' + name_arr[1], {
        font: "30px DungGeunMo",
        fill: "#56FF37",
        align: "center"
      });

      user_text2.setStroke('#000', 7);

      user_text3 = _this.add.text(910, 120, 'Player'+ num_arr[2] +' : ' + name_arr[2], {
        font: "30px DungGeunMo",
        fill: "#56FF37",
        align: "center"
      });

      user_text3.setStroke('#000', 7);
      
      user_text4 = _this.add.text(910, 170, 'Player'+ num_arr[3] +' : ' + name_arr[3], {
        font: "30px DungGeunMo",
        fill: "#56FF37",
        align: "center"
      });

      user_text4.setStroke('#000', 7);

    }

  });

  // ----- set_text_info (bomb)
  game.socket.on('set_bomb', function(_bomb_cnt){
    // bomb text and bomb image
    if(_bomb_cnt > 0){ // when bomb count > 0
      bomb.visible = true; // image on
      bomb_text.visible = true; // text on

      // bomb text
      if(_bomb_cnt < 10){ // bomb count < 10 
        bomb_text.setText("0"+ String(_bomb_cnt));
      }
      else{ // bomb count >= 10
        bomb_text.setText(String(_bomb_cnt));
      }

    }
    else if(_bomb_cnt == 0){ // bomb count == 0
      bomb.visible = false; // image off
      bomb_text.visible = false; // text off
    }

  });
  
  // ----- set_player_nums and direction
  game.socket.on('set_player_nums_and_direction', function(player_arr, _turn, _dir, _num){

    // num == 1 : create player nums and direction
    // num == 2 : refresh player nums and direction
    var direction;

    console.log("set player nums");
    console.log("player_arr : "+player_arr);
    console.log("_turn : " + _turn);

    // --- setting direction
    if(_dir == 0){ // 반시계 방향 ( + )
      direction = 1;
      direction_img = 'l_direction';
      direction_text.setText("진행 방향 : 반시계 방향");
    }
    else if(_dir == 1){ // 시계 방향 ( - )
      direction = -1;
      direction_img = 'r_direction'; 
      direction_text.setText("진행 방향 : 시계 방향");
    }

    //find index
    var index = player_arr.indexOf(user_num);

    // --- setting player1 (user)
    if (player_arr[index] == '1'){
      if (_turn == '1'){
        player1_num_img = 'f_num_1';
      }
      else{
        player1_num_img = 'num_1';
      }
    }
    else if (player_arr[index] == '2'){
      if (_turn == '2'){
        player1_num_img = 'f_num_2';
      }
      else{
        player1_num_img = 'num_2';
      }
    }
    else if (player_arr[index] == '3'){
      if (_turn == '3'){
        player1_num_img = 'f_num_3';
      }
      else{
        player1_num_img = 'num_3';
      }
    }
    else if (player_arr[index] == '4'){
      if (_turn == '4'){
        player1_num_img = 'f_num_4';
      }
      else{
        player1_num_img = 'num_4';
      }
    }

    // --- other user

    // 1 vs 1
    if(user_count == 2){
      index += direction;
      
      if(index == 2){
        index = 0;
      }
      else if(index == -1){
        index = 1;
      }


      if(player_arr[index] == '1'){
        if (_turn == '1'){
          player3_num_img = 'f_num_1';
        }
        else{
          player3_num_img = 'num_1';
        }
      }
      else if(player_arr[index] == '2'){
        if (_turn == '2'){
          player3_num_img = 'f_num_2';
        }
        else{
          player3_num_img = 'num_2';
        }
      }
      else if(player_arr[index] == '3'){
        if (_turn == '3'){
          player3_num_img = 'f_num_3';
        }
        else{
          player3_num_img = 'num_3';
        }
      }
      else if(player_arr[index] == '4'){
        if (_turn == '4'){
          player3_num_img = 'f_num_4';
        }
        else{
          player3_num_img = 'num_4';
        }
      }
    }

    // 1 vs 1 vs 1
    if(user_count == 3){
      index += direction;
      
      if(index == 3){
        index = 0;
      }
      else if(index == -1){
        index = 2;
      }
      
      if(player_arr[index] == '1'){
        if (_turn == '1'){
          player2_num_img = 'f_num_1';
        }
        else{
          player2_num_img = 'num_1';
        }
      }
      else if(player_arr[index] == '2'){
        if (_turn == '2'){
          player2_num_img = 'f_num_2';
        }
        else{
          player2_num_img = 'num_2';
        }
      }
      else if(player_arr[index] == '3'){
        if (_turn == '3'){
          player2_num_img = 'f_num_3';
        }
        else{
          player2_num_img = 'num_3';
        }
      }
      else if(player_arr[index] == '4'){
        if (_turn == '4'){
          player2_num_img = 'f_num_4';
        }
        else{
          player2_num_img = 'num_4';
        }
      }

      // -----

      index += direction;
      
      if(index == 3){
        index = 0;
      }
      else if(index == -1){
        index = 2;
      }
      
      if(player_arr[index] == '1'){
        if (_turn == '1'){
          player3_num_img = 'f_num_1';
        }
        else{
          player3_num_img = 'num_1';
        }
      }
      else if(player_arr[index] == '2'){
        if (_turn == '2'){
          player3_num_img = 'f_num_2';
        }
        else{
          player3_num_img = 'num_2';
        }
      }
      else if(player_arr[index] == '3'){
        if (_turn == '3'){
          player3_num_img = 'f_num_3';
        }
        else{
          player3_num_img = 'num_3';
        }
      }
      else if(player_arr[index] == '4'){
        if (_turn == '4'){
          player3_num_img = 'f_num_4';
        }
        else{
          player3_num_img = 'num_4';
        }
      }

    }

    // 1 vs 1 vs 1 vs 1
    if(user_count == 4){
      index += direction;
      
      if(index == 4){
        index = 0;
      }
      else if(index == -1){
        index = 3;
      }
      
      if(player_arr[index] == '1'){
        if (_turn == '1'){
          player2_num_img = 'f_num_1';
        }
        else{
          player2_num_img = 'num_1';
        }
      }
      else if(player_arr[index] == '2'){
        if (_turn == '2'){
          player2_num_img = 'f_num_2';
        }
        else{
          player2_num_img = 'num_2';
        }
      }
      else if(player_arr[index] == '3'){
        if (_turn == '3'){
          player2_num_img = 'f_num_3';
        }
        else{
          player2_num_img = 'num_3';
        }
      }
      else if(player_arr[index] == '4'){
        if (_turn == '4'){
          player2_num_img = 'f_num_4';
        }
        else{
          player2_num_img = 'num_4';
        }
      }

      // -----

      index += direction;
      
      if(index == 4){
        index = 0;
      }
      else if(index == -1){
        index = 3;
      }
      
      if(player_arr[index] == '1'){
        if (_turn == '1'){
          player3_num_img = 'f_num_1';
        }
        else{
          player3_num_img = 'num_1';
        }
      }
      else if(player_arr[index] == '2'){
        if (_turn == '2'){
          player3_num_img = 'f_num_2';
        }
        else{
          player3_num_img = 'num_2';
        }
      }
      else if(player_arr[index] == '3'){
        if (_turn == '3'){
          player3_num_img = 'f_num_3';
        }
        else{
          player3_num_img = 'num_3';
        }
      }
      else if(player_arr[index] == '4'){
        if (_turn == '4'){
          player3_num_img = 'f_num_4';
        }
        else{
          player3_num_img = 'num_4';
        }
      }
      // -----

      index += direction;
      
      if(index == 4){
        index = 0;
      }
      else if(index == -1){
        index = 3;
      }
      
      if(player_arr[index] == '1'){
        if (_turn == '1'){
          player4_num_img = 'f_num_1';
        }
        else{
          player4_num_img = 'num_1';
        }
      }
      else if(player_arr[index] == '2'){
        if (_turn == '2'){
          player4_num_img = 'f_num_2';
        }
        else{
          player4_num_img = 'num_2';
        }
      }
      else if(player_arr[index] == '3'){
        if (_turn == '3'){
          player4_num_img = 'f_num_3';
        }
        else{
          player4_num_img = 'num_3';
        }
      }
      else if(player_arr[index] == '4'){
        if (_turn == '4'){
          player4_num_img = 'f_num_4';
        }
        else{
          player4_num_img = 'num_4';
        }
      }
    }

    // create image or refresh image
    if(_num == 1){
      // num 1 
      player_num1 = _this.add.image(112,422,player1_num_img).setInteractive();
          
      // num 2
      if (user_count > 2){
        player_num2 = _this.add.image(800,408,player2_num_img).setInteractive();
      }
          
      // num 3
      player_num3 = _this.add.image(613,87,player3_num_img).setInteractive();
          
      // num 4
      if (user_count == 4){
        player_num4 = _this.add.image(98,54,player4_num_img).setInteractive();
      }
      
      game_direction = _this.add.image(590,290,direction_img).setInteractive();
    }
    else if(_num == 2){
      if(_dir == 0){ // 반시계 방향 ( + )
        // num 1 
        player_num1.setTexture(player1_num_img);
            
        // num 2
        if(user_count > 2){
          player_num2.setTexture(player2_num_img);
        }
            
        // num 3
        player_num3.setTexture(player3_num_img);
            
        // num 4
        if(user_count == 4){
          player_num4.setTexture(player4_num_img);
        }
      }
      else if(_dir == 1){ // 시계 방향 ( - )
        if(user_count == 2){
          // num 1 
          player_num1.setTexture(player1_num_img);

          // num 3
          player_num3.setTexture(player3_num_img);
        }
        else if(user_count == 3){
          // num 1 
          player_num1.setTexture(player1_num_img);

          // num 2
          player_num2.setTexture(player3_num_img);

          // num 3
          player_num3.setTexture(player2_num_img);
        }
        else if(user_count == 4){
          // num 1 
          player_num1.setTexture(player1_num_img);

          // num 2
          player_num2.setTexture(player4_num_img);

          // num 3
          player_num3.setTexture(player3_num_img);

          // num 4
          player_num4.setTexture(player2_num_img);
        }

      }

      game_direction.setTexture(direction_img);
    }

  });

  // ----- set_player_info
  game.socket.on('set_player_info', function(player_arr, _field, _bombs, _turn, _d_length){

    sprite1.clear(_this);
    // sprite1.destroy();
    // sprite1 = _this.add.group();
    
    console.log("set_player_info");
    console.log("player_arr :" + player_arr);
    console.log("player_arr.length :"+ player_arr.length);
  
    var field_split = _field.split("_"); 
    var temp_split;

    if(player_arr.length == 0){
      sprite1.visible = false;
    }
    else if(player_arr.length < 20){
  
      for(var i=0; i<player_arr.length; i++)
      {
        sprite = sprite1.create(205+i*25,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
        temp_split = player_arr[i].split("_");
        
        if(user_num == _turn){ //  when player turn
          if(shield_attack_board_state == 0){ // not choose shield attack time
            if(_bombs > 0){ // bomb count > 0     
              if(temp_split[1] == 'p'){ // player can play a bomb card
                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);

                });
              }
            }
            else{ // bomb count == 0
              if(field_split[0] == temp_split[0] || field_split[1] == temp_split[1] || temp_split[0] == '4' || temp_split[0] == 'c' || field_split[0] == '4' || field_split[0] == 'c'){
                // 1. same color
                // 2. same number || same arrow || same ban || same plus
                // 3. player card is plus 4 card
                // 4. player card is change color
                // 5. field card is plus 4 card
                // 6. field card is change color

                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);
          
                });
              }
            }
          }
        }
      }
  
    }
    else if(player_arr.length < 27){
  
      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite1.create(205+i*18,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
        temp_split = player_arr[i].split("_");

        if(user_num == _turn){ //  when player turn
          if(shield_attack_board_state == 0){ // not choose shield attack time
            if(_bombs > 0){ // bomb count > 0     
              if(temp_split[1] == 'p'){ // player can play a bomb card
                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);

                });
              }
            }
            else{ // bomb count == 0
              if(field_split[0] == temp_split[0] || field_split[1] == temp_split[1] || temp_split[0] == '4' || temp_split[0] == 'c' || field_split[0] == '4' || field_split[0] == 'c'){
                // 1. same color
                // 2. same number || same arrow || same ban || same plus
                // 3. player card is plus 4 card
                // 4. player card is change color
                // 5. field card is plus 4 card
                // 6. field card is change color

                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);
          
                });
              }
            }
          }
        }
  
      }
  
    }
    else if(player_arr.length < 34){
  
      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite1.create(205+i*14,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
        temp_split = player_arr[i].split("_");

        if(user_num == _turn){ //  when player turn
          if(shield_attack_board_state == 0){ // not choose shield attack time
            if(_bombs > 0){ // bomb count > 0     
              if(temp_split[1] == 'p'){ // player can play a bomb card
                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);

                });
              }
            }
            else{ // bomb count == 0
              if(field_split[0] == temp_split[0] || field_split[1] == temp_split[1] || temp_split[0] == '4' || temp_split[0] == 'c' || field_split[0] == '4' || field_split[0] == 'c'){
                // 1. same color
                // 2. same number || same arrow || same ban || same plus
                // 3. player card is plus 4 card
                // 4. player card is change color
                // 5. field card is plus 4 card
                // 6. field card is change color

                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);
          
                });
              }
            }
          }
        }
  
      }
  
    }
    else if(player_arr.length < 47){
  
      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite1.create(205+i*10,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
        temp_split = player_arr[i].split("_");

        if(user_num == _turn){ //  when player turn
          if(shield_attack_board_state == 0){ // not choose shield attack time
            if(_bombs > 0){ // bomb count > 0     
              if(temp_split[1] == 'p'){ // player can play a bomb card
                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);

                });
              }
            }
            else{ // bomb count == 0
              if(field_split[0] == temp_split[0] || field_split[1] == temp_split[1] || temp_split[0] == '4' || temp_split[0] == 'c' || field_split[0] == '4' || field_split[0] == 'c'){
                // 1. same color
                // 2. same number || same arrow || same ban || same plus
                // 3. player card is plus 4 card
                // 4. player card is change color
                // 5. field card is plus 4 card
                // 6. field card is change color

                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);
          
                });
              }
            }
          }
        }
  
      }
  
    }
    else if(player_arr.length < 77){
  
      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite1.create(205+i*6,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
        temp_split = player_arr[i].split("_");

        if(user_num == _turn){ //  when player turn
          if(shield_attack_board_state == 0){ // not choose shield attack time
            if(_bombs > 0){ // bomb count > 0     
              if(temp_split[1] == 'p'){ // player can play a bomb card
                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);

                });
              }
            }
            else{ // bomb count == 0
              if(field_split[0] == temp_split[0] || field_split[1] == temp_split[1] || temp_split[0] == '4' || temp_split[0] == 'c' || field_split[0] == '4' || field_split[0] == 'c'){
                // 1. same color
                // 2. same number || same arrow || same ban || same plus
                // 3. player card is plus 4 card
                // 4. player card is change color
                // 5. field card is plus 4 card
                // 6. field card is change color

                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);
          
                });
              }
            }
          }
        }
  
      }
  
    }
    else{
  
      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite1.create(205+i*4,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
        temp_split = player_arr[i].split("_");

        if(user_num == _turn){ //  when player turn
          if(shield_attack_board_state == 0){ // not choose shield attack time
            if(_bombs > 0){ // bomb count > 0     
              if(temp_split[1] == 'p'){ // player can play a bomb card
                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);

                });
              }
            }
            else{ // bomb count == 0
              if(field_split[0] == temp_split[0] || field_split[1] == temp_split[1] || temp_split[0] == '4' || temp_split[0] == 'c' || field_split[0] == '4' || field_split[0] == 'c'){
                // 1. same color
                // 2. same number || same arrow || same ban || same plus
                // 3. player card is plus 4 card
                // 4. player card is change color
                // 5. field card is plus 4 card
                // 6. field card is change color

                sprite.on('pointerover', function(event){
                  this.y -=70;
                });
                sprite.on('pointerout', function(event){
                  this.y +=70;
                });
                sprite.on('pointerup', function(pointer){
                  sprite1.clear(_this);
                  
                  // ----- play a card
                  game.socket.emit('play_a_card',room_num, user_num, this.name);
                  field_card.setTexture(player_arr[this.name]);
          
                });
              }
            }
          }
        }
  
      }
  
    }
  
  });

  // ----- set_other_player_info2
  game.socket.on('set_other_player_info2', function(player_arr){

        for(var i=0; i<player_arr.length; i++)
        {
          if(player_arr.length == 0){
            sprite2.visible = false;
          }
          else if(player_arr.length <= 12){
            if(i < 11){
              var sprite = sprite2.create(815,340-i*20,'other_card')
              sprite.angle += 270;
            }
            else if(i == 11){
              var sprite = sprite2.create(815,340-i*20,'other_card')
              sprite.angle += 270;
            }
          }
          else if(player_arr.length > 12){
            if(i < 11){
              var sprite = sprite2.create(815,340-i*20,'other_card')
              sprite.angle += 270;
            }
            else if(i == 11){
              var sprite = sprite2.create(815,340-i*20,'p_other_card')
              sprite.angle += 270;
            }
            else if(i > 11){
              break;
            }
          }
        }
  
  });

  // ----- set_other_player_info3
  game.socket.on('set_other_player_info3', function(player_arr){

        for(var i=0; i<player_arr.length; i++)
        {
          if(player_arr.length == 0){
            sprite3.visible = false;
          }
          else if(player_arr.length <= 12){
            if(i < 11){
              var sprite = sprite3.create(547-i*20,73,'other_card')
              sprite.angle += 180;
            }
            else if(i == 11){
              var sprite = sprite3.create(547-i*20,73,'other_card')
              sprite.angle += 180;
            }
          }
          else if(player_arr.length > 12){
            if(i < 11){
              var sprite = sprite3.create(547-i*20,73,'other_card')
              sprite.angle += 180;
            }
            else if(i == 11){
              var sprite = sprite3.create(547-i*20,73,'p_other_card')
              sprite.angle += 180;
            }
            else if(i > 11){
              break;
            }
          }
        }
  
  });

  // ----- set_other_player_info4
  game.socket.on('set_other_player_info4', function(player_arr){

      for(var i=0; i<player_arr.length; i++)
      {
        if(player_arr.length == 0){
          sprite4.visible = false;
        }
        else if(player_arr.length <= 12){
          if(i < 11){
            var sprite = sprite4.create(85,114+i*20,'other_card')
            sprite.angle += 90;
          }
          else if(i == 11){
            var sprite = sprite4.create(85,114+i*20,'other_card')
            sprite.angle += 90;
          }
        }
        else if(player_arr.length > 12){
          if(i < 11){
            var sprite = sprite4.create(85,114+i*20,'other_card')
            sprite.angle += 90;
          }
          else if(i == 11){
            var sprite = sprite4.create(85,114+i*20,'p_other_card')
            sprite.angle += 90;
          }
          else if(i > 11){
            break;
          }
        }
      }

  });

  // ----- set_field_card
  game.socket.on('set_field_card', function(_field_card){
      field_card.setTexture(_field_card);
  });

  // ----- show change color board
  game.socket.on('show_change_color_board', function(){
    color_board_sprite.inputEnabled = true;
    color_board.visible = true;
    y_color.visible = true;
    r_color.visible = true;
    g_color.visible = true;
    b_color.visible = true;

    field_card.visible = false;
    game_direction.visible = false;
    dummy.visible = false;

  });

  // ----- show shield attack board
  game.socket.on('show_shield_attack_board_board', function(){
    shield_attack_board_sprite.inputEnabled = true;
    shield_attack_board.visible = true;
    shield_button.visible = true;
    attack_button.visible = true;
    
    field_card.visible = false;
    game_direction.visible = false;
    dummy.visible = false;

  });

  // ----- set the other yuno num
  game.socket.on('set_the_other_yuno_num', function(num, _user_num, _turn, _dir){
    // num = 1 pointerdown
    // num = 0 pointerup

    if(num == 1){ // other user yuno button pointerdown

      //find and set the player num img
      if((_user_num == 1 && (player2_num_img == 'num_1' || player2_num_img == 'f_num_1')) || (_user_num == 2 && (player2_num_img == 'num_2' || player2_num_img == 'f_num_2')) || (_user_num == 3 && (player2_num_img == 'num_3' || player2_num_img == 'f_num_3')) || (_user_num == 4 && (player2_num_img == 'num_4' || player2_num_img == 'f_num_4'))){
        temp_player_num2 = _user_num;
        temp_player2_num_img = player2_num_img;
        
        if(_turn == _user_num){ // if other player is turn
          player2_num_img = 'f_num_yuno';
        }
        else{ // or not
          player2_num_img = 'num_yuno';
        }

      }
      else if((_user_num == 1 && (player3_num_img == 'num_1' || player3_num_img == 'f_num_1')) || (_user_num == 2 && (player3_num_img == 'num_2' || player3_num_img == 'f_num_2')) || (_user_num == 3 && (player3_num_img == 'num_3' || player3_num_img == 'f_num_3')) || (_user_num == 4 && (player3_num_img == 'num_4' || player3_num_img == 'f_num_4'))){
        temp_player_num3 = _user_num;
        temp_player3_num_img = player3_num_img;
        
        if(_turn == _user_num){ // if other player is turn
          player3_num_img = 'f_num_yuno';
        }
        else{ // or not
          player3_num_img = 'num_yuno';
        }

      }
      else if((_user_num == 1 && (player4_num_img == 'num_1' || player4_num_img == 'f_num_1')) || (_user_num == 2 && (player4_num_img == 'num_2' || player4_num_img == 'f_num_2')) || (_user_num == 3 && (player4_num_img == 'num_3' || player4_num_img == 'f_num_3')) || (_user_num == 4 && (player4_num_img == 'num_4' || player4_num_img == 'f_num_4'))){
        temp_player_num4 = _user_num;
        temp_player4_num_img = player4_num_img;
        
        if(_turn == _user_num){ // if other player is turn
          player4_num_img = 'f_num_yuno';
        }
        else{ // or not
          player4_num_img = 'num_yuno';
        }
       
      }
      
    }
    
    else if(num == 0){ // other user yuno button pointerup
      if(_user_num == temp_player_num2){
        player2_num_img = temp_player2_num_img;

      }
      else if(_user_num == temp_player_num3){
        player3_num_img = temp_player3_num_img;

      }
      else if(_user_num == temp_player_num4){
        player4_num_img = temp_player4_num_img;

      }
      
    }

    // refresh the player nums
    if(_dir == 0){ // 반시계 방향 ( + )
              
      // num 2
      if(user_count > 2){
        player_num2.setTexture(player2_num_img);
      }
              
      // num 3
      player_num3.setTexture(player3_num_img);
              
      // num 4
      if(user_count == 4){
        player_num4.setTexture(player4_num_img);
      }

    }
    else if(_dir == 1){ // 시계 방향 ( - )
      if(user_count == 2){
        // num 3
        player_num3.setTexture(player3_num_img);

      }
      else if(user_count == 3){
        // num 2
        player_num2.setTexture(player3_num_img);
  
        // num 3
        player_num3.setTexture(player2_num_img);

      }
      else if(user_count == 4){
        // num 2
        player_num2.setTexture(player4_num_img);
  
        // num 3
        player_num3.setTexture(player3_num_img);
  
        // num 4
        player_num4.setTexture(player2_num_img);
        
      }
  
    }

  });

  // ----- set the player shield icons
  game.socket.on('set_the_player_shield_icons', function(_player_arr, _shield_arr, _dir){
    // _state = false : shield off
    // _state = ture : shield on

    //find index
    var index = _player_arr.indexOf(user_num);

    // set the shield icons
    if(_dir == 0){ // 반시계 방향 ( + )
      if(user_count == 2){
        if(_shield_arr[index] == 1){
          player1_shield_img.visible = true;
        }
        else{
          player1_shield_img.visible = false;
        }
        
        index += 1;
        if(index == 2){
          index = 0;
        }

        if(_shield_arr[index] == 1){
          player3_shield_img.visible = true;
        }
        else{
          player3_shield_img.visible = false;
        }

      }
      else if(user_count == 3){
        if(_shield_arr[index] == 1){
          player1_shield_img.visible = true;
        }
        else{
          player1_shield_img.visible = false;
        }
        
        index += 1;
        if(index == 3){
          index = 0;
        }

        if(_shield_arr[index] == 1){
          player2_shield_img.visible = true;
        }
        else{
          player2_shield_img.visible = false;
        }

        index += 1;
        if(index == 3){
          index = 0;
        }

        if(_shield_arr[index] == 1){
          player3_shield_img.visible = true;
        }
        else{
          player3_shield_img.visible = false;
        }
      }
      else if(user_count == 4){
        if(_shield_arr[index] == 1){
          player1_shield_img.visible = true;
        }
        else{
          player1_shield_img.visible = false;
        }
        
        index += 1;
        if(index == 4){
          index = 0;
        }

        if(_shield_arr[index] == 1){
          player2_shield_img.visible = true;
        }
        else{
          player2_shield_img.visible = false;
        }

        index += 1;
        if(index == 4){
          index = 0;
        }

        if(_shield_arr[index] == 1){
          player3_shield_img.visible = true;
        }
        else{
          player3_shield_img.visible = false;
        }

        index += 1;
        if(index == 4){
          index = 0;
        }

        if(_shield_arr[index] == 1){
          player4_shield_img.visible = true;
        }
        else{
          player4_shield_img.visible = false;
        }
      }

    }
    else if(_dir == 1){ // 시계 방향 ( - )
      if(user_count == 2){
        if(_shield_arr[index] == 1){
          player1_shield_img.visible = true;
        }
        else{
          player1_shield_img.visible = false;
        }
        
        index -= 1;
        if(index == -1){
          index = 1;
        }

        if(_shield_arr[index] == 1){
          player3_shield_img.visible = true;
        }
        else{
          player3_shield_img.visible = false;
        }

      }
      else if(user_count == 3){
        if(_shield_arr[index] == 1){
          player1_shield_img.visible = true;
        }
        else{
          player1_shield_img.visible = false;
        }

        index -= 1;
        if(index == -1){
          index = 2;
        }

        if(_shield_arr[index] == 1){
          player3_shield_img.visible = true;
        }
        else{
          player3_shield_img.visible = false;
        }

        index -= 1;
        if(index == -1){
          index = 2;
        }

        if(_shield_arr[index] == 1){
          player2_shield_img.visible = true;
        }
        else{
          player2_shield_img.visible = false;
        }

      }
      else if(user_count == 4){
        if(_shield_arr[index] == 1){
          player1_shield_img.visible = true;
        }
        else{
          player1_shield_img.visible = false;
        }

        index -= 1;
        if(index == -1){
          index = 3;
        }

        if(_shield_arr[index] == 1){
          player4_shield_img.visible = true;
        }
        else{
          player4_shield_img.visible = false;
        }

        index -= 1;
        if(index == -1){
          index = 3;
        }

        if(_shield_arr[index] == 1){
          player3_shield_img.visible = true;
        }
        else{
          player3_shield_img.visible = false;
        }

        index -= 1;
        if(index == -1){
          index = 3;
        }

        if(_shield_arr[index] == 1){
          player2_shield_img.visible = true;
        }
        else{
          player2_shield_img.visible = false;
        }
        
      }
  
    }

  });

  // ----- set the color board state
  game.socket.on('set_color_board_state', function(state){
    color_board_state = state;
  });

  // ----- set the shield attack board state
  game.socket.on('set_shield_attack_board_state', function(state){
    shield_attack_board_state = state;
  });

  // ----- set the player yuno state
  game.socket.on('set_player_yuno_state', function(state){
    player_yuno_state = state;
  });

  // ----- refresh only the player cards
  game.socket.on('refresh_only_player_cards', function(){
    // player1
    get_card(_this);
    
    // player2
    if (user_count > 2){
      other_card(_this,2);
    }

    // player3
    other_card(_this,3);
    
    // plyer 4
    if (user_count == 4){
      other_card(_this,4);
    }

  });

  // ----- win !
  game.socket.on('win', function(num){
    // num : 0 = normal
    // num : 1 = abnormal
    _this.add.image(450,300,'win');

    if(num == 0){
      // get player score
      game.socket.emit('get_player_score', room_num);
    }
  });

  // ----- lose
  game.socket.on('lose', function(){
    _this.add.image(450,300,'lose');

  });

  // ----- set player score
  game.socket.on('set_player_score', function(_name_arr, _score_arr, num){
    
    // num : 0 = normal
    // num : 1 = abnormal

    var temp;
    var rank_num = 1;
    var rank_arr = new Array();
    var rank_color;

    // arr sorting
    for (var i = 0; i < _name_arr.length - 1; i++){
      for ( var j = 0; j < _name_arr.length - 1- i; j++){
        if (_score_arr[j] > _score_arr[j + 1]){
            //name change
            temp = _name_arr[j];
            _name_arr[j] = _name_arr[j + 1];
            _name_arr[j + 1] = temp;

            //score change 
            temp = _score_arr[j];
            _score_arr[j] = _score_arr[j + 1];
            _score_arr[j + 1] = temp;
        }
      }
    }

    // add rank
    for (var i = 0; i < _name_arr.length; i++){
      if(i == 0){
        rank_arr.push(rank_num);
      }
      else{
        if(_score_arr[i-1] == _score_arr[i]){
          rank_arr.push(rank_num);
        }
        else{
          rank_num += 1;
          rank_arr.push(rank_num);
        }
      }
    }

    // set texts
    if(num == 0){ // normal
      if(user_count == 2){
        rank_text = _this.add.text(910, 130, "RANK", {
          font: "50px DungGeunMo",
          fill: "#FF8300",
          align: "center"
        });
        
        rank_text.setStroke('#000', 7);

        rank1_text = _this.add.text(910, 200, rank_arr[0] + '. ' + _name_arr[0] + ' (' + _score_arr[0] + ' score)', {
          font: "30px DungGeunMo",
          fill: "#FFEB01",
          align: "center"
        });

        rank1_text.setStroke('#000', 7);

        if(rank_arr[1] == 1){
          rank_color = "#FFEB01";
        }
        else{
          rank_color = "#C9C9C9"
        }

        rank2_text = _this.add.text(910, 250, rank_arr[1] + '. ' + _name_arr[1] + ' (' + _score_arr[1] + ' score)', {
          font: "30px DungGeunMo",
          fill: rank_color,
          align: "center"
        });

        rank2_text.setStroke('#000', 7);

      }
      else if(user_count == 3){
        rank_text = _this.add.text(910, 180, "RANK", {
          font: "50px DungGeunMo",
          fill: "#FF8300",
          align: "center"
        });
        
        rank_text.setStroke('#000', 7);

        rank1_text = _this.add.text(910, 250, rank_arr[0] + '. ' + _name_arr[0] + ' (' + _score_arr[0] + ' score)', {
          font: "30px DungGeunMo",
          fill: "#FFEB01",
          align: "center"
        });

        rank1_text.setStroke('#000', 7);

        if(rank_arr[1] == 1){
          rank_color = "#FFEB01";
        }
        else{
          rank_color = "#C9C9C9"
        }

        rank2_text = _this.add.text(910, 300, rank_arr[1] + '. ' + _name_arr[1] + ' (' + _score_arr[1] + ' score)', {
          font: "30px DungGeunMo",
          fill: rank_color,
          align: "center"
        });

        rank2_text.setStroke('#000', 7);

        if(rank_arr[2] == 1){
          rank_color = "#FFEB01";
        }
        else{
          rank_color = "#C9C9C9"
        }

        rank3_text = _this.add.text(910, 350, rank_arr[2] + '. ' + _name_arr[2] + ' (' + _score_arr[2] + ' score)', {
          font: "30px DungGeunMo",
          fill: rank_color,
          align: "center"
        });

        rank3_text.setStroke('#000', 7);
        
      }
      else if(user_count == 4){
        rank_text = _this.add.text(910, 230, "RANK", {
          font: "50px DungGeunMo",
          fill: "#FF8300",
          align: "center"
        });
        
        rank_text.setStroke('#000', 7);

        rank1_text = _this.add.text(910, 300, rank_arr[0] + '. ' + _name_arr[0] + ' (' + _score_arr[0] + ' score)', {
          font: "30px DungGeunMo",
          fill: "#FFEB01",
          align: "center"
        });

        rank1_text.setStroke('#000', 7);

        if(rank_arr[1] == 1){
          rank_color = "#FFEB01";
        }
        else{
          rank_color = "#C9C9C9"
        }

        rank2_text = _this.add.text(910, 350, rank_arr[1] + '. ' + _name_arr[1] + ' (' + _score_arr[1] + ' score)', {
          font: "30px DungGeunMo",
          fill: rank_color,
          align: "center"
        });

        rank2_text.setStroke('#000', 7);

        if(rank_arr[2] == 1){
          rank_color = "#FFEB01";
        }
        else{
          rank_color = "#C9C9C9"
        }

        rank3_text = _this.add.text(910, 400, rank_arr[2] + '. ' + _name_arr[2] + ' (' + _score_arr[2] + ' score)', {
          font: "30px DungGeunMo",
          fill: rank_color,
          align: "center"
        });

        rank3_text.setStroke('#000', 7);

        if(rank_arr[3] == 1){
          rank_color = "#FFEB01";
        }
        else{
          rank_color = "#C9C9C9"
        }

        rank4_text = _this.add.text(910, 450, rank_arr[3] + '. ' + _name_arr[3] + ' (' + _score_arr[3] + ' score)', {
          font: "30px DungGeunMo",
          fill: rank_color,
          align: "center"
        });

        rank4_text.setStroke('#000', 7);

      }
    }
    else if(num == 1){ // abnormal
      if(user_count == 2){
        rank_text = _this.add.text(910, 130, "RANK", {
          font: "50px DungGeunMo",
          fill: "#FF8300",
          align: "center"
        });
        
        rank_text.setStroke('#000', 7);

        rank1_text = _this.add.text(910, 200, rank_arr[0] + '. ' + _name_arr[0] + ' (' + _score_arr[0] + ' score)', {
          font: "30px DungGeunMo",
          fill: "#FFEB01",
          align: "center"
        });

        rank1_text.setStroke('#000', 7);

      }
      else if(user_count == 3){
        rank_text = _this.add.text(910, 180, "RANK", {
          font: "50px DungGeunMo",
          fill: "#FF8300",
          align: "center"
        });
        
        rank_text.setStroke('#000', 7);

        rank1_text = _this.add.text(910, 250, rank_arr[0] + '. ' + _name_arr[0] + ' (' + _score_arr[0] + ' score)', {
          font: "30px DungGeunMo",
          fill: "#FFEB01",
          align: "center"
        });

        rank1_text.setStroke('#000', 7);

        if(rank_arr[1] == 1){
          rank_color = "#FFEB01";
        }
        else{
          rank_color = "#C9C9C9"
        }

        rank2_text = _this.add.text(910, 300, rank_arr[1] + '. ' + _name_arr[1] + ' (' + _score_arr[1] + ' score)', {
          font: "30px DungGeunMo",
          fill: rank_color,
          align: "center"
        });

        rank2_text.setStroke('#000', 7);
        
      }
      else if(user_count == 4){
        rank_text = _this.add.text(910, 230, "RANK", {
          font: "50px DungGeunMo",
          fill: "#FF8300",
          align: "center"
        });
        
        rank_text.setStroke('#000', 7);

        rank1_text = _this.add.text(910, 300, rank_arr[0] + '. ' + _name_arr[0] + ' (' + _score_arr[0] + ' score)', {
          font: "30px DungGeunMo",
          fill: "#FFEB01",
          align: "center"
        });

        rank1_text.setStroke('#000', 7);

        if(rank_arr[1] == 1){
          rank_color = "#FFEB01";
        }
        else{
          rank_color = "#C9C9C9"
        }

        rank2_text = _this.add.text(910, 350, rank_arr[1] + '. ' + _name_arr[1] + ' (' + _score_arr[1] + ' score)', {
          font: "30px DungGeunMo",
          fill: rank_color,
          align: "center"
        });

        rank2_text.setStroke('#000', 7);

        if(rank_arr[2] == 1){
          rank_color = "#FFEB01";
        }
        else{
          rank_color = "#C9C9C9"
        }

        rank3_text = _this.add.text(910, 400, rank_arr[2] + '. ' + _name_arr[2] + ' (' + _score_arr[2] + ' score)', {
          font: "30px DungGeunMo",
          fill: rank_color,
          align: "center"
        });

        rank3_text.setStroke('#000', 7);

      }
    }


  });

  // ----- set disconnected player
  game.socket.on('set_disconnected_player', function(text_index, num_arr, name_arr){

    if(text_index == 0){
      user_text1.setText("Player"+ num_arr[0] +' : ' + name_arr[0] + "(disconnect) ");
      user_text1.setColor('#ff3c4a');
    }
    else if(text_index == 1){
      user_text2.setText("Player"+ num_arr[1] +' : ' + name_arr[1] + "(disconnect) ");
      user_text2.setColor('#ff3c4a');
    }
    else if(text_index == 2){
      user_text3.setText("Player"+ num_arr[2] +' : ' + name_arr[2] + "(disconnect) ");
      user_text3.setColor('#ff3c4a');
    }
    else if(text_index == 3){
      user_text4.setText("Player"+ num_arr[3] +' : ' + name_arr[3] + "(disconnect) ");
      user_text4.setColor('#ff3c4a');
    }
  });

  // ----- del cookies..
  game.socket.on('del_cookies', function(){
    setCookie('CNT', '');
    setCookie('NAME', '');
    setCookie('P_NUM', '');
    setCookie('R_NUM', '');
  });

}

function other_card(_this,num) {

  if(num == 2){
    sprite2.clear(_this);

    // ----- get_other_player_info
    game.socket.emit('get_other_player_info',room_num, user_num, 1);

  }

  else if(num == 3){
    sprite3.clear(_this);

    // ----- get_other_player_info
    if(user_count > 2){ // user_count == 3 || 4
      game.socket.emit('get_other_player_info3',room_num, user_num, 2);
    }
    else{ // user_count == 2
      game.socket.emit('get_other_player_info3',room_num, user_num, 1);
    }

  }

  else if(num == 4){
    sprite4.clear(_this);

    // ----- get_other_player_info
    game.socket.emit('get_other_player_info',room_num, user_num, 3);

  }
}

function get_card(_this){
  console.log("get_card");
  
  // ----- get_player_info
  game.socket.emit('get_player_info',room_num, user_num);

}

function refresh_cards(_this){
  console.log("refresh_cards");

  //----- player yuno state
  player_yuno_state = 0;

  //----- player_nums
  game.socket.emit('get_player_nums',room_num, user_num, 2);

  //----- dummy
  game.socket.emit('get_dummy_length',room_num, user_num, 2);

  // ----- field_card
  game.socket.emit('get_field_card',room_num, 2);

  //----- player_cards

  // player1
  get_card(_this);
  
  // player2
  if (user_count > 2){
    other_card(_this,2);
  }

  // player3
  other_card(_this,3);
  
  // plyer 4
  if (user_count == 4){
    other_card(_this,4);
  }

  // ----- bomb
  game.socket.emit('get_bomb_count',room_num);

}

function update(){

}
