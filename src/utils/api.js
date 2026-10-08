const GEO = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST = "https://api.open-meteo.com/v1/forecast";

export async function searchCities(name) {
  const url = `${GEO}?name=${encodeURIComponent(name)}&count=5&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Shaharlarni qidirib bo'lmadi");
  const data = await res.json();
  return (data.results || []).map((r) => ({
    name: r.name,
    country: r.country || "",
    admin: r.admin1 || "",
    lat: r.latitude,
    lon: r.longitude,
  }));
}

export async function getWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day,surface_pressure",
    hourly: "temperature_2m,weather_code,is_day,precipitation_probability",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "7",
  });
  const res = await fetch(`${FORECAST}?${params}`);
  if (!res.ok) throw new Error("Ob-havo ma'lumotini olib bo'lmadi");
  return res.json();
}
