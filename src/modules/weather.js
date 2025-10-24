import { capitalizeFirst } from "./utils";

const API_KEY = "FFKYFES5B3NRMUE2ESVD2WJMU";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const baseParams = new URLSearchParams();
baseParams.append("key", API_KEY);
baseParams.append("lang", "en");
baseParams.append("iconSet", "icons2");
baseParams.append("include", "current");
baseParams.append("elements", "temp,icon,conditions");

function getRequestUrl(location, isFahrenheit = false) {
  const unitParam = new URLSearchParams();
  const unitGroup = isFahrenheit ? "us" : "metric";
  unitParam.append("unitGroup", unitGroup);
  return `${BASE_URL}/${location}?${baseParams}&${unitParam}`;
}

async function getWeatherData(queryLocation, isFahrenheit) {
  const response = await fetch(getRequestUrl(queryLocation, isFahrenheit));
  const data = await response.json();
  const {
    resolvedAddress: location,
    currentConditions: { icon: iconId, conditions, temp: temperature },
  } = data;
  return {
    temperature,
    conditions,
    iconId,
    location: capitalizeFirst(location),
  };
}

export { getWeatherData };

