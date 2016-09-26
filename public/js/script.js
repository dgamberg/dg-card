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
        { "name": "Big Spider", "health": 75, "damage": 5, "imageUrl": "spider.jpg", "skillLevel": 1 },
        { "name": "Snake", "health": 58, "damage": 7, "imageUrl": "snake.jpg", "skillLevel": 2 },
        { "name": "Orc", "health": 84, "damage": 10,"imageUrl": "orc.png", "skillLevel": 3},
        { "name": "Goblin", "health": 95, "damage": 12, "imageUrl": "goblin.jpg", "skillLevel": 4 },
        { "name": "Troll", "health": 120, "damage": 16, "imageUrl": "troll.jpg", "skillLevel": 5 }
    ],
    "currentMonster": {},
    "monstersFought": []
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
            globalVars.currentMonster =
            dungeonGame.characterAttack(hero, globalVars.monstersFought[0]);
        });

        $('.continue-button').on('click', function(){
            $('.monster-card-output').html("");
            $('.messages-container').html("");
            $('.attack-button-container').css('display', 'block');
            $('.continue-button-container').css('display', 'none');
            anotherMonster = dungeonGame.getRandomMonster();
            dungeonGame.renderMonsterCard(anotherMonster);
        });
    },
    getRandomMonster: function(){
        globalVars.currentMonster = {};
        var range = globalVars.monsters.length;
        var randNum = Math.floor((Math.random() * range));
        var monster = globalVars.monsters[randNum];
        monster.id = dungeonGame.generateMonsterId();
        globalVars.currentMonster = monster;
        globalVars.monstersFought.push(monster);
        console.log(globalVars.currentMonster);
        console.log(globalVars.monstersFought);
    },
    renderMonsterCard: function(cardObject){
        var output = "";
        output += "<div class='monster-card-container'><div class='monster-card-name-container'><div class='monster-card-name-value'>" + cardObject.name + "</div></div>";
        output += "<div class='monster-card-stat-container'><div class='monster-card-stat-label'>Health:</div><div class='monster-card-health-value'>" + cardObject.health + "</div></div>";
        output += "<div class='monster-card-stat-container'><div class='monster-card-stat-label'>Damage:</div><div class='monster-card-damage-value'>" + cardObject.damage + "</div></div>";
        output += "<div class='monster-card-image-container'><img class='monster-card-image' src='img/" + cardObject.imageUrl + "'/></div></div>";
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
        var monsterSkill = monster.skillLevel;
        var heroMultiplier = 10 * heroSkill;
        var range = 100;
        var randNum = Math.floor((Math.random() * range) +1);
        console.log("Random Number" , randNum );
        console.log("hero Skill" , heroMultiplier);
        if (randNum <= heroMultiplier){
            dungeonGame.addMessage("<div class='damaged'>You Hit The "+ monster.name +" </div>");
            dungeonGame.damageMonster(monster);
        }
        else {
            dungeonGame.addMessage("<div class='missed'>You Missed</div>");
        }
    },
    damageMonster: function(monster){
        var damage = globalVars.characters[0].damage;
        monster.health = monster.health - damage;
        dungeonGame.addMessage("<div class='damaged'>You Did " + damage + " damage! </div>");
        dungeonGame.addMessage("<div class='health'>" + monster.health + " health remaining</div>");
        if (monster.health <= 0){
            if(monster.health < 0){
                monster.health = 0;

            }
            dungeonGame.monsterIsDead(monster);
        }
        else{
            $('.monster-card-health-value').text(monster.health);
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