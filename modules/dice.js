/*----------------------*/
/* Dice-related methods */
/*----------------------*/

// Dice roller
function roll(die) {
    return Math.floor(Math.random() * die) + 1;
}

export default roll;