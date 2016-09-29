var globalVars = {
    "character": {
        "name": "Warrior",
        "health": 100,
        "damage": 20,
        "skillLevel": 5,
        "armour": 10,
        "imageUrl": "hero2.jpg"
    },
    "monsterList": [
        { "name": "Orc",  "damage": 10,"imageUrl": "orc.png", "skillLevel": 3, "armour": 3 },
        { "name": "Goblin", "damage": 12, "imageUrl": "goblin.jpg", "skillLevel": 4, "armour": 5  },
        { "name": "Troll",  "damage": 16, "imageUrl": "troll.jpg", "skillLevel": 5, "armour": 3  },
        { "name": "Blood Angel",  "damage": 20, "imageUrl": "blood-angel.jpg", "skillLevel": 9, "armour": 5  },
        { "name": "Bugbear",  "damage": 12, "imageUrl": "bugbear.jpg", "skillLevel": 4, "armour": 3  },
        { "name": "Carrion Crawler",  "damage": 4, "imageUrl": "carrion-crawler.jpg", "skillLevel": 3, "armour": 3  },
        { "name": "Two Headed Dog",  "damage": 4, "imageUrl": "death-dog.jpg", "skillLevel": 3, "armour": 4  },
        { "name": "Deviant Ant",  "damage": 7, "imageUrl": "deviant-ant.jpg", "skillLevel": 4, "armour": 6  },
        { "name": "Displacer Beast",  "damage": 4, "imageUrl": "deviant-ant.jpg", "skillLevel": 4, "armour": 7  }
    ],
    "currentMonster": {},
    "monstersKilled": [],
};

