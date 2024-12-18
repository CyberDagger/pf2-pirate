/*-------------*/
/* UI Elements */
/*-------------*/

// HTML elements
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const inventoryText = document.querySelector("#inventoryText");
const playerStats = document.querySelector("#playerStats");
const playerHealthText = document.querySelector("#playerHealth");
const playerArmorText = document.querySelector("#playerArmor");
const playerAttackText = document.querySelector("#playerAttack");
const playerDamageText = document.querySelector("#playerDamage");
const playerActionsText = document.querySelector("#playerActions");
const enemyStats = document.querySelector("#enemyStats");
const enemyNameText = document.querySelector("#enemyName");
const enemyHealthText = document.querySelector("#enemyHealth");
const enemyArmorText = document.querySelector("#enemyArmor");

// Long text strings assigned to constants for readability
const text0 = "Hello, world!"

const text1 = "<p>You are a wandering adventurer visiting Otari, a small town on the coast of the Starstone Isle, an enormous island magically raised out of the ocean by an ancient god. Otari is renowned for its lumber and fine wooden boats, but that's not what brought you here—you came looking for adventure!</p><p>Word has it that a vicious beast is preying upon the town's livestock, and the mayor has offered 10 gold coins to any hero who can put an end to the menace. That kind of money would pay your expenses for a month!</p><p>After asking around at a nearby tavern called the Crow's Casks, you learn that most of the attacks occur on the west side of town, not far from the shore. That seems like the best place to start your search.</p><p>You gather up your belongings and make your way out along the rocky beach to begin your hunt. It doesn't take long for you to find the entrance to a dark and mysterious cave. Large paw prints lead to and from the gloomy opening.</p>"

const text13 = "<p>Noticing the tracks leading to the cave, you hide in the nearby underbrush, hoping to ambush whatever foul beast lives here. After just a few minutes, you hear the sounds of something approaching, and the scent of wet fur hangs heavy in the air.</p><p>Emerging from the bushes is a lean, mangy wolf carrying the body of a dead chicken in its maw. It appears to be returning home after its most recent hunt. Clearly, this is the beast that’s been preying upon the farmers’ animals. You wait until it is near then draw your shortsword and spring out to attack!</p><div class=\"instruction\"><p>You are now in combat with a wolf! You know that this feral beast cannot be tamed and must be slain to keep the farmers’ livestock safe. Both you and the wolf take turns attacking one another. You attack by rolling the 20-sided die (or d20 for short) and adding your attack bonus (which represents your skill at wielding a weapon). If the total is equal to or greater than the wolf’s Armor Class (AC for short), then the attack is a hit and deals damage. Subtract the damage from the wolf’s Hit Points (HP for short). To defeat the wolf, you must reduce the wolf to 0 HP or less. On the wolf’s turn, it will attack you—you’ll roll a d20 for the wolf, add its attack bonus, and compare the result to your AC. If the wolf reduces you to 0 HP or less, you die.</p><p>Remember that you go first. If you find that the wolf is hitting you too much, you should remember to hide with your third action to make it harder for the wolf to hit you.</p></div>"

/*--------------*/
/* Game Objects */
/*--------------*/

