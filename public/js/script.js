var globalVars = {
    "character": [
        {
            "playerName": "",
            "name": "Optimus Prime",
            "health": 120,
            "damage": 30,
            "skillLevel": 5,
            "armour": 10,
            "imageUrl": "optimus-prime.jpg"
        },
        {
            "playerName": "",
            "name": "BumbleBee",
            "health": 100,
            "damage": 30,
            "skillLevel": 5,
            "armour": 10,
            "imageUrl": "bumblebee.jpg"
        },
        {
            "playerName": "",
            "name": "Iron Hide",
            "health": 100,
            "damage": 30,
            "skillLevel": 5,
            "armour": 10,
            "imageUrl": "ironhide.jpg"
        },
        {
            "playerName": "",
            "name": "Ratchet",
            "health": 100,
            "damage": 30,
            "skillLevel": 5,
            "armour": 10,
            "imageUrl": "ratchet.jpg"
        }


    ],
    "monsterList": [
        { "name": "Megatron",  "damage": 20,"imageUrl": "megatron.jpg", "skillLevel": 8, "armour": 10 },
        { "name": "Bonecrusher", "damage": 14, "imageUrl": "bonecrusher.jpg", "skillLevel": 4, "armour": 5  },
        { "name": "Blackout",  "damage": 16, "imageUrl": "blackout.jpg", "skillLevel": 5, "armour": 3  },
        { "name": "Unicron",  "damage": 15, "imageUrl": "unicron.jpg", "skillLevel": 9, "armour": 5  },
        { "name": "Tarantulas",  "damage": 14, "imageUrl": "tarantulas.gif", "skillLevel": 4, "armour": 3  },
        { "name": "Star Scream", "damage": 18, "imageUrl": "starscream.jpg", "skillLevel": 7, "armour": 8  },
        { "name": "Soundwave",  "damage": 14, "imageUrl": "soundwave.jpg", "skillLevel": 3, "armour": 4  },
        { "name": "Devastator",  "damage": 16, "imageUrl": "devastator.jpg", "skillLevel": 4, "armour": 6  },
        { "name": "Barricade",  "damage": 15, "imageUrl": "barricade.jpg", "skillLevel": 4, "armour": 7  }
    ],


    "currentMonster": {},
    "monstersKilled": [],
    "currentCharacter":{}
};

var dungeonGame = {
    gameInit: function(){
        console.log("Game Initialized");

        //Load Hero
        dungeonGame.setCurrentCharacter(0);
        dungeonGame.renderCharacterCard(dungeonGame.getCurrentCharacter());

        // Get First Monster
        dungeonGame.getRandomMonster();
        dungeonGame.renderMonsterCard();

        $('.character-attack-button-container').on('click', '.character-attack-button', function(){
            $('#messages-container').html("");
            dungeonGame.characterAttack();

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
        globalVars.currentCharacter.health = health;
    },
    getCharacterHealth: function(){
        return globalVars.currentCharacter.health;
    },
    getCurrentCharacter: function(){
      return globalVars.currentCharacter;
    },
    setCurrentCharacter: function(num){
        var char = globalVars.character[num];
        globalVars.currentCharacter = char;
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
        output += "<div class='monster-card-image-container'><img class='monster-card-image' src='img/transformers/" + card.imageUrl + "'/></div></div>";
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
        output += "<div class='card-image-container'><img class='card-image' src='img/transformers/" + cardObject.imageUrl + "'/></div>";
        output += "<div class='character-attack-button-container'> <button class='character-attack-button'>ATTACK</button></div></div>"
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
            $el.append("<div class='bold-blue'>" + monster.name + "</div><div class='bold-blue'>Is Attacking You</div>");
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
            dungeonGame.addMessage("<div class='bold-blue'>Your Turn</div>");
        }
        else {
            dungeonGame.addMessage("<div class='bold-green'>" + monster.name + ": MISS! </div>");
            dungeonGame.addMessage("<div class='bold-blue'>Your Turn - Click Attack</div>");
        }
    },

    characterAttack: function(){
        var heroSkill = globalVars.currentCharacter.skillLevel;
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
            dungeonGame.addMessage("<div class='bold-red'>You Missed!</div>");
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
        var damage = globalVars.currentCharacter.damage;
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
