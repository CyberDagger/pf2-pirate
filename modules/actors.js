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