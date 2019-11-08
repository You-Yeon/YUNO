
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

var player1 = new Array();
var player2 = new Array();
var player3 = new Array();
var player4 = new Array();

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

function create ()
{
  var _this = this;

  game.socket = io();

  // set board
  if (user_count == 2){
    this.add.image(450,300,'board2');
  }
  else if (user_count == 3){
    this.add.image(450,300,'board3');
    game.socket.emit('aa','aa');
  }
  else if (user_count == 4){
    this.add.image(450,300,'board4');
  }

  //dummy
  total_card = new Array("y0", "y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9", "y_r", "y_b", "y_p",
    "y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9", "y_r", "y_b", "y_p",
    "r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r_r", "r_b", "r_p",
    "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r_r", "r_b", "r_p",
    "g0", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g_r", "g_b", "g_p",
    "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g_r", "g_b", "g_p",
    "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b_r", "b_b", "b_p",
    "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b_r", "b_b", "b_p",
    "4_p", "4_p", "4_p", "4_p", "c_c", "c_c","c_c","c_c");

  // player set 
  // user_count = 2  -- player 1 && player 3
  // user_count = 3  -- player 1 && player 2 && player 3
  // user_count = 4  -- player 1 && player 2 && player 3 && player 4

  for(var i=0; i<7; i++) // set player1 card
  {
    var j = parseInt(Math.random()*total_card.length);
    player1.push(total_card[j]);
    total_card.splice(j,1);
  }

  if (user_count > 2){
    for(var i=0; i<7; i++) // set player2 card
    {
      var j = parseInt(Math.random()*total_card.length);
      player2.push(total_card[j]);
      total_card.splice(j,1);
    }
  }

  for(var i=0; i<7; i++) // set player3 card
  {
    var j = parseInt(Math.random()*total_card.length);
    player3.push(total_card[j]);
    total_card.splice(j,1);
  }

  if (user_count == 4){
    for(var i=0; i<7; i++) // set player4 card
    {
      var j = parseInt(Math.random()*total_card.length);
      player4.push(total_card[j]);
      total_card.splice(j,1);
    }
  }

  dummy = this.add.image(500,250,'card_dummy').setInteractive();
  dummy.inputEnabled = true;

  dummy.on('pointerup', function(pointer){
    if(total_card.length>0){
      var temp = parseInt(Math.random()*total_card.length);
      player1.push(total_card[temp]);
      total_card.splice(temp,1);
      get_card();

      if(total_card.length==0){
        dummy.destroy(this);
      }
    }
  });

  //player number

  // get player nums

  var player1_num_img = 'num_1';
  var player2_num_img = 'num_2';
  var player3_num_img = 'num_3';
  var player4_num_img = 'num_4';
  
  game.socket.emit('get_player_nums',room_num);

  game.socket.on('set_player_nums', function(player_arr){

    console.log('set_player_nums');
    console.log('player_arr : '+player_arr);

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

  //yuno_button
  yuno_button = this.add.image(790,528,'yuno_button_on').setInteractive();
  yuno_button.inputEnabled = true;
  yuno_button.on('pointerup', function(pointer){
    yuno_button.setTexture('yuno_button_on');
    player_num1.setTexture('num_1');
  });
  yuno_button.on('pointerdown', function(pointer){
    yuno_button.setTexture('yuno_button_off');
    player_num1.setTexture('num_yuno');
  });

  //field_card
  var k = parseInt(Math.random()*total_card.length);
  field_card = this.add.image(380,250,total_card[k]).setInteractive();
  // field_card.name = k;
  total_card.splice(k,1);

  //player card
  sprite1 = this.add.group();
  get_card();

  if (user_count > 2){
    sprite2 = this.add.group();
    other_card(2);
  }
  
  sprite3 = this.add.group();
  other_card(3);

  if (user_count == 4){
    sprite4 = this.add.group();
    other_card(4);
  }

}


function yuno_effect(){
  player_num1.setTexture('num_1');
}

function A(num){
  if(num == 2){
    game.add.image(450,300,'board2');
  }
  else if(num == 3){
    game.add.image(450,300,'board3');
  }
  else if(num == 4){
    game.add.image(450,300,'board4');
  }
}

function other_card(num) {

  if(num == 2){
    sprite2.clear(this);

    for(var i=0; i<player2.length; i++)
    {
      var sprite = sprite2.create(815,340-i*20,'other_card');
      sprite.angle += 270;
      sprite.name = i;
    }
  }

  else if(num == 3){
    sprite3.clear(this);

    for(var i=0; i<player3.length; i++)
    {
      var sprite = sprite3.create(547-i*20,73,'other_card');
      sprite.angle += 180;
      sprite.name = i;
    }
  }

  else if(num == 4){
    sprite4.clear(this);

    for(var i=0; i<player4.length; i++)
    {
      var sprite = sprite4.create(85,334-i*20,'other_card');
      sprite.angle += 90;
      sprite.name = i;
    }
  }
}

function get_card(){

  sprite1.clear(this);

  if(player1.length < 20){

    for(var i=0; i<player1.length; i++)
    {
      var sprite = sprite1.create(205+i*25,475,player1[i]).setInteractive();
      sprite.name = i;
      sprite.inputEnabled = true;
      sprite.on('pointerover', function(event){
        this.y -=70;
      });
      sprite.on('pointerout', function(event){
        this.y +=70;
      });
      sprite.on('pointerup', function(pointer){
        sprite1.clear(this);
        field_card.setTexture(player1[this.name]);
        player1.splice(this.name,1);
        get_card();
      });

    }

  }
  else if(player1.length < 27){

    for(var i=0; i<player1.length; i++)
    {
      var sprite = sprite1.create(205+i*18,475,player1[i]).setInteractive();
      sprite.name = i;
      sprite.inputEnabled = true;
      sprite.on('pointerover', function(event){
        this.y -=70;
      });
      sprite.on('pointerout', function(event){
        this.y +=70;
      });
      sprite.on('pointerup', function(pointer){
        sprite1.clear(this);
        field_card.setTexture(player1[this.name]);
        player1.splice(this.name,1);
        get_card();
      });

    }

  }

  else if(player1.length < 34){

    for(var i=0; i<player1.length; i++)
    {
      var sprite = sprite1.create(205+i*14,475,player1[i]).setInteractive();
      sprite.name = i;
      sprite.inputEnabled = true;
      sprite.on('pointerover', function(event){
        this.y -=70;
      });
      sprite.on('pointerout', function(event){
        this.y +=70;
      });
      sprite.on('pointerup', function(pointer){
        sprite1.clear(this);
        field_card.setTexture(player1[this.name]);
        player1.splice(this.name,1);
        get_card();
      });

    }

  }

  else if(player1.length < 47){

    for(var i=0; i<player1.length; i++)
    {
      var sprite = sprite1.create(205+i*10,475,player1[i]).setInteractive();
      sprite.name = i;
      sprite.inputEnabled = true;
      sprite.on('pointerover', function(event){
        this.y -=70;
      });
      sprite.on('pointerout', function(event){
        this.y +=70;
      });
      sprite.on('pointerup', function(pointer){
        sprite1.clear(this);
        field_card.setTexture(player1[this.name]);
        player1.splice(this.name,1);
        get_card();
      });

    }

  }

  else if(player1.length < 77){

    for(var i=0; i<player1.length; i++)
    {
      var sprite = sprite1.create(205+i*6,475,player1[i]).setInteractive();
      sprite.name = i;
      sprite.inputEnabled = true;
      sprite.on('pointerover', function(event){
        this.y -=70;
      });
      sprite.on('pointerout', function(event){
        this.y +=70;
      });
      sprite.on('pointerup', function(pointer){
        sprite1.clear(this);
        field_card.setTexture(player1[this.name]);
        player1.splice(this.name,1);
        get_card();
      });

    }

  }

  else{

    for(var i=0; i<player1.length; i++)
    {
      var sprite = sprite1.create(205+i*4,475,player1[i]).setInteractive();
      sprite.name = i;
      sprite.inputEnabled = true;
      sprite.on('pointerover', function(event){
        this.y -=70;
      });
      sprite.on('pointerout', function(event){
        this.y +=70;
      });
      sprite.on('pointerup', function(pointer){
        sprite1.clear(this);
        field_card.setTexture(player1[this.name]);
        player1.splice(this.name,1);
        get_card();
      });

    }

  }

}


function update(){

}
