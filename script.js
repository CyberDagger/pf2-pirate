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
const playerPerceptionText = document.querySelector("#playerPerception");
const playerAthleticsText = document.querySelector("#playerAthletics");
const playerFortitudeText = document.querySelector("#playerFortitude");
const playerReflexText = document.querySelector("#playerReflex");
const enemyStats = document.querySelector("#enemyStats");
const enemyNameText = document.querySelector("#enemyName");
const enemyHealthText = document.querySelector("#enemyHealth");
const enemyArmorText = document.querySelector("#enemyArmor");
const distanceGraph = document.querySelector("#distanceGraph");

// Long text strings assigned to constants for readability
const text0 = "Hello, world!"
const text1 = "<p>You are a wandering adventurer visiting Otari, a small town on the coast of the Starstone Isle, an enormous island magically raised out of the ocean by an ancient god. Otari is renowned for its lumber and fine wooden boats, but that's not what brought you here—you came looking for adventure!</p><p>Word has it that a vicious beast is preying upon the town's livestock, and the mayor has offered 10 gold coins to any hero who can put an end to the menace. That kind of money would pay your expenses for a month!</p><p>After asking around at a nearby tavern called the Crow's Casks, you learn that most of the attacks occur on the west side of town, not far from the shore. That seems like the best place to start your search.</p><p>You gather up your belongings and make your way out along the rocky beach to begin your hunt. It doesn't take long for you to find the entrance to a dark and mysterious cave. Large paw prints lead to and from the gloomy opening.</p>"
const text7 = "<p>You leap aside, avoiding the wolf’s snarling jaws and drive your sword deep into its flank. With a yowl, the wretched creature falls into the muck and goes still. You clean off your blade then wander into the cave to make sure that this wolf was the only one.</p><p>As your eyes adjust to the gloom, you find yourself inside a small cavern that was obviously the beast’s home. It stinks of wet fur, and there are scraps of rotting meat and bone lying about—evidence of its previous victims. Far more interesting, though, is what you spot at the back of the cave.</p><p>A crack in the far wall leads into darkness, and just above it, scratched into stone, is a symbol that looks a lot like a treasure chest. As you draw closer, you realize the crack is actually the entrance to an underground tunnel—it might just be the hiding place of some forgotten treasure.</p>"
const text9 = "<p>You returned to town safely and collect your reward for killing the wolf—10 gold! But did you collect all of this adventure’s treasure? Besides the reward, you can find coins and treasure worth 40 more gold during this adventure. Remember that 10 copper is equal to 1 silver and 10 silver is equal to 1 gold. If you want to try again, you can press the buton and start over from the beginning. You might also want to go straight to building your own character for future adventures. If so, go to <a href=\"https://2e.aonprd.com/\">Archives of Nethys</a> to begin the journey.</p>"
const text10 = "<p>The passageway winds through ancient rock, but it’s clear that someone has made it wider with a pickaxe, although it looks like the work was done many years ago. After squeezing hurriedly through a narrow crevice with a ceiling supported only by a rotting log, you find yourself in a small chamber. Roots grow down from above, breaking through the ceiling and letting in faint, dappling light here and there across the cavern. Opposite the entrance is another corridor, but before you can head down that way, you hear a terrible hissing sound coming from the passageway. Emerging from the darkness is a gigantic snake with terrifying fangs!</p><div class=\"instruction\"><p>You are now in combat with a snake! Just as when fighting the wolf, you and the snake will take turns attacking one another until one side is defeated, but there are a few new things to pay attention to in this combat.</p><p>In this fight, the snake gets to go first, but during its first turn, it must spend 2 of its 3 actions to close the distance before it can attack. So, on the snake’s first turn, it gets to spend only 1 action to attack you. On the rest of its turns it spends all 3 actions attacking.</p><p>Whenever the snake bites you, it might poison you. This happens as part of the bite, so it doesn’t use an action. When you are hit by the snake’s bite, you must attempt a Saving Throw to resist the effects of the venom. Saving throws are special rolls to resist things that try to harm or control your character. There are three kinds of saving throws: Reflex saving throws are used to dodge a bolt of lightning or a fearsome dragon’s fire breath; Will saving throws are used to resist spells that try to take over your mind; and Fortitude saving throws are used to fight off poisons and diseases.</p><p>On your turn, you can attack, just like in the previous fight. Unfortunately, there’s nothing to hide behind in this chamber, so you can’t boost your Armor Class like you could in the wolf fight.</p></div>"
const text13 = "<p>Noticing the tracks leading to the cave, you hide in the nearby underbrush, hoping to ambush whatever foul beast lives here. After just a few minutes, you hear the sounds of something approaching, and the scent of wet fur hangs heavy in the air.</p><p>Emerging from the bushes is a lean, mangy wolf carrying the body of a dead chicken in its maw. It appears to be returning home after its most recent hunt. Clearly, this is the beast that’s been preying upon the farmers’ animals. You wait until it is near then draw your shortsword and spring out to attack!</p><div class=\"instruction\"><p>You are now in combat with a wolf! You know that this feral beast cannot be tamed and must be slain to keep the farmers’ livestock safe. Both you and the wolf take turns attacking one another. You attack by rolling the 20-sided die (or d20 for short) and adding your attack bonus (which represents your skill at wielding a weapon). If the total is equal to or greater than the wolf’s Armor Class (AC for short), then the attack is a hit and deals damage. Subtract the damage from the wolf’s Hit Points (HP for short). To defeat the wolf, you must reduce the wolf to 0 HP or less. On the wolf’s turn, it will attack you—you’ll roll a d20 for the wolf, add its attack bonus, and compare the result to your AC. If the wolf reduces you to 0 HP or less, you die.</p><p>Remember that you go first. If you find that the wolf is hitting you too much, you should remember to hide with your third action to make it harder for the wolf to hit you.</p></div>"
const text17 = "<p>Your vision grows dark as life leaves your body. In your final moments, you can’t help but think that this is not how stories should end. Maybe the next hero will fare better in this deadly place...</p><p>Although you have died, there are still adventures to be had. You can start this adventure over by clicking the button. You are restored to full Hit Points, but so are all of the foes that you have faced. You must explore and face whatever dangers await you all over again. Alternatively, you can start making your own character to play in adventures with others. The full rules can be read at <a href=\"https://2e.aonprd.com/\">Archives of Nethys</a>.</p>"
const text18 = "<p>Putting aside your fear, you squeeze your way through the crack into the narrow passageway beyond, lit only by faint light from above. If the cobwebs and dust are any indication, no one has been down this way for a long time. Up ahead, the passageway widens to form a cave chamber before veering to the left.</p><p>A curtain of moss grows on the right wall of the small cavern, fed by a trickle of water dripping from the cavern ceiling. Something about it looks odd, but you can’t quite figure it out without succeeding at a Perception check.</p><div class=\"instruction\"><p>Your Perception indicates how good you are at noticing things. To attempt a Perception check, roll a d20 and add your <strong>Perception</strong> bonus, which is a <strong>+4</strong>. Once you have rolled, compare the total to the <strong>Difficulty Class</strong> (DC). If your result is equal to or greater than the DC, you succeed!</p></div>"
const text21 = "<p>You look around but fail to spot anything of interest. With no other way to go, you head down the corridor that leads off to the left. You notice a faint breeze as you make your way down that tunnel.</p>"

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
    // Skill actions
    rollPerception(dc) {
        combatText.innerHTML += "<p class=\"allyText\">You roll a Perception check. (1d20+" + this.perception + "</p>";
        let skillRoll = roll(20) + this.perception;
        combatText.innerHTML += "<p class=\"allyText\">\nYou roll a " + skillRoll + ". (" + (skillRoll - this.perception) + `${this.perception >=0 ? "+" : ""}` + this.perception + ")</p>";
        if (skillRoll >= dc) {
            combatText.innerHTML += "<p class=\"allyText\">You pass!</p>";
            scrollLog();
            return true;
        } else {
            combatText.innerHTML += "<p class=\"allyText\">You fail.</p>";
            scrollLog();
            return false;
        }
    },
    // Saving throws
    saveFortitude(dc) {
        combatText.innerHTML += "<p class=\"allyText\">You roll a Fortitude save. (1d20+" + this.fortitude + "</p>";
        let saveRoll = roll(20) + this.fortitude;
        combatText.innerHTML += "<p class=\"allyText\">\nYou roll a " + saveRoll + ". (" + (saveRoll - this.fortitude) + `${this.fortitude >=0 ? "+" : ""}` + this.fortitude + ")</p>";
        if (saveRoll >= dc) {
            combatText.innerHTML += "<p class=\"allyText\">You pass!</p>";
            scrollLog();
            return true;
        } else {
            combatText.innerHTML += "<p class=\"allyText\">You fail.</p>";
            scrollLog();
            return false;
        }
    },
    // Combat actions
    attack(enemy) {
        this.actionCount--, 2000;
        // Attack roll
        combatText.innerHTML += "<p class=\"allyText\">You attack. (1d20" + `${this.attackMod >=0 ? "+" : ""}` + this.attackMod +")</p>";
        let attackRoll = roll(20) + this.attackMod;
        combatText.innerHTML += "<p class=\"allyText\">\nYou roll a " + attackRoll + ". (" + (attackRoll - this.attackMod) + `${this.attackMod >=0 ? "+" : ""}` + this.attackMod + ")</p>", 2000;
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

// Enemy classes
class Enemy {
    // Parameter prototypes
    name;
    ac;
    maxHp;
    hp;
    attackBase;
    attackMod;
    damageDie;
    damageBonus;

    // Almost everything in Pathfinder has 3 actions per turn, so this value is initialized in the parent class
    actionCount = 3;

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
    // takeTurn is a basic conditional script to determine actions taken during turn. Default is 3 attacks, but can be overridden for more complex behavior
    takeTurn() {
        this.resetActions();
        while (this.actionCount > 0) {
            console.log("Default enemy action routine");
            this.attack();
            if (player.hp === 0) {
                return;
            }
        }
        this.passTurn();
    }
    passTurn() {
        combatText.innerHTML += "<p>Your turn!</p>";
        scrollLog();
    }
    // Not all enemies will move, so the method is empty and specific enemie will override their own methods
    move() {}
    // attackEffects is an empty method placed in the attack sequence to facilitate partial override, 
    // should an attach have an additional effect on hit but otherwise execute the same way
    attackEffects() {}
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
            this.attackEffects();
        } else {
            combatText.innerHTML += "<p class=\"enemyText\">Miss!</p>";
        }
        scrollLog();
    }
}