var dungeonGame = {
    gameInit: function(){
        console.log("Game Initialized");

        //Load Hero
        dungeonGame.renderCharacterCard(globalVars.character);

        // Get First Monster
        dungeonGame.getRandomMonster();
        dungeonGame.renderMonsterCard();

        $('.character-attack-button-container').on('click', '.character-attack-button', function(){
            $('#messages-container').html("");
            dungeonGame.characterAttack();

        });
        $('.monster-card-output').on('click', '.monster-attack-button', function(){
            $('#messages-container').html("");
            dungeonGame.monsterAttack();

        });
        $('.continue-button').on('click', function(){
           dungeonGame.finishRound();
        });
    },

    // ------------------------------------
    // U T I L I T Y    F U N C T I O N S
    // ------------------------------------
    addMessage: function(message){
        var $el = $('#messages-container');
        $el.append("<div class='inner-message-container'></div>");
        $el.children().last();
        $el.append(message);
    },

    finishRound: function(){
        $('.monster-card-output').html("");
        $('#messages-container').html("");
        $('.attack-button-container').css('display', 'block');
        $('.continue-button-container').css('display', 'none');

        dungeonGame.getRandomMonster();
        // first monster
        dungeonGame.renderMonsterCard();
    },

    generateHealth: function (level) {
        var min = 20;
        var max = level * 20;
        var healthToReturn =  Math.random() * (max - min) + min;
        return healthToReturn.toFixed(0);
    },
    generateMonsterId: function(){
        return globalVars.monstersKilled.length + 1;
    },

    setMonsterHealth: function(health){
        globalVars.currentMonster.health = health;
    },
    getMonsterHealth: function(){
        return globalVars.currentMonster.health;
    },

    setCharacterHealth: function(health){
        globalVars.character.health = health;
    },
    getCharacterHealth: function(){
        return globalVars.character.health;
    },

    setCurrentMonster: function(monster){
        globalVars.currentMonster = monster;

    },
    getCurrentMonster: function(){
        return globalVars.currentMonster;
    },
    getMonsterById: function(position){
        var monster = globalVars.monsterList[position];
        return monster;
    },

    // ------------------------------------
    // M O N S T E R  F U N C T I O N S
    // ------------------------------------

    getRandomMonster: function(){
        this.setCurrentMonster({});
        var range = globalVars.monsterList.length;
        var randMonster = Math.floor((Math.random() * range));

        var monster = this.getMonsterById(randMonster);
        monster.id = this.generateMonsterId();
        monster.isAlive = true;

        monster.health = this.generateHealth(monster.skillLevel);
        this.setCurrentMonster(monster);
    },

    // ------------------------------------
    // R E N D E R     F U N C T I O N S
    // ------------------------------------
    renderMonsterCard: function(){
        var card = this.getCurrentMonster();
        var output = "";
        output += "<div class='monster-card-container'><div class='monster-card-name-container'><div class='monster-card-name-value'>" + card.name + "</div></div>";
        output += "<div class='monster-card-stat-container'><div class='monster-card-stat-label'>Health:</div><div class='monster-card-health-value'>" + card.health + "</div></div>";
        output += "<div class='monster-card-stat-container'><div class='monster-card-stat-label'>Damage:</div><div class='monster-card-damage-value'>" + card.damage + "</div></div>";
        output += "<div class='monster-card-image-container'><img class='monster-card-image' src='img/" + card.imageUrl + "'/></div></div>";
        var $monsterCard = $('.monster-card-output');
        $monsterCard.append("<div class='outer-card-container'></div>");
        var $el = $monsterCard.children().last();
        $el.append(output);
    },

    renderCharacterCard: function(cardObject){
        var output = "";
        output += "<div class='card-container'><div class='card-name-container'><div class='card-name-value'>" + cardObject.name + "</div></div>";
        output += "<div class='card-stat-container'><div class='card-stat-label'>Health:</div><div class='card-health-value'>" + cardObject.health + "</div></div>";
        output += "<div class='card-stat-container'><div class='card-stat-label'>Damage:</div><div class='card-damage-value'>" + cardObject.damage + "</div></div>";
        output += "<div class='card-image-container'><img class='card-image' src='img/" + cardObject.imageUrl + "'/></div></div>";
        output += "<div class='character-attack-button-container'> <button class='character-attack-button'>Attack Monster-></button></div>"
        $('.hero-card-output').append("<div class='outer-card-container'></div>");
        var $el = $('.hero-card-output').children().last();
        $el.append(output);
    },

    updateCurrentMonsterHealth: function(health){
        this.setMonsterHealth(health);
        $('.monster-card-health-value').text(health);
    },

    updateCharacterHealth: function(health){
        this.setCharacterHealth(health);
        $('.card-health-value').text(health);
    },

    // ------------------------------------
    // A T T A C K   &   D A M A G E    F U N C T I O N S
    // ------------------------------------
    attackMessage: function(){
        var monster = dungeonGame.getCurrentMonster();
        if(monster.isAlive == true){
            var $el = $('#messages-container');
            $el.append("<div class='inner-message-container'></div>");
            $el.children().last();

            $el.append("<div class='bold-blue'>" + monster.name + "</div><div class='bold-blue'>Is Attacking.......</div>");


                setTimeout(function(){
                    $('#messages-container').html("");
                    dungeonGame.monsterAttack();
                }, 3000);
        }
    },
    monsterAttack: function(){

        var monster = this.getCurrentMonster();

        var monsterMultiplier = 10 * monster.skillLevel;
        var range = 100;
        var randNum = Math.floor((Math.random() * range) +1);
        // console.log("Random Number" , randNum );
        // console.log("hero Skill" , heroMultiplier);
        if (randNum <= monsterMultiplier){
            dungeonGame.addMessage("<div class='bold-red'>" + monster.name + ": HIT! </div>");
            dungeonGame.damageCharacter();
            dungeonGame.addMessage("<div class='bold-blue'>....Your Turn</div>");
        }
        else {
            dungeonGame.addMessage("<div class='bold-green'>" + monster.name + ": MISS! </div>");
            dungeonGame.addMessage("<div class='bold-blue'>....Your Turn - Click Attack</div>");
        }
    },

    characterAttack: function(){
        var heroSkill = globalVars.character.skillLevel;
        var monster = this.getCurrentMonster();
        var heroMultiplier = 10 * heroSkill;
        var range = 100;
        var randNum = Math.floor((Math.random() * range) +1);
        // console.log("Random Number" , randNum );
        // console.log("hero Skill" , heroMultiplier);
        if (randNum <= heroMultiplier){
            dungeonGame.addMessage("<div class='bold-green'>You Hit The "+ monster.name +"!</div>");
            dungeonGame.damageMonster();
            setTimeout(function(){
                $('#messages-container').html("");
                dungeonGame.attackMessage();
            }, 3000);
        }
        else {
            dungeonGame.addMessage("<div class='bold-red'>...You Missed!</div>");
            setTimeout(function(){
                $('#messages-container').html("");
                dungeonGame.attackMessage();
            }, 3000);
        }

    },

    damageCharacter: function(){
        var monster = dungeonGame.getCurrentMonster();
        var damage = monster.damage;
        var health = dungeonGame.getCharacterHealth();
        var newHealth = health - damage;

        dungeonGame.addMessage("<div class='bold-red'>" + monster.name + ": Did " + damage + " damage! </div>");
        dungeonGame.addMessage("<div class='bold-blue'>You: " + newHealth + " Health</div>");

        if (newHealth <= 0){
            if(newHealth < 0){
                dungeonGame.updateCharacterHealth(0);
            }
            dungeonGame.characterIsDead();
        }
        else{
            dungeonGame.updateCharacterHealth(newHealth);
        }
    },

    damageMonster: function(){
        var damage = globalVars.character.damage;
        var health = dungeonGame.getMonsterHealth();
        var newHealth = health - damage;
        dungeonGame.setMonsterHealth(newHealth);

        dungeonGame.addMessage("<div class='bold-green'>Warrior: " + damage + " damage! </div>");
        dungeonGame.addMessage("<div class='bold-blue'>" + newHealth + " health remaining</div>");

        dungeonGame.updateCurrentMonsterHealth(newHealth);
        if (newHealth <= 0){
            if(newHealth < 0){
                dungeonGame.setMonsterHealth(0);
            }
            dungeonGame.monsterIsDead();
        }
        else{
            $('.monster-card-health-value').text(newHealth);
        }
    },

    characterIsDead: function(){
        this.addMessage("<h3> You Are Dead....</h3><h3>GAME OVER</h3>");
    },

    monsterIsDead: function(){

        var monster = this.getCurrentMonster();
        monster.isAlive = false;
        $('.monster-card-health-value').html("<span class='dead'>DEAD</span>");
        var message = "";
        message += "<div class='dead'>The " + monster.name + " is dead</div>";
        dungeonGame.addMessage(message);
        $('.attack-button-container').css('display', 'none');
        $('.continue-button-container').css('display', 'block');
        globalVars.monstersKilled.unshift(monster);
    }

};
$(document).ready(function(){
   dungeonGame.gameInit();
});
