/*-------------*/
/* UI Elements */
/*-------------*/

// HTML elements
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const combatText = document.querySelector("#combatText");
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
const text7 = "<p>You leap aside, avoiding the wolf’s snarling jaws and drive your sword deep into its flank. With a yowl, the wretched creature falls into the muck and goes still. You clean off your blade then wander into the cave to make sure that this wolf was the only one.</p><p>As your eyes adjust to the gloom, you find yourself inside a small cavern that was obviously the beast’s home. It stinks of wet fur, and there are scraps of rotting meat and bone lying about—evidence of its previous victims. Far more interesting, though, is what you spot at the back of the cave.</p><p>A crack in the far wall leads into darkness, and just above it, scratched into stone, is a symbol that looks a lot like a treasure chest. As you draw closer, you realize the crack is actually the entrance to an underground tunnel—it might just be the hiding place of some forgotten treasure.</p>"
const text13 = "<p>Noticing the tracks leading to the cave, you hide in the nearby underbrush, hoping to ambush whatever foul beast lives here. After just a few minutes, you hear the sounds of something approaching, and the scent of wet fur hangs heavy in the air.</p><p>Emerging from the bushes is a lean, mangy wolf carrying the body of a dead chicken in its maw. It appears to be returning home after its most recent hunt. Clearly, this is the beast that’s been preying upon the farmers’ animals. You wait until it is near then draw your shortsword and spring out to attack!</p><div class=\"instruction\"><p>You are now in combat with a wolf! You know that this feral beast cannot be tamed and must be slain to keep the farmers’ livestock safe. Both you and the wolf take turns attacking one another. You attack by rolling the 20-sided die (or d20 for short) and adding your attack bonus (which represents your skill at wielding a weapon). If the total is equal to or greater than the wolf’s Armor Class (AC for short), then the attack is a hit and deals damage. Subtract the damage from the wolf’s Hit Points (HP for short). To defeat the wolf, you must reduce the wolf to 0 HP or less. On the wolf’s turn, it will attack you—you’ll roll a d20 for the wolf, add its attack bonus, and compare the result to your AC. If the wolf reduces you to 0 HP or less, you die.</p><p>Remember that you go first. If you find that the wolf is hitting you too much, you should remember to hide with your third action to make it harder for the wolf to hit you.</p></div>"
const text17 = "<p>Your vision grows dark as life leaves your body. In your final moments, you can’t help but think that this is not how stories should end. Maybe the next hero will fare better in this deadly place...</p><p>Although you have died, there are still adventures to be had. You can start this adventure over by clicking the button. You are restored to full Hit Points, but so are all of the foes that you have faced. You must explore and face whatever dangers await you all over again. Alternatively, you can start making your own character to play in adventures with others. The full rules can be read at <a href=\"https://2e.aonprd.com/\">Archives of Nethys</a>.</p>"

/*--------------*/
/* Game Objects */
/*--------------*/