// Specific enemies inherit traits from Enemy class

class Wolf extends Enemy {
    // Wolf class uses default behaviors, so only parameters are initialized
    name = "Wolf";
    ac = 14;
    maxHp = 15;
    hp = 15;
    attackBase = 5;
    attackMod = 5;
    damageDie = 6;
    damageBonus = 2;
}

class Snake extends Enemy {
    name = "Snake";
    ac = 15;
    maxHp = 8;
    hp = 8;
    attackBase = 8;
    attackMod = 8;
    damageDie = 4;
    damageBonus = 0;

    // takeTurn, move, and attackEffects methods override defaults
    takeTurn() {
        this.resetActions();
        while (this.actionCount > 0) {
            console.log("Snake distance: " + distance);
            if (distance > 0) {
                this.move();
            } else {
                this.attack();
                if (player.hp === 0) {
                    return;
                }
            }
        }
    }
    move() {
        this.actionCount--;
        combatText.innerHTML += "<p class=\"enemyText\">The " + this.name + " slithers 20 feet towards you.</p>";
        distance -= 20;
        if (distance < 0) {
            distance = 0;
        }
        updateDistance();
    }
    attackEffects() {
        combatText.innerHTML += "<p class=\"enemyText\">The Snake's venom starts working its way through your body.</p>";
        if (player.saveFortitude(16)) {
            combatText.innerHTML += "<p class=\"allyText\">You manage to fight off the worst of it.</p>";
        } else {
            combatText.innerHTML += "<p class=\"enemyText\">The venom burns through your flesh.</p>";
            let venomDamage = roll(8);
            combatText.innerHTML += "<p class=\"enemyText\">It deals " + venomDamage + " (1d8) damage to you.</p>";
            player.loseHp(venomDamage);
        }
    }
}

