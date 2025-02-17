import {
    timerShort,
    timerLong
} from "./time.js";
import {
    enemyImage,
    skillSuccesses
} from "./DOMelements.js";

/*-----------------------*/
/* Log Writing Functions */
/*-----------------------*/

// Wait function to insert delay between messages
// Time in miliseconds, 
// but a short and long delay have been defined as constants at the beginning of the file
// to ensure standardization
async function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// Call this function to scroll the log to the end
// Use after actors take actions in combat
function scrollLog() {
    combatText.scrollTo(0, combatText.scrollHeight);
}
function scrollSkill() {
    skillText.scrollTo(0, skillText.scrollHeight);
}

//Text functions
async function log(text) {
    await wait(timerShort);
    combatText.innerHTML += "<p>" + text + "</p>";
    scrollLog();
}
async function logPlayer(text) {
    await wait(timerShort);
    combatText.innerHTML += "<p class=\"allyText\">" + text + "</p>";
    scrollLog();
}
async function logEnemy(text) {
    await wait(timerShort);
    combatText.innerHTML += "<p class=\"enemyText\">" + text + "</p>";
    scrollLog();
}
async function logSkill(text) {
    await wait(timerShort);
    skillText.innerHTML += "<p>" + text + "</p>";
    scrollSkill();
}

function writeSkillResult(success) {
    if (success) {
        skillSuccesses.innerText += "◈";
    } else {
        skillFailures.innerText += "◈";
    }
}
function clearSkillResults() {
    skillSuccesses.innerText = "";
    skillFailures.innerText = "";
}

// Button switch
function lockButtons() {
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
    button4.disabled = true;
}
function unlockButtons() {
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = false;
    button4.disabled = false;
}
function lockCombatButtons() {
    combatButton1.disabled = true;
    combatButton2.disabled = true;
}
function unlockCombatButtons() {
    combatButton1.disabled = false;
    combatButton2.disabled = false;
}
function lockSkillButtons() {
    skillButton.disabled = true;
}
function unlockSkillButtons() {
    skillButton.disabled = false;
}

function displayEnemy(enemyId) {
    // <img src="../images/wolf.png">
    let file;
    if (enemyId === 0) {
        file = "wolf";
    } else if (enemyId === 1) {
        file = "snake"
    }
    enemyImage.innerHTML = "<img src=\"./images/" + file + ".png\">";
}

export {wait, scrollLog, log, logPlayer, logEnemy, logSkill, lockButtons, unlockButtons, lockCombatButtons, unlockCombatButtons, lockSkillButtons, unlockSkillButtons, writeSkillResult, clearSkillResults, displayEnemy};