// Player object
const player = {
    // Basic values
    acBase: 18,
    ac: 18,
    hpMax: 20,
    hp: 20,
    attackBase: 7,
    attackMod: 7,
    damageDie: 6,
    damageBonus: 3,
    actions: 3,
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
    copper: 0,
    // Auxiliary variables
    hidden: false,

    // Methods
    // Reset values on game restart
    reset() {
        this.ac = this.acBase;
        this.hp = this.hpMax;
        this.attackMod = this.attackBase;
        this.actionCount = this.actions;
        this.inventory = ["Shortsword"];
        this.gold = 0;
        this.silver = 0;
        this.copper = 0;
    },
    // Auxiliary combat methods
    updateActions() {
        let lastAction = (this.actionCount === 0);
        playerActionsText.innerText = "";
        for (let i = 0; i < this.actionCount; i++) {
            playerActionsText.innerText += "◈";
        }
        return lastAction;
    },
    resetTurn() {
        this.actionCount = this.actions;
        this.updateActions();
        this.hidden = false;
        this.ac = this.acBase;
        playerArmorText.innerText = this.ac;
    },
    resetMap() {
        this.attackMod = this.attackBase;
        playerAttackText.innerText = `${this.attackMod >=0 ? "+" : ""}` + this.attackMod;
    },
    passTurn() {
        combatText.innerHTML += "<p>3 actions spent. Passing turn.</p>";
        this.resetMap();
        combatText.innerHTML += "<p>The enemy takes its turn.</p>";
        scrollLog();
    },
    loseHp(amount) {
        this.hp -= amount;
        if (this.hp < 0) {
            this.hp = 0
        }
        playerHealthText.innerText = this.hp;
    },
    // Combat actions
    attack(enemy) {
        this.actionCount--;
        // Attack roll
        combatText.innerHTML += "<p class=\"allyText\">You attack. (1d20" + `${this.attackMod >=0 ? "+" : ""}` + this.attackMod +")</p>";
        let attackRoll = roll(20) + this.attackMod;
        combatText.innerHTML += "<p class=\"allyText\">\nYou roll a " + attackRoll + ". (" + (attackRoll - this.attackMod) + `${this.attackMod >=0 ? "+" : ""}` + this.attackMod + ")</p>";
        // Damage roll if hit
        if (attackRoll >= enemy.ac) {
            let damageRoll = roll(this.damageDie) + this.damageBonus;
            if (attackRoll >= (enemy.ac + 10)) {
                combatText.innerHTML += "<p class=\"allyText\">You got a critical hit!</p>";
                combatText.innerHTML += "<p class=\"allyText\">You deal " + (damageRoll*2) + " damage. 2x(1d" + this.damageDie + "+" + this.damageBonus + ")</p>";
                enemy.loseHp(damageRoll * 2);
            } else {
                combatText.innerHTML += "<p class=\"allyText\">You hit!</p>";
                combatText.innerHTML += "<p class=\"allyText\">You deal " + damageRoll + " damage. (1d" + this.damageDie + "+" + this.damageBonus + ")</p>";
                enemy.loseHp(damageRoll);
            }
        } else {
            combatText.innerHTML += "<p class=\"allyText\">You miss!</p>";
        }
        scrollLog();
        this.attackMod -= 5;
        playerAttackText.innerText = `${this.attackMod >=0 ? '+' : ''}` + this.attackMod;
        return this.updateActions();
    },
    hide() {
        if (this.hidden) {
            combatText.innerHTML += "<p>You are already hidden. Fight back against the Wolf!</p>";
            scrollLog();
        } else {
            this.actionCount--;
            this.hidden = true;
            this.ac += 2;
            playerArmorText.innerText = this.ac;
            combatText.innerHTML += "<p class=\"allyText\">You hide in the nearby bushes, making it harder for the Wolf to hit you.</p>";
            scrollLog();
            return this.updateActions();
        }
    }
}

// Combat variables
let distance;


// Enemy class
class Enemy {
    constructor(name, ac, hp, attack, damageDie, damageBonus) {
        this.name = name;
        this.ac = ac;
        this.maxHp = hp;
        this.hp = hp;
        this.attackBase = attack;
        this.attackMod = attack;
        this.damageDie = damageDie;
        this.damageBonus = damageBonus;
        this.actionCount = 3;
    }

    loseHp(amount) {
        this.hp -= amount;
        if (this.hp < 0) {
            this.hp = 0
        }
        enemyHealthText.innerText = this.hp;
    }
    resetActions() {
        this.actionCount = 3;
        this.attackMod = this.attackBase;
    }
    takeTurn() {
        this.resetActions();
        while (this.actionCount > 0) {
            this.attack();
            if (player.hp === 0) {
                console.log("YOU DIED");
                return;
            }
        }
        this.passTurn();
    }
    passTurn() {
        combatText.innerHTML += "<p>Your turn!</p>";
        scrollLog();
    }
    attack() {
        this.actionCount--;
        // Attack roll
        combatText.innerHTML += "<p class=\"enemyText\">The " + this.name +" attacks. (1d20" + `${this.attackMod >=0 ? "+" : ""}` + this.attackMod + ")</p>";
        let attackRoll = roll(20) + this.attackMod;
        combatText.innerHTML += "<p class=\"enemyText\">It rolls a " + attackRoll + ". (" + (attackRoll - this.attackMod) + `${this.attackMod >=0 ? "+" : ""}` + this.attackMod +  ")</p>";
        this.attackMod -= 5;
        // Damage roll if hit
        if (attackRoll >= player.ac) {
            let damageRoll = roll(this.damageDie) + this.damageBonus;
            if (attackRoll >= player.ac + 10) {
                combatText.innerHTML += "<p class=\"enemyText\">A critical hit!</p>";
                combatText.innerHTML += "<p class=\"enemyText\">It deals " + (damageRoll*2) + " damage. 2x(1d" + this.damageDie + "+" + this.damageBonus + ")</p>";
                player.loseHp(damageRoll * 2);
            } else {
                combatText.innerHTML += "<p class=\"enemyText\">Hit!</p>";
                combatText.innerHTML += "<p class=\"enemyText\">It deals " + damageRoll + " damage. (1d" + this.damageDie + "+" + this.damageBonus + ")</p>";
                player.loseHp(damageRoll);
            }
        } else {
            combatText.innerHTML += "<p class=\"enemyText\">Miss!</p>";
        }
        scrollLog();
    }
}

