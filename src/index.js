import "./styles.css";

function getWeatherData(location) {
    const APIKEY = 'HS8MXV9HMAGD22G2Z7L4GJ8WZ';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${APIKEY}&contentType=json`;
	
    fetch(url, {mode: "cors",})
    .then(response => response.json());
}

function getGif(description) {
    const APIKEY = 'IKvLdvvFcNLjeyKWWEzt23h1Q8yWp4A2';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=/${description}`;
    
    fetch(url, {mode: "cors",})
    .then(resonse => resonse.json())
    .then(response => {
        let img = document.createElement("img");
        img.src = response.data[0].images.downsized.url;
        img.alt = description;
        return img;
    });
}