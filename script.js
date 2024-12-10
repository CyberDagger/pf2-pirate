// IDs for array elements
const SCENARIO_1 = 1;

// HTML elements
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const enemyStats = document.querySelector("#enemyStats");
const enemyNameText = document.querySelector("#enemyName");
const enemyHealthText = document.querySelector("#enemyHealth");

// Player variables
let health = 20;
let ac = 18;
let gold = 0;
let inventory = ["Shortsword"];

// Enemy variables
let enemyHealth;
let enemyAc;

const enemies = [];

const scenarios = [];