class Game{
    constructor(){}
    start(){
        if (gameState===0){
            background(bgImg1); 
            player=new Player();
            form=new Form();
            form.display();
        }
        bg=createSprite(width/2,height/2 - 200,100,100);
        bg.addImage(bgImg2);
        bg.x = bg.width /2;
        bg.velocityX=-6;
        //bg.scale=0.5;


        pikachu=createSprite(200,displayHeight - 350,10,10);
        pikachu.addAnimation("running",pikachuImg);
        pikachu.scale=0.7;
        pikachu.setCollider("rectangle", -50, 0, 350, 250);
        //pikachu.debug=true;

        invisibleGround = createSprite(550,displayHeight - 250,2000,10);
        invisibleGround.visible = false;

        cloudsGroup = new Group();
        redPBGroup = new Group();
        blackPBGroup = new Group();

        score = 0;
        distance = 0;
    }

    play(){
        background("white"); 

        if(keyDown("UP") && pikachu.y >= 150) {
           pikachu.velocityY = -8;
        }

        pikachu.velocityY = pikachu.velocityY + 0.8;
        pikachu.collide(invisibleGround)

        if (bg.x < 0){
           bg.x = bg.width/2;
        }

        this.spawnClouds();

        var rand = Math.round(random(1,2));
        if (rand===1){
            this.spawnRedPokeballs();
        }
        else {
            this.spawnBlackPokeballs();
        }
    
        if(redPBGroup.isTouching(pikachu)){
            redPBGroup.destroyEach();
            score +=1;
        } 
        else if(blackPBGroup.isTouching(pikachu)){
            blackPBGroup.destroyEach();
            score -=1;
        }   

        drawSprites();

        textSize(30);
        fill("white");
        text("Score: "+ score, displayWidth-200,50);

        text("Distance: "+ distance, displayWidth-230,100);
        distance = distance + Math.round(getFrameRate()/60);
        bg.velocityX = -(6 + 3*distance/100);
    }

    spawnRedPokeballs() {
        if (frameCount%120===0){
          redPB=createSprite(displayWidth,500,10,10);
          redPB.addImage(redPBImg);
          redPB.velocityX=-5;
          redPB.scale=0.2;
          redPB.lifetime=displayWidth/5;
          redPBGroup.add(redPB);
        }
    }

    spawnBlackPokeballs() {
        if (frameCount%200===0){
          blackPB=createSprite(displayWidth,500,10,10);
          blackPB.addImage(blackPBImg);
          blackPB.velocityX=-5;
          blackPB.scale=0.4;
          blackPB.lifetime=displayWidth/5;
          blackPBGroup.add(blackPB);
        }
    }
     
    spawnClouds() {
        if  (frameCount%150===0){
          cloud=createSprite(displayWidth,100,10,10);
          cloud.addImage(cloudImg);
          cloud.y = Math.round(random(100,160));
          cloud.velocityX=-5;
          cloud.scale=0.2;
          cloud.lifetime=displayWidth/5;
          cloudsGroup.add(cloud);
        }
     }
}