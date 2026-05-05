const apiKey = "22db6c123887f8b93ca8b4cda8b0f460"; 

async function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Enter city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetchWeather(url);
}

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    fetchWeather(url);
  });
}

async function fetchWeather(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("weather").innerHTML = "City not found";
      return;
    }

    displayWeather(data);

  } catch (err) {
    document.getElementById("weather").innerHTML = "Error fetching data";
  }
}

function displayWeather(data) {
  document.getElementById("weather").innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.weather[0].main}</p>
    <h1>${data.main.temp}°C</h1>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${data.wind.speed} m/s</p>
  `;
}
