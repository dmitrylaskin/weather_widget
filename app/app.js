window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".degree-section");
  let degreeSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=065ddd7deac84381473fec5c3f4b298e`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          
          const description = data.weather[0].description;
          const temperature = (data.main.temp - 273.15).toFixed(1);
          const name = data.name;
          const icon = data.weather[0].main;

          temperatureDegree.textContent = temperature;
          locationTimezone.textContent = name;
          temperatureDescription.textContent = description;

          
          setIcons(icon, document.querySelector(".icon"));

          degreeSection.addEventListener("click", () => {
            if (degreeSpan.textContent === "C") {
              degreeSpan.textContent = "F";
              temperatureDegree.textContent = (
                (temperature * 9) / 5 +
                32
              ).toFixed(1);
            } else {
              degreeSpan.textContent = "C";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });

    switch (icon) {
      case "Clouds":
        currentIcon = Skycons.CLOUDY;
        break;
      case "Rain":
        currentIcon = Skycons.RAIN;
        break;
      case "Snow":
        currentIcon = Skycons.SNOW;
        break;
      case "Clear":
        currentIcon = Skycons.CLEAR_DAY;
        break;
      case "Thunderstorm":
        currentIcon = Skycons.WIND;
        break;
      case "Fog":
        currentIcon = Skycons.FOG;
        break;

      default:
        break;
    }

    skycons.play();
    
    return skycons.set(iconID, currentIcon);
  }
});
