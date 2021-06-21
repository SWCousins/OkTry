enchant();
window.onload = function() {
    var game = new Core(420, 420);
    game.keybind(40, 'down');
    game.keybind(32, 'a');
    game.fps = 15;
    game.preload('chara0.png', 'space3.png', 'icon0.png', 'map1.png', 'chkns.png', 'chara5.png', 'Test art.png');
    game.onload = function() {
        //Create Map
        var map = new Map(16, 16);
        map.image = game.assets['map1.png'];
        map.loadData([//15 rows tall, 26 col wide
            [0,49,49,49,49,49,49,49,49,49,49,49,49,49,0,0,49,49,49,49,49,49,49,49,49,0],
            [34,1,1,1,1,1,1,1,1,1,1,1,1,1,32,34,1,1,1,1,6,100,100,100,6,32],
            [34,1,1,1,1,1,1,1,1,1,1,1,1,1,32,34,1,1,1,1,6,100,100,100,6,32],
            [34,1,1,1,1,1,1,1,1,1,1,1,1,1,32,34,1,1,1,1,22,1,22,22,22,32],
            [34,1,1,1,1,1,1,1,1,1,1,1,1,1,32,34,1,1,1,1,1,1,1,1,1,32],
            [34,1,1,1,1,1,1,1,1,1,1,1,1,1,32,34,1,1,1,1,1,1,1,1,1,32],
            [34,1,1,1,1,1,1,1,1,1,92,1,1,1,32,34,1,1,1,1,1,1,1,1,1,32],
            [34,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,32],
            [34,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,32],
            [34,1,1,1,1,1,1,1,1,1,1,1,1,1,92,1,1,1,1,1,1,1,1,1,1,32],
            [34,147,148,149,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,32],
            [34,163,164,165,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,32],
            [34,179,180,181,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,32],
            [0,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            /*
            [0,1,2,3,4,5,6,7,8,9,10,            11,12,13,  14,15],
            [16,17,18,19,20,21,22,23,24,25,26,  27,28,29,  30,31],
            [32,33,34,35,36,37,38,39,40,41,42,  43,44,45,  46,47],
            [48,49,50,51,52,53,54,55,56,57,58,  59,60,61,  62,63],
            [64,65,66,67,68,69,70,71,72,73,74,  75,76,77,  78,79],
            [80,81,82,83,84,85, 86, 87,88,89,90,  91,92,93,  94,95],
            [96,97,98,99,100,101,102,103,104,105,106,  107,  108,109,110,111],
            [112,113,114,115,116,117, 118,119,120,121,122,123,124,125,126,127],
            [128,129,130,131,132,133, 134,135,136,137,138,139,140,141,142,143],
            [144,145,146,147,148,149],
            [160,161,162,163,164,165],
            [176,177,178,179,180,181],
            */
            
        ]);
        
        //Main Player
        /*
        Standing down: 7
        Walking down: 6 + 8
        Standing left: 16
        Walking left: 15 + 17
        Standing right: 25
        Walking right: 24 + 26
        Standing up: 34
        Walking up: 33 + 35
        */
        var girl = new Sprite(32, 32);
        girl.image = game.assets['chara0.png'];
        girl.offset = 7;
        girl.direction = 7;
        girl.x = 4*16;
        girl.y = 4*16;
        girl.frame = girl.offset;
        girl.hasKey = false;
        girl.hasBerry = false;
        girl.andDone = false;
        girl.chknAttack = false;
        
        
        //Bear
        let bear = new Sprite(32, 32);
        bear.image = game.assets['space3.png'];
        bear.x = 22 * 16;
        bear.y = 1*16;
        bear.frame = [0,0,0,3,3,3,3,3,3,3,0,0];
        bear.key = false;
        bear.castle = true;
        
        
        
        //Castle as a Class
        let Castle = enchant.Class.create(enchant.Sprite, {
           initialize: function(x, y) {
               enchant.Sprite.call(this, 16, 16);
               this.x = x*16;
               this.y = y*16;
               this.image = game.assets['map1.png'];
               this.frame = 91;
               this.addEventListener('enterframe', function(e){
                    if (this.intersect(girl) && girl.hasKey) {
                        bear.castle = false;
                        girl.hasKey = false;
                        game.rootScene.removeChild(this);
                        
                }
                });
               game.rootScene.addChild(this);
           } 
        });
        
        //Heart as a class
        let Heart = enchant.Class.create(enchant.Sprite, {
            initialize: function (x, y) {
                enchant.Sprite.call(this, 16, 16);
                this.x = x;
                this.y = y;
                this.image = game.assets['icon0.png'];
                this.frame = 10;
                game.rootScene.addChild(this);
            }
        });
        
        //Key as a class
        let Key = enchant.Class.create(enchant.Sprite, {
                initialize: function(x, y) {
                enchant.Sprite.call(this, 16, 16);
                this.x = x;
                this.y = y;
                this.image = game.assets['icon0.png'];
                this.frame = 33;
                this.addEventListener('enterframe', function(e){
                    if (girl.intersect(castle)) {
                        game.rootScene.removeChild(this);
                        girl.hasKey = false;
                    //game.rootScene.removeChild(this);
                } else if (this.intersect(girl) ) {
                    this.x = girl.x;
                    this.y = girl.y -8
                    girl.hasKey = true;
                } else {
                    this.x++;
                }
                    
                });
                game.rootScene.addChild(this);
            }
        
        });
        
        //Big Tree as a Class
        let BigTree = enchant.Class.create(enchant.Sprite, {
            initialize: function() {
                enchant.Sprite.call(this, 32, 32);
                this.x = 320;
                this.y = 128;
                this.image = game.assets['map1.png'];
                this.frame = [4];
                game.rootScene.addChild(this);
            }
        });
        
        //Berry class
        let Berry = enchant.Class.create(enchant.Sprite, {
            initialize: function(x) {
                enchant.Sprite.call(this, 16, 16);
                this.x = chicken.x +36;
                this.y = chicken.y +36;
                this.image = game.assets['icon0.png'];
                this.frame = x;
                girl.hasBerry = true;
                this.addEventListener('enterframe', function(e){
                    if (this.intersect(girl)) {
                        girl.hasBerry = false;
                        game.rootScene.removeChild(this);
                    }
                })
                game.rootScene.addChild(this);
            }
        });
        
        //Chicken Class
        let Chicken = enchant.Class.create(enchant.Sprite, {
            initialize: function() {
                enchant.Sprite.call(this, 48, 48);
                this.x = 40;
                this.y = 120;
                setF = 24
                setB = 12
                this.section = Math.floor(Math.random() * 8) * 3;
                if(this.section > 9){
                    setF = 60
                    setB = 48
                } else {
                    setF = 24
                    setB = 12
                }
                
                this.image = game.assets['chkns.png'];
                this.fFrame = [setF+this.section,setF+this.section,setF+2+this.section,setF+2+this.section,setF+1+this.section,setF+1+this.section];
                this.bFrame = [setB+this.section,setB+this.section,setB+2+this.section,setB+2+this.section,setB+1+this.section,setB+1+this.section];
                this.retreat = false;
                this.holdIt = 0;
                girl.chknAttack = true;
                
                this.addEventListener('enterframe', function(e){
                    if(this.x < 125 && !this.retreat) {
                        this.x++;
                        this.frame = this.fFrame;
                    } if (this.x >=125) {
                        
                        setTimeout(function() {
                            this.frame = this.fFrame;
                        }, 450)
                        this.retreat=true; 
                    } if (this.retreat) {
                        this.x--;
                        this.frame = this.bFrame;
                    } if (this.x < 70 && this.retreat) {
                        this.x = this.x;
                        this.holdIt++;
                    } if (this.holdIt > 12) {
                        this.retreat = false;
                        this.holdIt = 0;
                        game.rootScene.removeChild(this);
                        game.rootScene.removeChild(knight);
                    }
                })
                game.rootScene.addChild(this);
                
            }
        });
        
        //Knight Class
        let Knight = enchant.Class.create(enchant.Sprite, {
            initialize: function() {
                enchant.Sprite.call(this, 32, 32);
                this.x = 170;
                this.y = 130;
                this.image = game.assets['chara5.png'];
                this.frame = 10; //[15,15,16,17,17,17,17,17,9,9,9,10,10,10,15,15];
                this.addEventListener('enterframe', function(e){
                    if (chicken.x >120) {
                        this.frame = [15,15,16,17,17,16,17,17,17];
                        if (!girl.hasBerry){
                            let berry = new Berry(65);
                        }
                    } else if (chicken.x<90 && chicken.retreat) {
                          this.frame = [18,18,19,19,20,20];
                          this.x++;
                    } else {
                        this.frame = 10;
                    }
                })
                game.rootScene.addChild(this);
            }
        })
        
        //Add Map
        game.rootScene.addChild(map);
        


        //Add bear
        game.rootScene.addChild(bear);
        bear.addEventListener('enterframe', function(e) {
            if (bear.domestic) {
                if (!girl.andDone && girl.x>320 && girl.y < 128)
                {
                    girl.andDone = true;
                    attack();
                }
                /*
                bear.x = girl.x + 16;
                bear.y = girl.y - 16;
                heart.x = bear.x + 8;
                heart.y = bear.y -16;
                */
                if (game.input.down && girl.y > bear.y + 32) {
                    bear.frame = [1,1,0,0,2,2];
                    bear.y++;
                    heart.x = bear.x + 8;
                    heart.y = bear.y -16;
                } else if (game.input.up && girl.y < bear.y - 32) {
                    bear.frame = [1,1,0,0,2,2];
                    bear.y--;
                    heart.x = bear.x + 8;
                    heart.y = bear.y -16;
                } else if (game.input.right && girl.x > bear.x + 22) {
                    this.scaleX = 1;
                    bear.frame = [1,1,0,0,2,2];
                    bear.x++;
                    heart.x = bear.x + 8;
                    heart.y = bear.y -16;
                } else if (game.input.left && girl.x < bear.x - 22) {
                    this.scaleX = -1;
                    bear.frame = [1,1,0,0,2,2];
                    bear.x--;
                    heart.x = bear.x + 8;
                    heart.y = bear.y -16;
                } else if (girl.x < bear.x - 22) {
                    this.scaleX = -1;
                    bear.x--;
                    bear.frame = [1,1,0,0,2,2];
                    heart.x = bear.x + 8;
                    heart.y = bear.y -16;
                } else if (girl.y > bear.y + 32) {
                    bear.frame = [1,1,0,0,2,2];
                    bear.y++;   
                    heart.x = bear.x + 8;
                    heart.y = bear.y -16;
                } else if (girl.x > bear.x + 22) {
                    this.scaleX = 1;
                    bear.x++;
                    bear.frame = [1,1,0,0,2,2];
                    heart.x = bear.x + 8;
                    heart.y = bear.y -16;
                } else if (girl.y < bear.y - 32) {
                    bear.frame = [1,1,0,0,2,2];
                    bear.y--;   
                    heart.x = bear.x + 8;
                    heart.y = bear.y -16;
                } else {
                    bear.frame = 0;
                    heart.x = bear.x + 8;
                    heart.y = bear.y -16;
                };
                
                
            }

        });
        
                //Add girl
        game.rootScene.addChild(girl);
        girl.addEventListener('enterframe', function(e) {
            
            //Char controls
            if (game.input.down) {
                girl.direction = 7;
                girl.y += 2;
                girl.frame = [6,6,7,7,8,8];
            } else if (game.input.right) {
                girl.direction = 25;
                girl.x += 2;
                girl.frame = [24,24,25,25,26,26];
            } else if (game.input.up) {
                girl.direction = 34;
                girl.y -= 2;
                girl.frame = [33,33,34,34,35,35];
            } else if (game.input.left) {
                girl.direction = 16;
                girl.x -= 2;
                girl.frame = [15, 15, 16, 16, 17, 17];
            } else if (!bear.domestic && game.input.a && !bear.castle) {  
                heart = new Heart(bear.x + 8, bear.y - 16);
                
                /*
                heart.x = bear.x + 8;
                heart.y = bear.y -16;
                */
                
                bear.frame = 0;
                bear.domestic = true;
                
            } else {
                girl.frame = girl.direction;
                girl.y = girl.y;
                girl.x = girl.x;
            } if (girl.x<48&&girl.y>160&&girl.andDone){
                girl.andDone=false;
                attack();
            } if (girl.chknAttack) {
                defend();
            }   
            
            
        });
        
        //Add Key and Castle
        let tree = new BigTree();
        let key = new Key(150,150);
        let castle = new Castle(21, 3);
        //let berry = new Berry();
         attack = function() {
             chicken = new Chicken();
            
        }
        let defend = function() {
            knight = new Knight();
            girl.chknAttack = false;
        }
    };
    
    game.start();
}