const KEY = "96b947a45d33d7dc1c49af3203966408"; // Your OpenWeatherMap API key

// Request to get data
const getData = async (city) => {
  const base = "https://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city}&appid=${KEY}&units=metric`;

  const req = await fetch(base + query);  
  const data = await req.json();
  return data;
};

// Update UI
const updateUI = (data) => {
  const card = document.getElementById("card");
  const details = document.getElementById("details");
  const weatherIcon = document.getElementById("weather-icon");
  const overlay = document.getElementById("overlay");
  

  // Set data to elements
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("weather-description").textContent =
    data.weather[0].description.toUpperCase();
  document.getElementById("temperature").textContent = Math.round(
    data.main.temp
  );
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Use @2x for better icon quality

  // Show the card
  card.classList.remove("hidden");

  // Hide overlay
  overlay.classList.add("hidden");
};

// Get weather
const getWeather = async (city) => {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("hidden"); // Show overlay while fetching data
  const data = await getData(city);
  updateUI(data);
};

// Get location
const changeLocation = document.getElementById("change-location");
changeLocation.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = changeLocation.city.value.trim();
  changeLocation.reset();
  getWeather(cityName);
});

const audio = new Audio("/audio/audio_light-off.mp3"); // Replace with your sound file
document.getElementById("change-location").addEventListener("submit", (e) => {
  e.preventDefault();
  audio.play();
  
});

