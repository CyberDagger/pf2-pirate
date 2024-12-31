import {timerShort, timerLong} from "./time.js";

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

export {wait, scrollLog, log, logPlayer, logEnemy, lockButtons, unlockButtons};

