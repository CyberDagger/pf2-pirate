/*--------*/
/* Player */
/*--------*/

// Module imports
import {playerHealthText, playerArmorText, playerAttackText, playerActionsText} from "./DOMelements.js";
import {wait, scrollLog, log, logPlayer, lockButtons, unlockButtons} from "./logOperators.js";
import roll from "./dice.js";

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
    async passTurn() {
        combatText.innerHTML += "<p style=\"margin-bottom:30px;\"></p>";
        await log("3 actions spent. Passing turn.");
        this.resetMap();
        combatText.innerHTML += "<p style=\"margin-bottom:30px;\"></p>";
        await log("The enemy takes its turn.");
        combatText.innerHTML += "<p style=\"margin-bottom:30px;\"></p>";
    },
    loseHp(amount) {
        this.hp -= amount;
        if (this.hp < 0) {
            this.hp = 0
        }
        playerHealthText.innerText = this.hp;
    },
    // Skill actions
    async rollPerception(dc) {
        lockButtons();
        await logPlayer("You roll a Perception check. (1d20+" + this.perception + ")");
        let skillRoll = roll(20) + this.perception;
        await logPlayer("You roll a " + skillRoll + ". (" + (skillRoll - this.perception) + `${this.perception >=0 ? "+" : ""}` + this.perception + ")");
        if (skillRoll >= dc) {
            await logPlayer("You pass!");
            unlockButtons();
            return true;
        } else {
            await logPlayer("You fail.");
            unlockButtons();
            return false;
        }
    },
    // Saving throws
    async saveFortitude(dc) {
        lockButtons();
        await logPlayer("You roll a Fortitude save. (1d20+" + this.fortitude + ")");
        let saveRoll = roll(20) + this.fortitude;
        await logPlayer("You roll a " + saveRoll + ". (" + (saveRoll - this.fortitude) + `${this.fortitude >=0 ? "+" : ""}` + this.fortitude + ")");
        if (saveRoll >= dc) {
            await logPlayer("You pass!");
            unlockButtons();
            return true;
        } else {
            await logPlayer("You fail.");
            unlockButtons();
            return false;
        }
    },
    // Combat actions
    async attack(enemy) {
        lockButtons();
        this.actionCount--;
        combatText.innerHTML += "<p style=\"margin-bottom:30px;\"></p>";
        // Attack roll
        await logPlayer("You attack. (1d20" + `${this.attackMod >=0 ? "+" : ""}` + this.attackMod +")");
        let attackRoll = roll(20) + this.attackMod;
        await logPlayer("You roll a " + attackRoll + ". (" + (attackRoll - this.attackMod) + `${this.attackMod >=0 ? "+" : ""}` + this.attackMod + ")");
        // Damage roll if hit
        if (attackRoll >= enemy.ac) {
            let damageRoll = roll(this.damageDie) + this.damageBonus;
            if (attackRoll >= (enemy.ac + 10)) {
                await logPlayer("You got a critical hit!");
                await logPlayer("You deal " + (damageRoll*2) + " damage. 2x(1d" + this.damageDie + "+" + this.damageBonus + ")");
                enemy.loseHp(damageRoll * 2);
            } else {
                await logPlayer("You hit!");
                await logPlayer("You deal " + damageRoll + " damage. (1d" + this.damageDie + "+" + this.damageBonus + ")");
                enemy.loseHp(damageRoll);
            }
        } else {
            await logPlayer("You miss!");
        }
        this.attackMod -= 5;
        playerAttackText.innerText = `${this.attackMod >=0 ? '+' : ''}` + this.attackMod;
        unlockButtons();
        return this.updateActions();
    },
    async hide() {
        lockButtons();
        if (this.hidden) {
            await log("You are already hidden. Fight back against the Wolf!");
            unlockButtons();
        } else {
            this.actionCount--;
            this.hidden = true;
            this.ac += 2;
            playerArmorText.innerText = this.ac;
            await logPlayer("You hide in the nearby bushes, making it harder for the Wolf to hit you.");
            unlockButtons();
            return this.updateActions();
        }
    }
}

export default player;