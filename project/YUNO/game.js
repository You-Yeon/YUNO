
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

  // this.socket = io();
  // this.socket.emit('aa', 'aa');

  // this.socket.on('set_board', function(num){ //3

  //   A(num);

  // });

  this.add.image(450,300,'board2');


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

  for(var i=0; i<7; i++)
  {
    var j = parseInt(Math.random()*total_card.length);
    player1.push(total_card[j]);
    total_card.splice(j,1);
  }

  for(var i=0; i<7; i++)
  {
    var j = parseInt(Math.random()*total_card.length);
    player2.push(total_card[j]);
    total_card.splice(j,1);
  }

  for(var i=0; i<7; i++)
  {
    var j = parseInt(Math.random()*total_card.length);
    player3.push(total_card[j]);
    total_card.splice(j,1);
  }

  for(var i=0; i<7; i++)
  {
    var j = parseInt(Math.random()*total_card.length);
    player4.push(total_card[j]);
    total_card.splice(j,1);
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
  player_num1 = this.add.image(112,422,'num_1').setInteractive();
  player_num2 = this.add.image(800,408,'num_2').setInteractive();
  player_num3 = this.add.image(613,87,'num_3').setInteractive();
  player_num4 = this.add.image(98,54,'num_4').setInteractive();

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
  total_card.splice(k,1);

  //player card
  sprite1 = this.add.group();
  sprite2 = this.add.group();
  sprite3 = this.add.group();
  sprite4 = this.add.group();

  get_card();

  other_card(2);
  other_card(3);
  other_card(4);

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

  if(num == 3){
    sprite3.clear(this);

    for(var i=0; i<player3.length; i++)
    {
      var sprite = sprite3.create(547-i*20,73,'other_card');
      sprite.angle += 180;
      sprite.name = i;
    }
  }

  if(num == 4){
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


function update()
{
  // if(sprite1.x > 100){
  //     sprite1.x -=1;
  // }
  // if(sprite1.y > 100){
  //     sprite1.y -=1;
  // }

}