// Enemy list
const enemies = [
    new Wolf(),
    new Snake()
];

// Adventure scenarios, numbered in the book.
// Unused for now, will be useful after refactoring.
// Probably in a different structure, though,
// but an useful reminder for now.
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
    distance = 40;

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

    // Note to self, verify if this function fully deprecates the code above
    writeLogHud();
}

// Placeholder function
function dummy() {
    text.innerText = text0;
}

// Dice roller
function roll(die) {
    return Math.floor(Math.random() * die) + 1;
}

// Call this function to scroll the log to the end
// Use after actors take actions in combat
function scrollLog() {
    combatText.scrollTo(0, combatText.scrollHeight);
}

// Writes stats above combat log
function writeLogHud() {
    playerArmorText.innerText = player.ac;
    playerHealthText.innerText = player.hp;
    player.updateActions();
    playerAttackText.innerText = `${player.attackMod >=0 ? '+' : ''}` + player.attackMod;
    playerDamageText.innerText = "1d" + player.damageDie + "+" + player.damageBonus;
    playerFortitudeText.innerText = "+" + player.fortitude;
    playerReflexText.innerText = "+" + player.reflex;
    playerPerceptionText.innerText = "+" + player.perception;
    playerAthleticsText.innerText = "+" + player.athletics;
    updateDistance();
}

