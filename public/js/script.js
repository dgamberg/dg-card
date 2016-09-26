var globalVars = {
    "character": {
        "name": "Warrior",
        "health": 100,
        "damage": 20,
        "skillLevel": 5,
        "imageUrl": "hero2.jpg"
    },
    "monsterList": [
        { "name": "Big Spider", "damage": 5, "imageUrl": "spider.jpg", "skillLevel": 1},
        { "name": "Snake",  "damage": 7, "imageUrl": "snake.jpg", "skillLevel": 2 },
        { "name": "Orc",  "damage": 10,"imageUrl": "orc.png", "skillLevel": 3},
        { "name": "Goblin", "damage": 12, "imageUrl": "goblin.jpg", "skillLevel": 4 },
        { "name": "Troll",  "damage": 16, "imageUrl": "troll.jpg", "skillLevel": 5 }
    ],
    "currentMonster": {},
    "monstersKilled": []
};

var dungeonGame = {
    gameInit: function(){
        console.log("Game Initialized");

        //Load Hero
        dungeonGame.renderCharacterCard(globalVars.character);

        // Get First Monster
        dungeonGame.getRandomMonster();
        dungeonGame.renderMonsterCard();

        $('.attack-button').on('click', function(){
            var monster = this.getCurre
            dungeonGame.characterAttack();
        });

        $('.continue-button').on('click', function(){
            $('.monster-card-output').html("");
            $('.messages-container').html("");
            $('.attack-button-container').css('display', 'block');
            $('.continue-button-container').css('display', 'none');

            dungeonGame.getRandomMonster();
            // first monster
            dungeonGame.renderMonsterCard();

        });
    },

    // ------------------------------------
    // M O N S T E R     F U N C T I O N S
    // ------------------------------------

    getRandomMonster: function(){
        this.setCurrentMonster({});
        var range = globalVars.monsterList.length;
        var randMonster = Math.floor((Math.random() * range));

        var monster = this.loadMonsterById(randMonster);
        monster.id = this.generateMonsterId();

        var monsterHealth = this.generateHealth(monster.skillLevel);
        monster.health = monsterHealth;
        this.setCurrentMonster(monster);
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
        console.log('Health set to ', health)
        globalVars.currentMonster.health = health;
    },
    getMonsterHealth: function(){
        console.log("Monsters", globalVars.monsters);
        console.log("Current Monster", this.getCurrentMonster());
        return globalVars.currentMonster.health;
    },
    getCurrentMonster: function(){
        return globalVars.currentMonster;
    },
    setCurrentMonster: function(monster){
        globalVars.currentMonster = monster;

    },
    loadMonsterById: function(position){
        var monster = globalVars.monsterList[position];
        return monster;
    },
    renderMonsterCard: function(){
        var card = this.getCurrentMonster();
        var output = "";
        output += "<div class='monster-card-container'><div class='monster-card-name-container'><div class='monster-card-name-value'>" + card.name + "</div></div>";
        output += "<div class='monster-card-stat-container'><div class='monster-card-stat-label'>Health:</div><div class='monster-card-health-value'>" + card.health + "</div></div>";
        output += "<div class='monster-card-stat-container'><div class='monster-card-stat-label'>Damage:</div><div class='monster-card-damage-value'>" + card.damage + "</div></div>";
        output += "<div class='monster-card-image-container'><img class='monster-card-image' src='img/" + card.imageUrl + "'/></div></div>";
        $('.monster-card-output').append("<div class='outer-card-container'></div>");
        var $el = $('.monster-card-output').children().last();
        $el.append(output);
    },



    renderCharacterCard: function(cardObject){
        var output = "";
        output += "<div class='card-container'><div class='card-name-container'><div class='card-name-value'>" + cardObject.name + "</div></div>";
        output += "<div class='card-stat-container'><div class='card-stat-label'>Health:</div><div class='card-health-value'>" + cardObject.health + "</div></div>";
        output += "<div class='card-stat-container'><div class='card-stat-label'>Damage:</div><div class='card-damage-value'>" + cardObject.damage + "</div></div>";
        output += "<div class='card-image-container'><img class='card-image' src='img/" + cardObject.imageUrl + "'/></div></div>";
        $('.hero-card-output').append("<div class='outer-card-container'></div>");
        var $el = $('.hero-card-output').children().last();
        $el.append(output);
    },
    addMessage: function(message){
        $('.messages-container').append("<div class='inner-message-container'></div>");
        var $el = $('.messages-container').children().last();
        $el.append(message);
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
            dungeonGame.addMessage("<div class='damaged'>You Hit The "+ monster.name +" </div>");
            dungeonGame.damageMonster();
        }
        else {
            dungeonGame.addMessage("<div class='missed'>You Missed</div>");
        }
    },
    updateCurrentMonsterHealth: function(health){
        this.setMonsterHealth(health);
        $('.monster-card-health-value').text(health);
    },
    damageMonster: function(){
        var damage = globalVars.character.damage;
        var health = this.getMonsterHealth();
        var newHealth = health - damage;
        this.setMonsterHealth(newHealth);

        dungeonGame.addMessage("<div class='damaged'>You Did " + damage + " damage! </div>");
        dungeonGame.addMessage("<div class='health'>" + newHealth + " health remaining</div>");
        dungeonGame.updateCurrentMonsterHealth(newHealth);
        if (newHealth <= 0){
            if(newHealth < 0){
                this.setMonsterHealth(0);
            }
            dungeonGame.monsterIsDead();
        }
        else{
            $('.monster-card-health-value').text(newHealth);
        }
    },

    monsterIsDead: function(){
        var monster = this.getCurrentMonster();
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
