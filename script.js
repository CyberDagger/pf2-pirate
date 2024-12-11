// HTML elements
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const inventoryText = document.querySelector("#inventoryText");
const enemyStats = document.querySelector("#enemyStats");
const enemyNameText = document.querySelector("#enemyName");
const enemyHealthText = document.querySelector("#enemyHealth");
const enemyArmorText = document.querySelector("#enemyArmor");

// Long text strings assigned to constants for readability
const text0 = "Hello, world!"

const text1 = "<p>You are a wandering adventurer visiting Otari, a small town on the coast of the Starstone Isle, an enormous island magically raised out of the ocean by an ancient god. Otari is renowned for its lumber and fine wooden boats, but that's not what brought you here—you came looking for adventure!</p><p>Word has it that a vicious beast is preying upon the town's livestock, and the mayor has offered 10 gold coins to any hero who can put an end to the menace. That kind of money would pay your expenses for a month!</p><p>After asking around at a nearby tavern called the Crow's Casks, you learn that most of the attacks occur on the west side of town, not far from the shore. That seems like the best place to start your search.</p><p>You gather up your belongings and make your way out along the rocky beach to begin your hunt. It doesn't take long for you to find the entrance to a dark and mysterious cave. Large paw prints lead to and from the gloomy opening.</p>"

const text13 = "<p>Noticing the tracks leading to the cave, you hide in the nearby underbrush, hoping to ambush whatever foul beast lives here. After just a few minutes, you hear the sounds of something approaching, and the scent of wet fur hangs heavy in the air.</p><p>Emerging from the bushes is a lean, mangy wolf carrying the body of a dead chicken in its maw. It appears to be returning home after its most recent hunt. Clearly, this is the beast that’s been preying upon the farmers’ animals. You wait until it is near then draw your shortsword and spring out to attack!</p><p>You are now in combat with a wolf! You know that this feral beast cannot be tamed and must be slain to keep the farmers’ livestock safe.</p>"

// Player object
const player = {
    // Basic values
    ac: 18,
    hp: 20,
    attack: 7,
    damageDie: 6,
    damageBonus: 3,
    actionCount: 3,
    // Saves
    fortitude: 8,
    reflex: 5,
    // Skills
    perception: 4,
    athletics: 7,
    // Belongings
    inventory: ["Shortsword"],
    gold: 0,
    silver: 0,
    copper: 0
}

// Combat variables
let distance;


// Enemy class
class Enemy {
    constructor(name, ac, hp, attack, damageDie, damageBonus) {
        this.name = name;
        this.ac = ac;
        this.hp = hp;
        this.attack = attack;
        this.damageDie = damageDie;
        this.damageBonus = damageBonus;
        this.actionCount = 3;
        this.actions = [];
    }
}


// Enemy list
const enemies = [
    {
        name: "Wolf",
        ac: 14,
        hp: 15,
        attack: 5,
        damageDie: 6,
        damageBonus: 2
    },
    {
        name: "Snake",
        ac: 15,
        hp: 8,
        attack: 8,
        damageDie: 4,
        damageBonus: 0
    },
    {
        name: "Statue",
        ac: 18,
        hp: 20,
        attack: 9,
        damageDie: 8,
        damageBonus: 2
    }
];

// Adventure scenarios, numbered in the book
const scenes = [
    {
        id: "scene1",
        buttonText: ["Begin", "dummy", "dummy", "dummy"],
        buttonFunc: [go13, dummy, dummy, dummy],
        flavorText: text1
    },
    {
        id: "scene13",
        buttonText: ["Begin", "dummy", "dummy", "dummy"],
        buttonFunc: [go13, dummy, dummy, dummy],
        flavorText: text13
    }
];

// Game Start
function startGame() {
    // Window variables
    button1.onclick = go13;
    button2.onclick = dummy;
    button3.onclick = dummy;
    button4.onclick = dummy;
    text.innerHTML = text1;
    // Player variables
    player.hp = 20;
    player.actionCount = 3;
    player.inventory = ["Shortsword"];
    player.gold = 0;
    player.silver = 0;
    player.copper = 0;
    // Render window
    healthText.innerText = player.hp;
    goldText.innerText = player.gold + " gold, " + player.silver + " silver, " + player.copper + " copper";
    inventoryText.innerText = player.inventory[0];
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
    button1.innerText = "Begin";
    text.innerHTML = text1;
}

// initialize buttons
button1.onclick = go13;
button2.onclick = dummy;
button3.onclick = dummy;
button4.onclick = dummy;

// Placeholder function
function dummy() {
    text.innerText = text0;
}

// Scene transition functions
function go13() {
    // Update text field
    text.innerHTML = text13;
    /*
    // Load enemy
    enemyNameText = enemies[0].name;
    enemyArmorText = enemies[0].ac;
    enemyHealthText = enemies[0].hp;
    enemyStats.style.display = "block";
    */
    // Set up combat actions
    button1.onclick = attack;
    button2.onclick = hide;
    button1.innerText = "Strike";
    button2.innerText = "Hide in the Bushes";
    button2.style.display = "inline-block";
}

function attack() {
    text.innerText = "You attack.";
}

function hide() {
    text.innerText = "You hide.";
}