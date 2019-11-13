var express = require('express');
var router = express.Router();

router.get('/assets/taking_card_sound', function(req, res){
    res.sendFile(__dirname + '/assets/taking_card_sound.mp3');
});

router.get('/assets/bomb_sound', function(req, res){
    res.sendFile(__dirname + '/assets/bomb_sound.mp3');
});

module.exports = router;