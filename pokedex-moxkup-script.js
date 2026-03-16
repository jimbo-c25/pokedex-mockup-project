let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-button");

let creatureName = document.getElementById("creature-name");
let creatureId = document.getElementById("creature-id");
let creatureWeight = document.getElementById("weight");
let creatureHeight = document.getElementById("height");
let creatureType = document.getElementById("types");
let creatureHealth = document.getElementById("hp");
let attackStat = document.getElementById("attack");
let defenseStat = document.getElementById("defense");
let specialAttackName = document.getElementById("special-name");
let specialAttackStat = document.getElementById("special-attack");
let specialDescription = document.getElementById("special-description");
let specialDefenseStat = document.getElementById("special-defense");
let speedStat = document.getElementById("speed");

const fetchData = async () => {
    try {
        const creatureNameOrId = searchInput.value.toLowerCase();
        const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureNameOrId}`);
        const data = await res.json();
        setCreatureInfo(data);

    }  catch (error) {
        alert("Creature not found");
        console.log(error);
    } 
};

const setCreatureInfo = data => {
    const { name, id, weight, height, special, stats, types } = data;

    creatureName.textContent = `${name[0].toUpperCase() + name.slice(1)}`;
    creatureId.textContent = `#${id}`;
    creatureWeight.textContent = `Weight: ${weight} lbs.`;
    creatureHeight.textContent = `Height: ${height} ft.`;

    creatureHealth.textContent = `HP: ${stats[0].base_stat}`;
    attackStat.textContent = `Attack: ${stats[1].base_stat}`;
    defenseStat.textContent = `Defense ${stats[2].base_stat}`;
    specialAttackName.textContent = `${special.name}`;
    specialAttackStat.textContent = `Special Attack: ${stats[3].base_stat}`;
    specialDescription.textContent = `${special.description}`;
    specialDefenseStat.textContent = `Special Defense: ${stats[4].base_stat}`;
    speedStat.textContent = `Speed: ${stats[5].base_stat}`;

    creatureType.textContent = `Type: ${types.map(type => type.name[0].toUpperCase() + type.name.slice(1)).join(" ")}`;

};

searchBtn.addEventListener("click", e => {
    e.preventDefault();
    fetchData();
});

searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        fetchData();
        colorChanger();
    };
});

function colorChanger() {
    if (creatureType.textContent.includes("Fire")) {
        creatureType.classList.toggle("fire");

    }
}
