var P2Game = {};

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

var score = 0;
var health = 150;
var mapscollected = 0;
var maxHealth = 100;
var currentHealth = 100;
var haskey = false;
var grudgehit = false;

P2Game.Boot = function (game){

},

P2Game.Boot.prototype = {
	preload: function () {
		this.load.image('preloaderbar','assets/loader.png');

	},

	create: function (){
		this.game.stage.backgroundColor = '#abf';
		this.state.start('Preload');
	},

	update: function(){

	},
}



P2Game.Preload = function (game){

},

P2Game.Preload.prototype = {
	preload: function () {
		this.game.stage.backgroundColor = '#63B8FF';
		var preloaderbar = this.add.sprite(150,300, 'preloaderbar');
		this.game.add.text
		var style3 = {font: "30px Arial", fill:"#DC143C"};
		var scoringstuff = "Game is Loading....";
 		var winstatement = game.add.text(200,200,scoringstuff,style3);
		this.load.audio('horrormusic',['assets/horrortheme.mp3','assets/horrortheme.ogg']);
		this.load.audio('grudgemusic',['assets/girl2.mp3','assets/girl2.ogg']);
		this.load.audio('beep-noise',['assets/Beep.mp3','assets/Beep.ogg']);
		this.load.spritesheet('player', 'assets/girl-sprite.png',31, 48, 8); 
		this.load.spritesheet('grudgesprite', 'assets/grudgesprite.png',57.5, 45, 12); 
		this.load.image('blacktile','assets/blacktile.png');
		this.load.tilemap('creepytile', 'assets/creepytile.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('woods-bg','assets/woods-bg.png');
		this.load.image('fog','assets/fog.png');
		this.load.image('housebg','assets/housebg.png');
		this.load.image('keepout','assets/keepout.png');
		this.load.image('tohousebar','assets/tohousebar.png');
		this.load.image('flashscreen','assets/flashscreen.png');
		this.load.image('insanitybar','assets/insanitybar.png');
		this.load.image('alarmbox','assets/alarmbox.png');
		this.load.image('scaryface','assets/scaryface.jpg');
		this.load.image('roadsign','assets/roadsign.png');
		this.load.image('camptent','assets/camptent.png');
		this.load.image('lockedcar','assets/lockedcar.png');
		this.load.image('carkeys','assets/carkeys.png');

	},


	create: function (){

		this.state.start('Intro');

	},

	update: function(){

	},
}


P2Game.Intro = function (game) {

	this.player;
	this.bg;
	this.music1;
	this.music2;

},

// //////////////  Intro	/////////////////////////


P2Game.Intro.prototype = {

preload: function () {
 

    },

    create: function () {

        this.game.stage.backgroundColor = '#000000';
	
	this.music1 = this.game.add.audio('horrormusic');
	this.music1.play('',0,1,true);

	this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fadePicture, this);
	var style3 = {font: "30px Arial", fill:"#DC143C"};
	var scoringstuff = "You went camping last night. \nNow everyone is gone...";
	this.camping = game.add.text(200,200,scoringstuff,style3);

	
	
	

   },

   fadePicture: function () {
	game.add.tween(this.camping).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
	this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fadePicture2, this);

   },

   fadePicture2: function () {
	var style3 = {font: "30px Arial", fill:"#DC143C"};
	this.camping2 = game.add.text(200,200,"You must find your way out \nof the woods before you die.", style3);
	this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fadePicture3, this);

   },

   fadePicture3: function () {
	game.add.tween(this.camping2).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
	this.game.time.events.add(Phaser.Timer.SECOND * 2, this.intoWoods, this);

   },

   intoWoods: function(){
	this.state.start('Woods');
   },


}

//  Woods //////////////////////////////////////////////////////////

P2Game.Woods = function (game) {
	this.player;
	this.bg;
	this.layer;
	this.music;

};

