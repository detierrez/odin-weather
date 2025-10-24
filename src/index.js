import "modern-normalize";
import "./css/reset.css";
import "./css/base.css";
import { getWeatherData } from "./modules/weather";
import { getIcon } from "./modules/utils";

let currentQuery = "london";
let isFahrenheit = false;

const unit = document.querySelector(".unit");
unit.dataset.isFahrenheit = isFahrenheit;
unit.addEventListener("click", onClick);

const search = document.querySelector(".search");
search.addEventListener("keydown", onEnterPress);

updateWeatherDisplay();

async function onClick(event) {
  isFahrenheit = !(event.target.dataset.isFahrenheit === "true");
  event.target.dataset.isFahrenheit = isFahrenheit;

  await updateWeatherDisplay();
  event.target.textContent = isFahrenheit ? "°F" : "°C";
}

async function onEnterPress(event) {
  if (event.key === "Enter") {
    currentQuery = event.target.value;
    resetInput(event.target);
    updateWeatherDisplay();
  }
}

async function updateWeatherDisplay() {
  await setLoadingDisplay();
  try {
    const { location, temperature, conditions, iconId } = await getWeatherData(
      currentQuery,
      isFahrenheit,
    );
    setWeatherDisplay(
      location,
      temperature,
      conditions,
      `weather/${iconId}.svg`,
    );
  } catch (e) {
      console.log(e)
      setErrorDisplay();
  }
}

function resetInput(input) {
  input.value = "";
  input.blur();
}

async function setLoadingDisplay() {
  setWeatherDisplay("-", "-", "-", "loading.svg");
}

async function setErrorDisplay() {
  setWeatherDisplay("Not found!", "-", "-", "cross.svg");
}

async function setWeatherDisplay(location, temperature, conditions, iconPath) {
  const locationEl = document.querySelector(".location");
  const temperatureEl = document.querySelector(".temperature");
  const conditionsEl = document.querySelector(".conditions");
  const img = document.querySelector("img");
  await setIcon(img, iconPath);
  setText(locationEl, location);
  setText(temperatureEl, temperature);
  setText(conditionsEl, conditions);
}

async function setIcon(img, iconPath) {
  img.src = await getIcon(iconPath);
}

function setText(element, text) {
  element.textContent = text;
}
