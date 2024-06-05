import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const foundOption = weatherOptions.find((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (!foundOption) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = foundOption;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition ? weatherOption.condition : ""
        }`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
