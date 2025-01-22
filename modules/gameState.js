/*-------------------*/
/* Game State Record */
/*-------------------*/

import {button1, button2, button3, button4, text, combatText, healthText, goldText, inventoryText, playerStats, playerHealthText, playerArmorText, playerAttackText, playerDamageText, playerActionsText, playerPerceptionText, playerAthleticsText, playerFortitudeText, playerReflexText, enemyStats, enemyNameText, enemyHealthText, enemyArmorText, distanceGraph} from "./DOMelements.js";
import player from "./player.js";

const gameState = {
    distance: 0,
    lever: false,
    torch: false,
    
    getLever() {
        return this.lever;
    },

    reset() {
        this.distance = 0;
        this.lever = false;
        this.torch = false;
    },

    updateDistance() {
        distanceGraph.innerText = "P";
        for (let i = this.distance / 5; i > 0; i--) {
            distanceGraph.innerText += "-";
        }
        distanceGraph.innerText += "E";
    },

    pullLever() {
        this.lever = true;
        console.log("Lever flipped: " + this.lever);
    },

    takeTorch() {
        this.torch = true;
        player.pushInventory("Torch");
    }
}

export default gameState;