function updateDistance() {
    distanceGraph.innerText = "P";
    for (i = distance / 5; i > 0; i--) {
        distanceGraph.innerText += "-";
    }
    distanceGraph.innerText += "E";
}

/*----------------------------*/
/* Scene Transition Functions */
/*----------------------------*/

function go7() {
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = text7;
    // Update buttons
    button1.innerText = "Squeeze through the Crack";
    button2.innerText = "Head Back to Town";
    button1.onclick = go18;
    button2.onclick = go9;
    button3.style.display = "none";
    button4.style.display = "none";
}

function go9() {
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = text9;
    // Update buttons
    button1.innerText = "Play Again";
    button1.onclick = startGame;
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
}

function go10() {
    console.log("Distance: " + distance)
    // Snake fight
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = text10;
    // Combat initialization
    player.resetTurn();
    startFight(1);
}

function go13() {
    // Wolf fight
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = text13;
    // Combat initialization
    player.resetTurn();
    startFight(0);
}

function go17() {
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = text17;
    // Update buttons
    button1.innerText = "Try Again";
    button1.onclick = startGame;
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
}

function go18() {
    // Clear combat interface
    combatText.innerHTML = "";
    // Set skill DC
    let dc = 15;
    // Update text field
    text.innerHTML = text18;
    // Update buttons
    button1.innerText = "Roll Perception";
    button1.onclick = () => {
        if (player.rollPerception(dc)) {
            // To be implemented
            go24();
        } else {
            // Implementing
            go21();
        }
    };
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
}

function go21() {
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = text21;
    // Update buttons
    button1.innerText = "Continue Further";
    button1.onclick = go10;
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
}

function go24() {
    // To be implemented
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
    // Attack action
    button1.innerText = "Attack with Your Shortsword";
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
    // If player can do something other than attack, this handles it
    if (enemyId === 0) {
        button2.innerText = "Hide in the Bushes";
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
        button2.style.display = "inline-block";
    } else {
        button2.onclick = dummy;
        button2.style.display = "none";
    }
    // Initiative exceptions. Snake goes first.
    if (enemyId === 1) {
        enemy.takeTurn();
        if (player.hp === 0) {
            go17();
        }
    }
}