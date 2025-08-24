import "./styles.css";
import "./data.css";

async function getWeatherData(location) {
	const APIKEY = "HS8MXV9HMAGD22G2Z7L4GJ8WZ";
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${APIKEY}&contentType=json`;

	const response = await fetch(url, { mode: "cors" });
	if (!response.ok) {
		throw new Error("Location not found or API error.");
	}
	const data = await response.json();
	return data;
}

async function getGif(description) {
	const APIKEY = "IKvLdvvFcNLjeyKWWEzt23h1Q8yWp4A2";
	const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=/${description}`;

	const response = await fetch(url, { mode: "cors" });
	if (!response.ok) {
		throw new Error("GIF not found or API Error");
	}

	const data = await response.json();
	return data.data[0].images.downsized.url;
}

let locationForm = document.querySelector(".location-form");

locationForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	let formData = new FormData(locationForm);
	let location = formData.get("location");
	let weatherData = await getWeatherData(location);

	if (location) {
		console.log(`Searching for weather in: ${location}`);

        clearPage();
        
		let header = document.createElement("header");
		let dateDiv = document.createElement("div");
		dateDiv.classList.add("date");
		header.appendChild(dateDiv);
		header.appendChild(locationForm);

		let dateTime = new Date(weatherData.days[0].datetime);
		dateDiv.textContent = dateTime.toLocaleDateString();

		let gifDiv = document.createElement("div");
		gifDiv.classList.add("gif");
		let conditionsArray = weatherData.days[0].conditions.split(",");
		setGif(gifDiv, conditionsArray[0]);
		console.log(conditionsArray[0]);

		let description = weatherData.days[0].description;
		let descriptionDiv = document.createElement("div");
		descriptionDiv.classList.add("description");
		descriptionDiv.textContent = description;

		let temperatureF = weatherData.days[0].temp;
		let temperatureDiv = document.createElement("div");
		temperatureDiv.classList.add("temperature");
		temperatureDiv.textContent = temperatureF + "℉";

		temperatureDiv.addEventListener("click", () => {
            if (temperatureDiv.textContent.includes("℉")) {
                let tempC = (temperatureF - 32) * 5 / 9;
                temperatureDiv.textContent = Math.round(tempC) + "℃";
            } else {
                temperatureDiv.textContent = Math.round(temperatureF) + "℉";
            }
        });

		let humidity = weatherData.days[0].humidity;
		let humidityDiv = document.createElement("div");
		humidityDiv.classList.add("humidity");
		humidityDiv.textContent = "Humidity: " + humidity;

		let windSpeed = weatherData.days[0].windspeed;
		let windSpeedDiv = document.createElement("div");
		windSpeedDiv.classList.add("wind-speed");
		windSpeedDiv.textContent = "Windspeed: " + windSpeed;

		let pressure = weatherData.days[0].pressure;
		let pressureDiv = document.createElement("div");
		pressureDiv.classList.add("pressure");
		pressureDiv.textContent = "Pressure: " + pressure;

		let cloudCover = weatherData.days[0].cloudcover;
		let cloudCoverDiv = document.createElement("div");
		cloudCoverDiv.classList.add("cloud-cover");
		cloudCoverDiv.textContent = "Cloud Cover: " + cloudCover + "%";

		let visibility = weatherData.days[0].visibility;
		let visibilityDiv = document.createElement("div");
		visibilityDiv.classList.add("visibility");
		visibilityDiv.textContent = "Visibility: " + visibility;

		let dataDiv = document.createElement("div");
		dataDiv.classList.add("data");
		dataDiv.appendChild(gifDiv);
		dataDiv.appendChild(descriptionDiv);
		dataDiv.appendChild(temperatureDiv);
		dataDiv.appendChild(humidityDiv);
		dataDiv.appendChild(windSpeedDiv);
		dataDiv.appendChild(pressureDiv);
		dataDiv.appendChild(cloudCoverDiv);
		dataDiv.appendChild(visibilityDiv);

		document.body.appendChild(header);
		document.body.appendChild(dataDiv);
	} else {
		alert("Please enter a location.");
	}
});

async function setGif(gifDiv, description) {
	let img = document.createElement("img");
	img.src = await getGif(description);
	img.style.width = "100%";
	img.style.height = "100%";
	img.style.objectFit = "cover";
	gifDiv.appendChild(img);
}

function clearPage() {
	let title = document.querySelector(".title");
	if (title) {
		title.remove();
	}

    let header = document.querySelector("header");
    if (header) {
        header.remove();
    }

    let data = document.querySelector(".data");
    if (data) {
        data.remove();
    }
}