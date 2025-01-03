/*-------------------------*/
/* Enemy Class Definitions */
/*-------------------------*/

// Module imports
import {combatText, enemyHealthText} from "./DOMelements.js";
import {timerShort, timerLong} from "./time.js";
import {wait, scrollLog, log, logEnemy, lockButtons, unlockButtons} from "./logOperators.js";
import roll from "./dice.js";
import player from "./player.js";

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

    // Internal value modification methods
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
    async takeTurn() {
        lockButtons();
        this.resetActions();
        while (this.actionCount > 0) {
            console.log("Default enemy action routine");
            await wait(timerLong);
            await this.attack();
            if (player.hp === 0) {
                return;
            }
        }
        this.passTurn();
    }
    async passTurn() {
        combatText.innerHTML += "<p style=\"margin-bottom:30px;\"></p>";
        await log("Your turn!");
        await wait(timerShort);
        unlockButtons();
    }
    // Not all enemies will move, so the method is empty and specific enemie will override their own methods
    async move() {}
    // attackEffects is an empty method placed in the attack sequence to facilitate partial override, 
    // should an attach have an additional effect on hit but otherwise execute the same way
    async attackEffects() {}
    async attack() {
        this.actionCount--;
        // Attack roll
        await logEnemy("The " + this.name +" attacks. (1d20" + `${this.attackMod >=0 ? "+" : ""}` + this.attackMod + ")");
        let attackRoll = roll(20) + this.attackMod;
        await logEnemy("It rolls a " + attackRoll + ". (" + (attackRoll - this.attackMod) + `${this.attackMod >=0 ? "+" : ""}` + this.attackMod +  ")");
        this.attackMod -= 5;
        // Damage roll if hit
        if (attackRoll >= player.ac) {
            let damageRoll = roll(this.damageDie) + this.damageBonus;
            if (attackRoll >= player.ac + 10) {
                combatText.innerHTML += "<p class=\"enemyText\">A critical hit!</p>";
                await logEnemy("It deals " + (damageRoll*2) + " damage. 2x(1d" + this.damageDie + "+" + this.damageBonus + ")");
                player.loseHp(damageRoll * 2);
            } else {
                await logEnemy("Hit!");
                await logEnemy("It deals " + damageRoll + " damage. (1d" + this.damageDie + "+" + this.damageBonus + ")");
                player.loseHp(damageRoll);
            }
            this.attackEffects();
        } else {
            await logEnemy("Miss!");
        }
        scrollLog();
    }
}

// Specific enemies inherit traits from Enemy class

// Wolf class uses default behaviors, so only parameters are initialized
class Wolf extends Enemy {
    name = "Wolf";
    ac = 14;
    maxHp = 15;
    hp = 15;
    attackBase = 5;
    attackMod = 5;
    damageDie = 6;
    damageBonus = 2;
}

// Snake class has an initial round of movement,
// and has a poison effect on the attack
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
    async takeTurn() {
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
    async move() {
        this.actionCount--;
        await logEnemy("The " + this.name + " slithers 20 feet towards you.");
        distance -= 20;
        if (distance < 0) {
            distance = 0;
        }
        updateDistance();
    }
    async attackEffects() {
        await logEnemy("The Snake's venom starts working its way through your body.</p>");
        if (player.saveFortitude(16)) {
            await logEnemy("You manage to fight off the worst of it.");
        } else {
            await logEnemy("The venom burns through your flesh.");
            let venomDamage = roll(8);
            await logEnemy("It deals " + venomDamage + " (1d8) damage to you.");
            player.loseHp(venomDamage);
        }
    }
}

export {Wolf, Snake};