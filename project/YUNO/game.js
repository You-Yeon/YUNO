
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
    width: 900,
    height: 600,
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
    this.load.image('board', '/assets/board');
    this.load.image('board2', '/assets/board2');
    this.load.image('board3', '/assets/board3');
    this.load.image('board4', '/assets/board4');
    this.load.image('back_card', '/assets/back_card');
    this.load.image('card_dummy','/assets/card_dummy');
    this.load.image('yuno_button_on','/assets/yuno_button_on');
    this.load.image('yuno_button_off','/assets/yuno_button_off');

    this.load.image('y0', '/assets/y_card_0');
    this.load.image('y1', '/assets/y_card_1');
    this.load.image('y2', '/assets/y_card_2');
    this.load.image('y3', '/assets/y_card_3');
    this.load.image('y4', '/assets/y_card_4');
    this.load.image('y5', '/assets/y_card_5');
    this.load.image('y6', '/assets/y_card_6');
    this.load.image('y7', '/assets/y_card_7');
    this.load.image('y8', '/assets/y_card_8');
    this.load.image('y9', '/assets/y_card_9');
    this.load.image('y_r', '/assets/y_card_arrow');
    this.load.image('y_b', '/assets/y_card_ban');
    this.load.image('y_p', '/assets/y_card_plus_2');

    this.load.image('r0', '/assets/r_card_0');
    this.load.image('r1', '/assets/r_card_1');
    this.load.image('r2', '/assets/r_card_2');
    this.load.image('r3', '/assets/r_card_3');
    this.load.image('r4', '/assets/r_card_4');
    this.load.image('r5', '/assets/r_card_5');
    this.load.image('r6', '/assets/r_card_6');
    this.load.image('r7', '/assets/r_card_7');
    this.load.image('r8', '/assets/r_card_8');
    this.load.image('r9', '/assets/r_card_9');
    this.load.image('r_r', '/assets/r_card_arrow');
    this.load.image('r_b', '/assets/r_card_ban');
    this.load.image('r_p', '/assets/r_card_plus_2');

    this.load.image('g0', '/assets/g_card_0');
    this.load.image('g1', '/assets/g_card_1');
    this.load.image('g2', '/assets/g_card_2');
    this.load.image('g3', '/assets/g_card_3');
    this.load.image('g4', '/assets/g_card_4');
    this.load.image('g5', '/assets/g_card_5');
    this.load.image('g6', '/assets/g_card_6');
    this.load.image('g7', '/assets/g_card_7');
    this.load.image('g8', '/assets/g_card_8');
    this.load.image('g9', '/assets/g_card_9');
    this.load.image('g_r', '/assets/g_card_arrow');
    this.load.image('g_b', '/assets/g_card_ban');
    this.load.image('g_p', '/assets/g_card_plus_2');

    this.load.image('b0', '/assets/b_card_0');
    this.load.image('b1', '/assets/b_card_1');
    this.load.image('b2', '/assets/b_card_2');
    this.load.image('b3', '/assets/b_card_3');
    this.load.image('b4', '/assets/b_card_4');
    this.load.image('b5', '/assets/b_card_5');
    this.load.image('b6', '/assets/b_card_6');
    this.load.image('b7', '/assets/b_card_7');
    this.load.image('b8', '/assets/b_card_8');
    this.load.image('b9', '/assets/b_card_9');
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

    this.load.image('f_num_1', '/assets/focus_num_button_1');
    this.load.image('f_num_2', '/assets/focus_num_button_2');
    this.load.image('f_num_3', '/assets/focus_num_button_3');
    this.load.image('f_num_4', '/assets/focus_num_button_4');
    this.load.image('f_num_yuno', '/assets/focus_yuno_num_button');

    this.load.image('choose_color_board', '/assets/choose_color_board');
    this.load.image('red_color_card', '/assets/red_color_card');
    this.load.image('blue_color_card', '/assets/blue_color_card');
    this.load.image('yellow_color_card', '/assets/yellow_color_card');
    this.load.image('green_color_card', '/assets/green_color_card');

    this.load.image('r_direction', '/assets/direction');
    this.load.image('l_direction', '/assets/direction2');

}

