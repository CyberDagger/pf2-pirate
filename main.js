import {button1, button2, button3, button4, combatButton1, combatButton2, text, combatText, healthText, goldText, inventoryText, playerStats, playerHealthText, playerArmorText, playerAttackText, playerDamageText, playerActionsText, playerPerceptionText, playerAthleticsText, playerFortitudeText, playerReflexText, enemyStats, enemyNameText, enemyHealthText, enemyArmorText, distanceGraph} from "./modules/DOMelements.js";
import sceneText from "./modules/text.js";
import {timerShort, timerLong} from "./modules/time.js";
import roll from "./modules/dice.js";
import player from "./modules/player.js";
import {Wolf, Snake} from "./modules/enemy.js";
import {wait, scrollLog, log, logPlayer, logEnemy, lockButtons, unlockButtons, displayEnemy} from "./modules/logOperators.js";
import gameState from "./modules/gameState.js";

document.addEventListener("DOMContentLoaded", startGame);

/*--------------*/
/* Game Objects */
/*--------------*/

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
        flavorText: sceneText[1]
    },
    {
        id: "scene13",
        buttonText: ["Begin", "dummy", "dummy", "dummy"],
        buttonFunc: [go13, dummy, dummy, dummy],
        flavorText: sceneText[13]
    }
];

/*---------------------------*/
/* Game Initialization Logic */
/*---------------------------*/

// Game Start
function startGame() {
    // Window variables
    button1.onclick = go13;
    button2.onclick = go10;
    button3.onclick = dummy;
    button4.onclick = dummy;

    // Player variables
    player.reset();

    // Reset enemies
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].hp = enemies[i].maxHp;
    }
    gameState.distance = 0;

    // Render window
    healthText.innerText = player.hp;
    goldText.innerText = player.gold + " gold, " + player.silver + " silver, " + player.copper + " copper";
    inventoryText.innerText = player.inventory[0];
    //button2.style.display = "none";
    button2.style.display = "inline-block";
    button3.style.display = "none";
    button4.style.display = "none";
    button1.innerText = "Begin";
    button2.innerText = "Skip to Test";
    combatText.innerText = "";
    text.innerHTML = sceneText[1];

    // Note to self, verify if this function fully deprecates the code above
    writeLogHud();
}

// Placeholder function
function dummy() {
    console.log("Dummy function triggered. This shouldn't happen.");
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
    gameState.updateDistance();
}

/*----------------------------*/
/* Scene Transition Functions */
/*----------------------------*/

// The original Pirate King's Plunder is in the form of a choose your own adventure book.
// If I was making the adventure from scratch, I would use a more fitting structure for a fully blind game,
// but I feel it would be more work than it's worth to do so here.

async function go5() {
    console.log("Not yet implemented");
}

async function go7() {
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = sceneText[7];
    // Update buttons
    button1.innerText = "Squeeze through the Crack";
    button2.innerText = "Head Back to Town";
    button1.onclick = go18;
    button2.onclick = go9;
    button3.style.display = "none";
    button4.style.display = "none";
}

    // Do next
async function go8() {
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = sceneText[8];
    // Update buttons
    button1.innerText = "Go Left";
    button1.onclick = go15;
    button2.innerText = "Go Right";
    button2.onclick = go5;
    button2.style.display = "inline-block";
}

async function go9() {
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = sceneText[9];
    // Update buttons
    button1.innerText = "Play Again";
    button1.onclick = startGame;
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
}

async function go10() {
    gameState.distance = 40;
    console.log("Distance: " + gameState.distance);
    writeLogHud();
    // Snake fight
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = sceneText[10];
    // Combat initialization
    player.resetTurn();
    startFight(1);
}

async function go13() {
    // Wolf fight
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = sceneText[13];
    // Combat initialization
    player.resetTurn();
    button1.innerText = "Start Fight";
    button1.onclick = async () => {
        await startFight(0);
    };
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
}

async function go15() {
    console.log("Not yet implemented");
}

async function go17() {
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = sceneText[17];
    // Update buttons
    button1.innerText = "Try Again";
    button1.onclick = startGame;
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
}

async function go18() {
    // Clear combat interface
    combatText.innerHTML = "";
    // Set skill DC
    let dc = 15;
    // Update text field
    text.innerHTML = sceneText[18];
    // Update buttons
    button1.innerText = "Roll Perception";
    button1.onclick = async () => {
        if (await player.rollPerception(dc)) {
            // To be implemented
            console.log("Player passed Perception check. Step 24 not yet implemented.");
            go24();
        } else {
            // Implementing
            console.log("Player failed Perception check. Moving to step 21.");
            go21();
        }
    };
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
}

async function go21() {
    console.log("Initiating step 21...");
    // Clear combat interface
    combatText.innerHTML = "";
    // Update text field
    text.innerHTML = sceneText[21];
    // Update buttons
    button1.innerText = "Continue Further";
    button1.onclick = go10;
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
}

async function go24() {
    // To be implemented
}

/*------------------------*/
/* Combat Logic Functions */
/*------------------------*/

async function startFight(enemyId) {
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
    displayEnemy(enemyId);

    // Set up combat actions
    // Attack action
    combatButton1.innerText = "Attack with Your Shortsword";
    combatButton1.onclick = async () => {
        let checkTurnEnd = await player.attack(enemy);
        console.log("Player actions: " + checkTurnEnd);
        if (enemy.hp === 0) {
            player.resetTurn();
            await wait(timerLong);
            if (enemyId === 0) {
                unlockButtons();
                combat.style.display = "none";
                go7();
            } else if (enemyId === 1) {
                unlockButtons();
                combat.style.display = "none";
                go8();
            }
        }
        if (checkTurnEnd) {
            await player.passTurn();
            enemy.takeTurn();
            player.resetTurn();
            if (player.hp === 0) {
                await wait(timerLong);
                unlockButtons();
                combat.style.display = "none";
                go17();
            }
        }
    }
    // If player can do something other than attack, this handles it
    if (enemyId === 0) {
        combatButton2.innerText = "Hide in the Bushes";
        combatButton2.onclick = async () => {
            let checkTurnEnd = await player.hide();
            if (checkTurnEnd) {
                await player.passTurn();
                enemy.takeTurn();
                player.resetTurn();
                if (player.hp === 0) {
                    await wait(timerLong);
                    unlockButtons();
                    combat.style.display = "none";
                    go17();
                }
            }
        }
        combatButton2.style.display = "inline-block";
    } else {
        combatButton2.onclick = dummy;
        combatButton2.style.display = "none";
    }
    // Initiative exceptions. Snake goes first.
    if (enemyId === 1) {
        await enemy.takeTurn();
        if (player.hp === 0) {
            await wait(timerLong);
            unlockButtons();
            combat.style.display = "none";
            go17();
        }
    }

    // Open combat window
    lockButtons();
    await wait(timerShort);
    combat.style.display = "block";
}