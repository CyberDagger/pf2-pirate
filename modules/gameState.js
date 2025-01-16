/*-------------------*/
/* Game State Record */
/*-------------------*/

import {button1, button2, button3, button4, text, combatText, healthText, goldText, inventoryText, playerStats, playerHealthText, playerArmorText, playerAttackText, playerDamageText, playerActionsText, playerPerceptionText, playerAthleticsText, playerFortitudeText, playerReflexText, enemyStats, enemyNameText, enemyHealthText, enemyArmorText, distanceGraph} from "./DOMelements.js";

let gameState = {
    distance: 0,
    

    updateDistance() {
        distanceGraph.innerText = "P";
        for (let i = this.distance / 5; i > 0; i--) {
            distanceGraph.innerText += "-";
        }
        distanceGraph.innerText += "E";
    }
}

export default gameState;