var sprite;
var sprite1;
var sprite2;
var sprite3;
var sprite4;

var total_card;
var field_card;
var dummy;
var yuno_button;
var player_num1;
var player_num2;
var player_num3;
var player_num4;

var player1_num_img = 'num_1';
var player2_num_img = 'num_2';
var player3_num_img = 'num_3';
var player4_num_img = 'num_4';

function create ()
{
  // players setting..
  // user_count = 2  -- player 1 && player 3
  // user_count = 3  -- player 1 && player 2 && player 3
  // user_count = 4  -- player 1 && player 2 && player 3 && player 4

  var _this = this;
  game.socket = io();

  // ----- start
  game.socket.on('start', function(){

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

    // game.socket.emit('aa','aa');

    // ----- set cards

    // dummy cards
    dummy = _this.add.sprite(500,250,'card_dummy').setInteractive();
    dummy.inputEnabled = true;

    dummy.on('pointerup', function(pointer){

      // ----- get dummy length
      game.socket.emit('get_dummy_length',room_num, user_num);

    });

    // ----- set player nums
    game.socket.on('set_dummy', function(length){

      if(length > 0){
        console.log("click");
        game.socket.emit('pointerup_dummy',room_num, user_num);
      }
      else{
        dummy.destroy();
      }

    });

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

    // get_field_card
    game.socket.emit('get_field_card',room_num);

    // set_field_card
    game.socket.on('set_field_card', function(_field_card){
      field_card = _this.add.image(380,250,_field_card).setInteractive();
    });

    // ----- get player nums
    game.socket.emit('get_player_nums',room_num,user_num);

    // ----- yuno_button
    yuno_button = _this.add.image(790,528,'yuno_button_on').setInteractive();
    yuno_button.inputEnabled = true;
    yuno_button.on('pointerup', function(pointer){
      yuno_button.setTexture('yuno_button_on');
      player_num1.setTexture('num_1');
    });
    yuno_button.on('pointerdown', function(pointer){
      yuno_button.setTexture('yuno_button_off');
      player_num1.setTexture('num_yuno');
    });

  });

  // ----- refresh
  game.socket.on('refresh', function(){
    refresh_cards(_this);
  });

  // ----- set_player_nums
  game.socket.on('set_player_nums', function(player_arr){

    console.log('set_player_nums');

    // --- setting player1 (user)
    if (user_num == 1){
      player1_num_img = 'num_1';
    }
    else if (user_num == 2){
      player1_num_img = 'num_2';
    }
    else if (user_num == 3){
      player1_num_img = 'num_3';
    }
    else if (user_num == 4){
      player1_num_img = 'num_4';
    }

    // --- other user

    //find index
    var index = player_arr.indexOf(user_num);

    // 1 vs 1
    if(user_count == 2){
      index += 1;
      
      if(index == 2){
        index = 0;
      }

      if(player_arr[index] == '1'){
        player3_num_img = 'num_1';
      }
      else if(player_arr[index] == '2'){
        player3_num_img = 'num_2';
      }
      else if(player_arr[index] == '3'){
        player3_num_img = 'num_3';
      }
      else if(player_arr[index] == '4'){
        player3_num_img = 'num_4';
      }
    }

    // 1 vs 1 vs 1
    if(user_count == 3){
      index += 1;
      
      if(index == 3){
        index = 0;
      }
      
      if(player_arr[index] == '1'){
        player2_num_img = 'num_1';
      }
      else if(player_arr[index] == '2'){
        player2_num_img = 'num_2';
      }
      else if(player_arr[index] == '3'){
        player2_num_img = 'num_3';
      }
      else if(player_arr[index] == '4'){
        player2_num_img = 'num_4';
      }

      // -----

      index += 1;
      
      if(index == 3){
        index = 0;
      }
      
      if(player_arr[index] == '1'){
        player3_num_img = 'num_1';
      }
      else if(player_arr[index] == '2'){
        player3_num_img = 'num_2';
      }
      else if(player_arr[index] == '3'){
        player3_num_img = 'num_3';
      }
      else if(player_arr[index] == '4'){
        player3_num_img = 'num_4';
      }

    }

    // 1 vs 1 vs 1 vs 1
    if(user_count == 4){
      index += 1;
      
      if(index == 4){
        index = 0;
      }
      
      if(player_arr[index] == '1'){
        player2_num_img = 'num_1';
      }
      else if(player_arr[index] == '2'){
        player2_num_img = 'num_2';
      }
      else if(player_arr[index] == '3'){
        player2_num_img = 'num_3';
      }
      else if(player_arr[index] == '4'){
        player2_num_img = 'num_4';
      }

      // -----

      index += 1;
      
      if(index == 4){
        index = 0;
      }
      
      if(player_arr[index] == '1'){
        player3_num_img = 'num_1';
      }
      else if(player_arr[index] == '2'){
        player3_num_img = 'num_2';
      }
      else if(player_arr[index] == '3'){
        player3_num_img = 'num_3';
      }
      else if(player_arr[index] == '4'){
        player3_num_img = 'num_4';
      }
      // -----

      index += 1;
      
      if(index == 4){
        index = 0;
      }
      
      if(player_arr[index] == '1'){
        player4_num_img = 'num_1';
      }
      else if(player_arr[index] == '2'){
        player4_num_img = 'num_2';
      }
      else if(player_arr[index] == '3'){
        player4_num_img = 'num_3';
      }
      else if(player_arr[index] == '4'){
        player4_num_img = 'num_4';
      }
    }

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

  });

  // ----- set_player_info
  game.socket.on('set_player_info', function(player_arr){

    sprite1.destroy();
    sprite1 = _this.add.group();
    
    console.log("set_player_info");
    console.log("player_arr :" + player_arr);
  
    if(player_arr.length == 0){
      sprite1.destroy();
    }
    else if(player_arr.length < 20){
  
      for(var i=0; i<player_arr.length; i++)
      {
        sprite = sprite1.create(205+i*25,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
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
    else if(player_arr.length < 27){
  
      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite1.create(205+i*18,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
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
  
    else if(player_arr.length < 34){
  
      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite1.create(205+i*14,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
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
  
    else if(player_arr.length < 47){
  
      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite1.create(205+i*10,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
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
  
    else if(player_arr.length < 77){
  
      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite1.create(205+i*6,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
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
  
    else{
  
      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite1.create(205+i*4,475,player_arr[i]).setInteractive();
        sprite.name = i;
        sprite.inputEnabled = true;
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
  
  });

  // ----- set_other_player_info2
  game.socket.on('set_other_player_info2', function(player_arr){

        for(var i=0; i<player_arr.length; i++)
        {
          var sprite = sprite2.create(815,340-i*20,'other_card')
          sprite.angle += 270;
          sprite.name = i;
        }
  
  });

  // ----- set_other_player_info3
  game.socket.on('set_other_player_info3', function(player_arr){

        for(var i=0; i<player_arr.length; i++)
        {
          var sprite = sprite3.create(547-i*20,73,'other_card')
          sprite.angle += 180;
          sprite.name = i;
        }
  
  });

  // ----- set_other_player_info4
  game.socket.on('set_other_player_info4', function(player_arr){

      for(var i=0; i<player_arr.length; i++)
      {
        var sprite = sprite4.create(85,334-i*20,'other_card')
        sprite.angle += 90;
        sprite.name = i;
      }

  });

  // ----- set_field_card
  game.socket.on('set_field_card', function(_field_card){
    field_card = _this.add.image(380,250,_field_card).setInteractive();
  });
}


function yuno_effect(){
  player_num1.setTexture('num_1');
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

  // field_card

  // ----- get_field_card
  game.socket.emit('get_field_card',room_num);

  field_card.destroy();
}

function update(){

}