P2Game.Woods.prototype = {

    create: function () {

	this.game.world.setBounds(0,0,2000,600);

	this.bg = game.add.tileSprite(0, 0, 2000, 600, 'woods-bg');
	this.bg.scale.set(2,2);
	
	this.game.physics.arcade.gravity.y = 200;
	
	this.keepout = this.game.add.sprite(1900,500,'keepout');
	this.keepout.scale.set(.3,.3);

	this.roadsign = this.game.add.sprite(1000,480,'roadsign');
	this.game.physics.arcade.enable(this.roadsign);
	//this.roadsign.body.collideWorldBounds = true;
	this.roadsign.body.allowGravity = false;
	this.roadsign.scale.set(.1,.1);

	this.camptent = this.game.add.sprite(500,500,'camptent');
	this.camptent.scale.set(.3,.3);
	this.camptent.alpha = .3;

	this.lockedcar = this.game.add.sprite(100,500,'lockedcar');
	this.game.physics.arcade.enable(this.lockedcar);
	this.lockedcar.body.collideWorldBounds = true;
	this.lockedcar.scale.set(.3,.3);

	this.insanitybar = this.game.add.sprite(50,50,'insanitybar');
	this.insanitybar.scale.set(.2,.2);
	//this.insanitybar.cropEnabled = true;

	this.player = this.game.add.sprite(1200,550,'player');
	//this.player = this.game.add.sprite(1900,50,'player');
	this.game.physics.arcade.enable(this.player);
	this.player.animations.add('idle', [0],1,true);
	this.player.animations.add('left', [0,1,2,3],4,true);
	this.player.animations.add('right', [4,5,6,7],4,true);
	this.player.animations.play('right');
	this.player.body.collideWorldBounds = true;
	//this.player.scale.set(4.5,4.5);
	this.game.camera.follow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.player.healthbar = this.insanitybar;
	
	this.tohousebar = this.game.add.sprite(1995,400,'tohousebar');
	this.game.physics.arcade.enable(this.tohousebar);
	this.tohousebar.scale.set(4,1);
	this.tohousebar.body.allowGravity = false;


	
	
	
	this.fog = game.add.tileSprite(0,0,2000,600,'fog');
	this.fog.alpha = 1.4
	

    },

 
	movetohouse: function(){
		this.world.setBounds(0,0,0,0);
		this.state.start('HauntedHouse');
	},   

	
	opencar: function(){
		if (haskey == false){
			var style3 = {font: "20px Arial", fill:"#DC143C"};
			this.carislocked = game.add.text(80,400,"The car is locked. \nYou must have the key to leave.", style3);
		}

		else{
			this.state.start('End1');
		}

	},





    update: function () {

	this.game.physics.arcade.overlap(this.player, this.lockedcar, this.opencar, null, this);

	this.insanitybar.position.x = this.player.position.x -10;
	this.insanitybar.position.y = this.player.position.y -20;

	this.insanitybar.width = (currentHealth/ maxHealth) * this.insanitybar.width;

	this.game.physics.arcade.overlap(this.player,this.tohousebar,this.movetohouse,null,this);
	

    this.fog.tilePosition.x -= 2;
	

if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -100;

        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.body.velocity.y = -200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 100;
	        if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();
	    //this.player.body.velocity.y =200;
	    this.player.body.velocity.x = 0;
            this.facing = 'idle';
        }
    }

    },


    render: function () {
	

    }

};
//////
P2Game.HauntedHouse = function (game) {
	this.player2;
	this.cursors;
	this.lightAngle = Math.PI/4;
	this.numberOfRays = 20;
	this.rayLength = 100;
	this.maskGraphics;
	this.bg;
	this.bitmap;
	this.walls;
	this.LIGHT_RADIUS = 100;
	this.music;
	this.moving = "left";
	this.growface = false;
	this.growface2 = false;
	this.i = 0;
	this.j = 0;


};


