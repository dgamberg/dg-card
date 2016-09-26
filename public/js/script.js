var globalVars = {
    "characters": [
        {
            "name": "Warrior",
            "health": 100,
            "damage": 20,
            "skillLevel": 5,
            "imageUrl": "hero2.jpg"
        }
    ],
    "monsters": [
        { "id": 0, "name": "Big Spider", "health": 75, "damage": 5, "imageUrl": "spider.jpg", "skillLevel": 1 },
        { "id": 1, "name": "Snake", "health": 58, "damage": 7, "imageUrl": "snake.jpg", "skillLevel": 2 },
        { "id": 2, "name": "Orc", "health": 84, "damage": 10,"imageUrl": "orc.png", "skillLevel": 3},
        { "id": 3, "name": "Goblin", "health": 95, "damage": 12, "imageUrl": "goblin.jpg", "skillLevel": 4 },
        { "id": 4, "name": "Troll", "health": 120, "damage": 16, "imageUrl": "troll.jpg", "skillLevel": 5 }
    ],
    "currentMonster": {},
    "monstersFought": [],
    "lastNum":  null
};

var dungeonGame = {
    gameInit: function(){
        console.log("Game Initialized");

        //Load Hero
        var hero = dungeonGame.loadHero(0);
        dungeonGame.renderHeroCard(hero);

        // Get First Monster
        dungeonGame.getRandomMonster();
        globalVars.currentMonster = globalVars.monstersFought[0];
        dungeonGame.renderMonsterCard(globalVars.currentMonster);

        $('.attack-button').on('click', function(){
            dungeonGame.characterAttack(hero, globalVars.currentMonster );
        });

        $('.continue-button').on('click', function(){
            $('.monster-card-output').html("");
            $('.messages-container').html("");
            $('.attack-button-container').css('display', 'block');
            $('.continue-button-container').css('display', 'none');
            var anotherMonster = dungeonGame.getRandomMonster();
            // if last num is not null, this is not first run
            if (globalVars.lastNum !== null){
                //if same as last - re-do it
                if(anotherMonster.id == globalVars.lastNum){
                    // render monster
                    anotherMonster = dungeonGame.getRandomMonster();
                    dungeonGame.renderMonsterCard(anotherMonster);
                }
                else {
                    dungeonGame.renderMonsterCard(anotherMonster);
                }

            }
            // first monster
            dungeonGame.renderMonsterCard(anotherMonster);
        });
    },

    // ------------------------------------
    // M O N S T E R     F U N C T I O N S
    // ------------------------------------

    getRandomMonster: function(){
        globalVars.currentMonster = {};
        var range = globalVars.monsters.length;
        globalVars.lastNum = null;
        var randNum = Math.floor((Math.random() * range));

        var monster = globalVars.monsters[randNum];
        monster.id = dungeonGame.generateMonsterId();
        globalVars.currentMonster = monster;
        globalVars.monstersFought.unshift(monster);
        console.log("Current Monster", globalVars.currentMonster);
        console.log("Monsters Killed",globalVars.monstersFought);
    },
    renderMonsterCard: function(){
        var card = globalVars.currentMonster;
        var output = "";
        output += "<div class='monster-card-container'><div class='monster-card-name-container'><div class='monster-card-name-value'>" + card.name + "</div></div>";
        output += "<div class='monster-card-stat-container'><div class='monster-card-stat-label'>Health:</div><div class='monster-card-health-value'>" + card.health + "</div></div>";
        output += "<div class='monster-card-stat-container'><div class='monster-card-stat-label'>Damage:</div><div class='monster-card-damage-value'>" + card.damage + "</div></div>";
        output += "<div class='monster-card-image-container'><img class='monster-card-image' src='img/" + card.imageUrl + "'/></div></div>";
        $('.monster-card-output').append("<div class='outer-card-container'></div>");
        var $el = $('.monster-card-output').children().last();
        $el.append(output);
    },
    generateMonsterId: function(){
        return globalVars.monstersFought.length + 1;
    },

    loadHero: function(number){
        return globalVars.characters[number];
    },
    renderHeroCard: function(cardObject){
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
    characterAttack: function(character, monster){
        var heroSkill = character.skillLevel;
        var heroMultiplier = 10 * heroSkill;
        var range = 100;
        var randNum = Math.floor((Math.random() * range) +1);
        // console.log("Random Number" , randNum );
        // console.log("hero Skill" , heroMultiplier);
        if (randNum <= heroMultiplier){
            dungeonGame.addMessage("<div class='damaged'>You Hit The "+ monster.name +" </div>");
            dungeonGame.damageMonster(monster, character.damage);
        }
        else {
            dungeonGame.addMessage("<div class='missed'>You Missed</div>");
        }
    },
    updateCurrentMonsterHealth: function(health){
        globalVars.currentMonster.health = health;
        $('.monster-card-health-value').text(health);
    },
    damageMonster: function(monster, damage){
        var newHealth = monster.health - damage;
        dungeonGame.addMessage("<div class='damaged'>You Did " + damage + " damage! </div>");
        dungeonGame.addMessage("<div class='health'>" + globalVars.currentMonster.health + " health remaining</div>");
        dungeonGame.updateCurrentMonsterHealth(newHealth);
        if (newHealth <= 0){
            if(newHealth < 0){
                globalVars.currentMonster.health = 0;

            }
            dungeonGame.monsterIsDead(globalVars.currentMonster);
        }
        else{
            $('.monster-card-health-value').text(globalVars.currentMonster.health);
        }
    },

    monsterIsDead: function(monster){
        $('.monster-card-health-value').html("<span class='dead'>DEAD</span>");
        var message = "";
        message += "<div class='dead'>The " + monster.name + " is dead</div>";
        dungeonGame.addMessage(message);
        $('.attack-button-container').css('display', 'none');
        $('.continue-button-container').css('display', 'block');
    }
};
$(document).ready(function(){
   dungeonGame.gameInit();
});