// Enemy list
const enemies = [
    new Enemy("Wolf", 14, 15, 5, 6, 2),
    {
        name: "Snake",
        ac: 15,
        hp: 8,
        maxHp: 8,
        attack: 8,
        attackMod: 8,
        damageDie: 4,
        damageBonus: 0,
        actionCount: 3,
        act() {},
        attack() {}
    },
    {
        name: "Statue",
        ac: 18,
        hp: 20,
        maxHp: 20,
        attack: 9,
        attackMod: 9,
        damageDie: 8,
        damageBonus: 2,
        actionCount: 3,
        act() {},
        attack() {}
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
    player.reset();

    // Reset enemies
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].hp = enemies[i].maxHp;
    }

    // Render window
    healthText.innerText = player.hp;
    goldText.innerText = player.gold + " gold, " + player.silver + " silver, " + player.copper + " copper";
    inventoryText.innerText = player.inventory[0];
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
    button1.innerText = "Begin";
    combatText.innerText = "";
    text.innerHTML = text1;
}

// Placeholder function
function dummy() {
    text.innerText = text0;
}

// Dice roller
function roll(die) {
    return Math.floor(Math.random() * die) + 1;
}

function scrollLog() {
    combatText.scrollTo(0, combatText.scrollHeight);
}

/*----------------------------*/
/* Scene Transition Functions */
/*----------------------------*/

function go7() {
    // Clear combat interface
    combatText.innerHTML += "";
    // Update text field
    text.innerHTML = text7;
    // Update buttons
    button1.innerText = "Squeeze through the Crack";
    button2.innerText = "Head Back to Town";
    button1.onclick = startGame;
    button1.onclick = startGame;
    button3.style.display = "none";
    button4.style.display = "none";
}

function go13() {
    // Update text field
    text.innerHTML = text13;
    // Combat initialization
    player.attackMod = 7;
    startFight(0);
}

function go17() {
    // Clear combat interface
    combatText.innerHTML += "";
    // Update text field
    text.innerHTML = text17;
    // Update buttons
    button1.innerText = "Try Again";
    button1.onclick = startGame;
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
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
    player.resetTurn();
    playerStats.style.display = "block";

    // Load enemy
    let enemy = enemies[enemyId];
    enemyNameText.innerText = enemy.name;
    enemyArmorText.innerText = enemy.ac;
    enemyHealthText.innerText = enemy.hp;
    enemyStats.style.display = "block";

    // Set up combat actions
    button1.onclick = () => {
        let checkTurnEnd = player.attack(enemy);
        console.log("Player actions: " + checkTurnEnd);
        if (enemy.hp === 0) {
            player.resetTurn();
            go7();
        }
        if (checkTurnEnd) {
            player.passTurn();
            enemy.takeTurn();
            player.resetTurn();
            if (player.hp === 0) {
                go17();
            }
        }
    }
    button2.onclick = () => {
        let checkTurnEnd = player.hide();
        if (checkTurnEnd) {
            player.passTurn();
            enemy.takeTurn();
            player.resetTurn();
            if (player.hp === 0) {
                go17();
            }
        }
    }
    button1.innerText = "Strike with Your Shortsword";
    button2.innerText = "Hide in the Bushes";
    button2.style.display = "inline-block";
}