P2Game.HauntedHouse.prototype = {

    create: function () {

	this.bg = game.add.tileSprite(0, 0, 2000, 600, 'housebg');
	this.bg.mask = this.maskGraphics;

	this.beep-noise = this.game.add.audio('beep-noise');


	this.map = this.game.add.tilemap('creepytile');
	this.map.addTilesetImage('blacktile');
    	this.layer =this. map.createLayer('Tile Layer 1');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);

	this.grudgesprite = this.game.add.sprite(600,530,'grudgesprite');
	this.game.physics.arcade.enable(this.grudgesprite);
	this.grudgesprite.animations.add('left', [0,1,2,3,4,5],6,true);
	this.grudgesprite.animations.add('right', [6,7,8,9,10,11],6,true);
	this.grudgesprite.animations.play('left');
	this.grudgesprite.body.velocity.x = 80;
	this.grudgesprite.scale.set(1.2,1.2);

	this.alarmbox = this.game.add.sprite(400,200, 'alarmbox');
	this.game.physics.arcade.enable(this.alarmbox);
	//this.alarmbox.scale.set(4,4);
	//this.alarmbox.allowGravity = false;

	this.alarmbox2 = this.game.add.sprite(1200,400, 'alarmbox');
	this.game.physics.arcade.enable(this.alarmbox2);
	//this.alarmbox2.scale.set(4,4);
	//this.alarmbox2.allowGravity = false;

	this.carkeys = this.game.add.sprite(50,500, 'carkeys');
	this.game.physics.arcade.enable(this.carkeys);
	this.carkeys.scale.set(.3,.3);
	
	
	this.game.physics.arcade.gravity.y = 200;

	this.shadowTexture = this.game.add.bitmapData(2100, this.game.height);

    // Create an object that will use the bitmap as a texture
	var lightSprite = this.game.add.image(0, 0, this.shadowTexture);


    // Set the blend mode to MULTIPLY. This will darken the colors of
    // everything below this sprite.
	lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    // Simulate a pointer click/tap input at the center of the stage
    // when the example begins running.
	//this.game.input.activePointer.x = this.game.width/2;
	//this.game.input.activePointer.y = this.game.height/2;


	this.insanitybar = this.game.add.sprite(50,50,'insanitybar');
	this.insanitybar.scale.set(.2,.2);
	//this.insanitybar.cropEnabled = true;

	this.player2 = this.game.add.sprite(80,50,'player');
	this.game.physics.arcade.enable(this.player2);
	this.player2.animations.add('idle', [0],1,true);
	this.player2.animations.add('left', [0,1,2,3],4,true);
	this.player2.animations.add('right', [4,5,6,7],4,true);
	this.player2.animations.play('right');
	this.player2.body.collideWorldBounds = true;
	//this.player.scale.set(4.5,4.5);
	this.game.camera.follow(this.player2);
        this.cursors = this.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	this.game.time.events.repeat(Phaser.Timer.SECOND *6, 100, this.grudge,this);
	this.game.time.events.repeat(Phaser.Timer.SECOND *6.15, 100, this.grudge3, this);
	this.game.time.events.repeat(Phaser.Timer.SECOND *6.3, 100, this.grudge4, this);
	this.game.time.events.repeat(Phaser.Timer.SECOND *.1, 100000, this.screamface, this);
	this.game.time.events.repeat(Phaser.Timer.SECOND *.1, 100000, this.screamface2, this);

	//this.game.time.events.repeat(Phaser.Timer.SECOND *25, 10, this.grudge2,this);
	

},


grudge: function(){
	this.flashscreen = this.game.add.sprite(0,0,'flashscreen');
	this.game.time.events.add(Phaser.Timer.SECOND * .0001, this.killscreen, this);




},
grudge3: function(){
	this.flashscreen = this.game.add.sprite(0,0,'flashscreen');
	this.game.time.events.add(Phaser.Timer.SECOND * .0001, this.killscreen, this);



},
grudge4: function(){
	this.flashscreen = this.game.add.sprite(0,0,'flashscreen');
	this.game.time.events.add(Phaser.Timer.SECOND * .1, this.killscreen, this);


},

grudge2: function(){
	this.music1 = this.game.add.audio('grudgemusic');
	if(grudgehit == false){
		this.music1.play();
		currentHealth = currentHealth - 1;
		grudgehit = true;
		this.game.time.events.add(Phaser.Timer.SECOND * 5, this.ungrudge, this);

	}

},

ungrudge: function(){
	grudgehit = false;
},

killscreen: function(){
	this.flashscreen.kill();
},


minusradius: function(){
	if(this.LIGHT_RADIUS > 40){
		this.LIGHT_RADIUS --;
	}

},

updatemovement: function(){
	if(this.moving == "left"){
		this.grudgesprite.body.velocity.x = -80;
		this.grudgesprite.animations.play('right');
		this.moving = "right";
	}
	else{
		this.grudgesprite.body.velocity.x = 80;
		this.grudgesprite.animations.play('left');
		this.moving = "left";
	}
},