// Player object
const player = {
    // Basic values
    ac: 18,
    hp: 20,
    attack: 7,
    attackMod: 7,
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
        attackMod: 5,
        damageDie: 6,
        damageBonus: 2,
        actionCount: 3,
        act() {}
    },
    {
        name: "Snake",
        ac: 15,
        hp: 8,
        attack: 8,
        attackMod: 8,
        damageDie: 4,
        damageBonus: 0,
        actionCount: 3,
        act() {}
    },
    {
        name: "Statue",
        ac: 18,
        hp: 20,
        attack: 9,
        attackMod: 9,
        damageDie: 8,
        damageBonus: 2,
        actionCount: 3,
        act() {}
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

/*---------------------------*/
/* Game Initialization Logic */
/*---------------------------*/

// Game Start
function startGame() {
    // Window variables
    button1.onclick = go13;
    button2.onclick = dummy;
    button3.onclick = dummy;
    button4.onclick = dummy;

    // Player variables
    player.hp = 20;
    player.actionCount = 3;
    player.attackMod = player.attack;
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

// Dice roller
function roll(die) {
    return Math.floor(Math.random() * die) + 1;
}

/*----------------------------*/
/* Scene Transition Functions */
/*----------------------------*/

function go13() {
    // Update text field
    text.innerHTML = text13;

    // Combat initialization
    player.attackMod = 7;
    let combatResult = startFight(0);
}

/*------------------------*/
/* Combat Logic Functions */
/*------------------------*/

function startFight(enemyId) {
    //Load player
    playerArmorText.innerText = player.ac;
    playerHealthText.innerText = player.hp;
    playerAttackText.innerText = `${player.attackMod >=0 ? '+' : ''}` + player.attackMod;
    playerDamageText.innerText = "1d" + player.damageDie + "+" + player.damageBonus;
    playerActionsText.innerText = "";
    for (let i = 0; i < player.actionCount; i++) {
        playerActionsText.innerText += "◈";
    }
    playerStats.style.display = "block";

    // Fix this first
    // Load enemy
    let enemy = enemies[enemyId];
    let enemyActions = enemies[enemyId].actionCount;
    enemyNameText.innerText = enemy.name;
    enemyArmorText.innerText = enemy.ac;
    enemyHealthText.innerText = enemy.hp;
    enemyStats.style.display = "block";

    // Set up combat actions
    button1.onclick = () => {
        let checkTurnEnd = attack(enemy);
        if (checkTurnEnd === 0) {
            text.innerHTML += "<p>3 actions spent. Passing turn.</p>";
            player.attackMod = player.attack;
            playerAttackText.innerText = `${player.attackMod >=0 ? "+" : ""}` + player.attackMod;
            text.innerHTML += "<p>The enemy takes its turn.</p>";
            console.log("Enemy actions: " + enemyActions);
            while (enemyActions > 0) {
                enemyMove(enemy);
                enemyActions--;
                console.log("Enemy actions: " + enemyActions);
            }
            enemyActions = enemies[enemyId].actionCount;
        }
    }
    button2.onclick = hide;
    button1.innerText = "Strike with Your Shortsword";
    button2.innerText = "Hide in the Bushes";
    button2.style.display = "inline-block";
    console.log("Player actions: " + player.actionCount);
}

// Player attacks
function attack(enemy) {
    player.actionCount--;

    // Attack roll
    text.innerHTML = "<p class=\"allyText\">You attack. (1d20" + `${player.attackMod >=0 ? "+" : ""}` + player.attackMod +")</p>";
    let attackRoll = roll(20) + player.attackMod;
    text.innerHTML += "<p class=\"allyText\">\nYou roll a " + attackRoll + ". (" + (attackRoll - player.attackMod) + `${player.attackMod >=0 ? "+" : ""}` + player.attackMod + ")</p>";
    
    // Damage roll
    if (attackRoll >= enemy.ac) {
        let damageRoll = roll(player.damageDie) + player.damageBonus;
        console.log("Damage roll: " + damageRoll);
        if (attackRoll >= (enemy.ac + 10)) {
            text.innerHTML += "<p class=\"allyText\">You got a critical hit!</p>";
            text.innerHTML += "<p class=\"allyText\">You deal " + (damageRoll*2) + " damage. 2x(1d" + player.damageDie + "+" + player.damageBonus + ")</p>";
            enemy.hp -= (damageRoll * 2);
        } else {
            text.innerHTML += "<p class=\"allyText\">You hit!</p>";
            text.innerHTML += "<p class=\"allyText\">You deal " + damageRoll + " damage. (1d" + player.damageDie + "+" + player.damageBonus + ")</p>";
            enemy.hp -= damageRoll;
        }
        enemyHealthText.innerText = enemy.hp;
    } else {
        text.innerHTML += "<p class=\"allyText\">You miss!</p>";
    }

    // After action cleanup
    player.attackMod -= 5;
    playerAttackText.innerText = `${player.attackMod >=0 ? '+' : ''}` + player.attackMod;
    console.log("Player actions: " + player.actionCount);
    playerActionsText.innerText = "";
    for (let i = 0; i < player.actionCount; i++) {
        playerActionsText.innerText += "◈";
    }
    return player.actionCount;
}

function hide() {
    text.innerText = "You hide.";
}

function enemyMove(enemy) {
    // Attack roll
    text.innerHTML += "<p class=\"enemyText\">The Wolf attacks. (1d20" + `${enemy.attackMod >=0 ? "+" : ""}` + enemy.attackMod + ")</p>";
    let attackRoll = roll(20) + enemy.attackMod;
    text.innerHTML += "<p class=\"enemyText\">It rolls a " + attackRoll + ". (" + (attackRoll - enemy.attackMod) + `${enemy.attackMod >=0 ? "+" : ""}` + enemy.attackMod +  ")</p>";
    enemy.attackMod -= 5;
    if (attackRoll >= player.ac) {
        let damageRoll = roll(enemy.damageDie) + enemy.damageBonus;
        if (attackRoll >= (player.ac + 10)) {
            text.innerHTML += "<p class=\"enemyText\">A critical hit!</p>";
            text.innerHTML += "<p class=\"enemyText\">It deals " + (damageRoll*2) + " damage. 2x(1d" + enemy.damageDie + "+" + enemy.damageBonus + ")</p>";
            player.hp -= (damageRoll * 2);
        } else {
            text.innerHTML += "<p class=\"enemyText\">Hit!</p>";
            text.innerHTML += "<p class=\"enemyText\">It deals " + damageRoll + " damage. (1d" + enemy.damageDie + "+" + enemy.damageBonus + ")</p>";
            player.hp -= damageRoll;
        }
        playerHealthText.innerText = player.hp;
    } else {
        text.innerHTML += "<p class=\"enemyText\">Miss!</p>";
    }
}