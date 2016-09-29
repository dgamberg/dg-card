var character = [
    {
        "name": "Warrior",
        "health": 100,
        "damage": 20,
        "skillLevel": 5,
        "imageUrl": "hero2.jpg"
    }
];
var monsters = [
    { "name": "Big Spider", "health": 75, "damage": 5, "imageUrl": "spider.jpg", "skillLevel": 1 },
    { "name": "Snake", "health": 58, "damage": 7, "imageUrl": "snake.jpg", "skillLevel": 2 },
    { "name": "Orc", "health": 84, "damage": 10,"imageUrl": "orc.png", "skillLevel": 3},
    { "name": "Goblin", "health": 95, "damage": 12, "imageUrl": "goblin.jpg", "skillLevel": 4 },
    { "name": "Troll", "health": 120, "damage": 16, "imageUrl": "troll.jpg", "skillLevel": 5 }
];

var monstersFought = [];

function gameInit(){
    console.log("Game Initialized");

    //Load Hero
    var hero1 = loadHero(0);
    this.renderHeroCard(hero1);

    // Get First Monster
    var monster = this.getRandomMonster();
    monstersFought.push(monster);
    this.renderMonsterCard(monster);


    $('.attack-button').on('click', function(){
        dungeonGame.attackMonster();
    });

    $('.reload-button').on('click', function(){
        $('.monster-card-output').html("");
        $('.messages-container').html("");


        $('.attack-button-container').css('display', 'block');
        $('.reload-button-container').css('display', 'none');
    });
}


function getRandomMonster(){
    var range = monsters.length;
    var randNum = Math.floor((Math.random() * range));
    var monster = monsters[randNum];
    monstersFought.push(monster);
    return monster;
}
function loadHero(number){
    return character[number];
}

function renderHeroCard(cardObject){
    var output = "";
    output += "<div class='card-container'><div class='card-name-container'><div class='card-name-value'>" + cardObject.name + "</div></div>";
    output += "<div class='card-stat-container'><div class='card-stat-label'>Health:</div><div class='card-health-value'>" + cardObject.health + "</div></div>";
    output += "<div class='card-stat-container'><div class='card-stat-label'>Damage:</div><div class='card-damage-value'>" + cardObject.damage + "</div></div>";
    output += "<div class='card-image-container'><img class='card-image' src='img/" + cardObject.imageUrl + "'/></div></div>";
    $('.hero-card-output').append("<div class='outer-card-container'></div>");
    var $el = $('.hero-card-output').children().last();
    $el.append(output);
}

function renderMonsterCard(cardObject){
    var output = "";
    output += "<div class='monster-card-container'><div class='monster-card-name-container'><div class='monster-card-name-value'>" + cardObject.name + "</div></div>";
    output += "<div class='monster-card-stat-container'><div class='monster-card-stat-label'>Health:</div><div class='monster-card-health-value'>" + cardObject.health + "</div></div>";
    output += "<div class='monster-card-stat-container'><div class='monster-card-stat-label'>Damage:</div><div class='monster-card-damage-value'>" + cardObject.damage + "</div></div>";
    output += "<div class='monster-card-image-container'><img class='monster-card-image' src='img/" + cardObject.imageUrl + "'/></div></div>";
    $('.monster-card-output').append("<div class='outer-card-container'></div>");
    var $el = $('.monster-card-output').children().last();
    $el.append(output);
}

function addMessage(message) {
    $('.messages-container').append("<div class='inner-message-container'></div>");
    var $el = $('.messages-container').children().last();
    $el.append(message);
}

function attackMonster(monster, character){
    var heroSkill = this.character.skillLevel;
    var monsterSkill = this.monster.skillLevel;
    var heroMultiplier = 10 * heroSkill;
    var range = 100;
    var randNum = Math.floor((Math.random() * range) +1);
    console.log("Random Number" , randNum );
    console.log("hero Skill" , heroMultiplier);
    if (randNum <= heroMultiplier){
        this.addMessage("<div class='damaged'>You Hit The "+ monster.name +" </div>");
        this.damageMonster(monster);
    }
    else {
        this.addMessage("<div class='missed'>You Missed</div>");
    }
}
function damageMonster(){
    var damage = characters[0].damage;
    monster.health = monster.health - damage;
    this.addMessage("<div class='damaged'>You Did " + damage + " damage! </div>");
    this.addMessage("<div class='health'>" + monster.health + " health remaining</div>");
    if (monster.health <= 0){
        this.monsterIsDead(monster);
    }
    else{
        $('.monster-card-health-value').text(monster.health);
    }
}

function monsterIsDead(){
    $('.monster-card-health-value').html("<span class='dead'>DEAD</span>");
    var message = "";
    message += "<div class='dead'>The " + monster.name + " is dead</div>";
    this.addMessage(message);
    $('.attack-button-container').css('display', 'none');
    $('.reload-button-container').css('display', 'block');
}

$(document).ready(function(){
    gameInit();
});