updateShadowTexture: function(){
    //this.shadowTexture.context.fillStyle = 'rgb(00, 00, 00)';
    this.shadowTexture.context.fillStyle = 'rgb(00, 00, 00)';
    this.shadowTexture.context.fillRect(0, 0, 2100, this.game.height);

    // Draw circle of light
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
    this.shadowTexture.context.arc(this.player2.x+10, this.player2.y+10,
        this.LIGHT_RADIUS, 0, Math.PI*2);
    this.shadowTexture.context.fill();

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;


},

	scaryfacefunc: function(body1, body2){
		this.scaryface = this.game.add.sprite(0, 0, 'scaryface'); 
		this.growface = true;
		body2.kill()
		this.beep-noise.play();
	},

	screamface: function(){
		if(this.growface == true){
			this.i ++;
			this.scaryface.scale.set(this.i+5,this.i+5)
		}
		if(this.i > 5){
			this.scaryface.kill()
			this.growface = false;
			i = 0;
		}
	},

	screamface2: function(){
		if(this.growface2 == true){
			this.j ++;
			this.scaryface2.scale.set(this.i+5,this.i+5)
		}
		if(this.j > 5){
			this.scaryface2.kill()
			this.growface2 = false;
			j = 0;
		}
	},

	scaryfacefunc2: function(body1, body2){
		this.scaryface2 = this.game.add.sprite(700, 0, 'scaryface'); 
		this.growface2 = true;
		body2.kill()
		this.beep-noise.play();
	},


	grabkeys: function(body1, body2){
		body2.kill()
		haskey = true;

	},


    
    update: function () {

	this.updateShadowTexture();

	this.insanitybar.position.x = this.player2.position.x -10;
	this.insanitybar.position.y = this.player2.position.y -20;
	this.insanitybar.width = (currentHealth / maxHealth) * this.insanitybar.width;

	this.game.physics.arcade.overlap(this.player2,this.alarmbox, this.scaryfacefunc, null, this);
	this.game.physics.arcade.overlap(this.player2,this.alarmbox2, this.scaryfacefunc2, null, this);
	this.game.physics.arcade.overlap(this.player2,this.carkeys, this.grabkeys, null, this);
	this.game.physics.arcade.collide(this.player2,this.layer);
	this.game.physics.arcade.collide(this.carkeys,this.layer);
	this.game.physics.arcade.collide(this.alarmbox,this.layer);
	this.game.physics.arcade.collide(this.alarmbox2,this.layer);
	this.game.physics.arcade.collide(this.grudgesprite,this.layer); //, this.updatemovement, null, this);
	this.game.physics.arcade.overlap(this.player2, this.grudgesprite, this.grudge2, null, this);

	
	if(this.grudgesprite.body.velocity.x == 0){
		this.updatemovement();
	}
	
if (this.cursors.left.isDown)
    {
        this.player2.body.velocity.x = -100;

        if (this.facing != 'left')
        {
            this.player2.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.up.isDown && this.player2.body.onFloor())
    {
        this.player2.body.velocity.y = -200;

        if (this.facing != 'idle')
        {
            this.player2.animations.play('idle');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player2.body.velocity.x = 100;
	        if (this.facing != 'right')
        {
            this.player2.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player2.animations.stop();
	    //this.player.body.velocity.y =200;
	    this.player2.body.velocity.x = 0;
            this.facing = 'idle';
        }
    }
},



    render: function () {
	//this.game.debug.bodyInfo(currenthealth, 32, 32);
	//this.game.debug.bodyInfo(this.grudgesprite, 32, 32);

    	
},

};


P2Game.End1 = function (game) {


    this.cursors;

    this.result = 'Move with cursors. Hit an object to change State';

};

P2Game.End1.prototype = {

    create: function () {


	this.game.stage.backgroundColor = '#00FFFF';
	//score = score + mapscollected;	

	var style3 = {font: "30px Arial", fill:"#DC143C"};
	var scoringstuff = ("Congratulations. You survived... this time");
 	var winstatement = game.add.text(50,200,scoringstuff,style3);
	

    },


    
    update: function () {


    },


    render: function () {

    }

};

game.state.add('Boot', P2Game.Boot);
game.state.add('End1', P2Game.End1);
game.state.add('Intro', P2Game.Intro);
game.state.add('Preload', P2Game.Preload);
game.state.add('Woods', P2Game.Woods);
game.state.add('HauntedHouse', P2Game.HauntedHouse);


game.state.start('Boot');


//http://pngimg.com/upload/cloud_PNG9.png
//http://1.bp.blogspot.com/-BRDvO5FB0_c/TunrpKSdOxI/AAAAAAAAAkQ/jCPaUzJsPdM/s320/finished%2Btexture%2B1.png
//http://comps.canstockphoto.com/can-stock-photo_csp22266106.jpg
//http://image.shutterstock.com/display_pic_with_logo/655876/655876,1326729721,4/stock-photo-dark-tiled-background-93082717.jpg



