let plant = document.getElementById("plant");
let fill = document.getElementById("water-fill");
let moodText = document.getElementById("mood");
let streakText = document.getElementById("streak");
let weatherIcon = document.getElementById("weather-icon");

let water = localStorage.getItem("water") ? Number(localStorage.getItem("water")) : 50;
let streak = localStorage.getItem("streak") ? Number(localStorage.getItem("streak")) : 0;
let lastWater = localStorage.getItem("lastWater") ? Number(localStorage.getItem("lastWater")) : Date.now();

function updatePlant() {
    fill.style.width = water + "%";
    streakText.textContent = streak;

    // Weather
    let weather = Math.random() < 0.5 ? "sun" : "rain";
    weatherIcon.src = weather === "sun" ? "sun.jpg" : "rain.jpg";

    // Mood
    if (water > 70) moodText.textContent = "Very Happy";
    else if (water > 40) moodText.textContent = "Happy";
    else if (water > 20) moodText.textContent = "Tired";
    else moodText.textContent = "Dying 💀";

    // Plant Growth Stages
    if (water < 20) plant.src = "wilt.png";
    else if (water < 40) plant.src = "seed.jpg";
    else if (water < 60) plant.src = "small.jpg";
    else if (water < 80) plant.src = "medium.jpg";
    else plant.src = "large.jpg";

    // Animation
    plant.style.transform = "scale(1.1)";
    setTimeout(() => plant.style.transform = "scale(1)", 800);

    localStorage.setItem("water", water);
    localStorage.setItem("streak", streak);
}

document.getElementById("water-btn").onclick = () => {
    water = Math.min(water + 20, 100);
    streak++;
    lastWater = Date.now();
    localStorage.setItem("lastWater", lastWater);
    updatePlant();
};

setInterval(() => {
    water = Math.max(water - 1, 0);
    updatePlant();
}, 5000);

updatePlant();
