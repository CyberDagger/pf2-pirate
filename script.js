// IDs for array elements
const SCENE_1 = 0;
const SCENE_13 = 1;

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


// Enemy list
const enemies = [];

// Adventure scenarios, numbered in the book
const scenes = [
    {
        name: scene1,
        buttonText: ["Begin", "dummy", "dummy"],
        buttonFunc: [go13, dummy, dummy],
        flavorText: text1
    }
];

// initialize buttons
button1.onclick = update(scenarios[SCENE_13]);
button2.onclick = dummy;
button3.onclick = dummy;


// Placeholder function
function dummy() {
    text.innerText = text0;
}

// Scene transition functions
function go13() {
    text.innerText = "Does this work?";
}

// Long text strings assigned to constants for readability
const text0 = "Hello, world!"

const text1 = "You are a wandering adventurer visiting Otari, a small town on the coast of the Starstone Isle, an enormous island magically raised out of the ocean by an ancient god. Otari is renowned for its lumber and fine wooden boats, but that's not what brought you here—you came looking for adventure!\n Word has it that a vicious beast is preying upon the town's livestock, and the mayor has offered 10 gold coins to any hero who can put an end to the menace. That kind of money would pay your expenses for a month!\n After asking around at a nearby tavern called the Crow's Casks, you learn that most of the attacks occur on the west side of town, not far from the shore. That seems like the best place to start your search.\n You gather up your belongings and make your way out along the rocky beach to begin your hunt. It doesn't take long for you to find the entrance to a dark and mysterious cave. Large paw prints lead to and from the gloomy opening."