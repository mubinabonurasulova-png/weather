import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { getWeather } from "./utils/api.js";
import { describe } from "./utils/weather.js";
import SearchBar from "./components/SearchBar.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Hourly from "./components/Hourly.jsx";
import Forecast from "./components/Forecast.jsx";

const DEFAULT_PLACE = { name: "Tashkent", country: "Uzbekistan", admin: "", lat: 41.2995, lon: 69.2401 };

export default function App() {
  const [place, setPlace] = useLocalStorage("mubi-weather-place", DEFAULT_PLACE);
  const [recent, setRecent] = useLocalStorage("mubi-weather-recent", []);
  const [unit, setUnit] = useLocalStorage("mubi-weather-unit", "C");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await getWeather(place.lat, place.lon));
    } catch (e) {
      setError(e.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }, [place]);

  useEffect(() => {
    load();
  }, [load]);

  // Ob-havoga qarab fon rangi o'zgaradi
  useEffect(() => {
    const mood = data ? describe(data.current.weather_code, data.current.is_day).mood : "clear";
    const night = data ? !data.current.is_day : false;
    document.body.dataset.mood = mood;
    document.body.dataset.night = night ? "1" : "0";
  }, [data]);

  const selectCity = (city) => {
    setPlace(city);
    setRecent((prev) =>
      [city, ...prev.filter((c) => !(c.lat === city.lat && c.lon === city.lon))].slice(0, 5)
    );
  };

  const locate = () => {
    if (!navigator.geolocation) {
      setError("Brauzeringiz joylashuvni qo'llamaydi");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setPlace({
          name: "Mening joylashuvim",
          country: "",
          admin: "",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => {
        setLocating(false);
        setError("Joylashuvga ruxsat berilmadi. Brauzer sozlamalaridan ruxsat bering.");
      },
      { timeout: 10000 }
    );
  };

  return (
    <main>
      <header className="top">
        <h1>Ob-havo</h1>
        <div className="unit" role="group" aria-label="Harorat birligi">
          {["C", "F"].map((u) => (
            <button key={u} type="button" aria-pressed={unit === u} onClick={() => setUnit(u)}>
              °{u}
            </button>
          ))}
        </div>
      </header>

      <SearchBar onSelect={selectCity} onLocate={locate} locating={locating} />

      {recent.length > 0 && (
        <div className="recent" aria-label="Oxirgi qidirilganlar">
          {recent.map((c) => (
            <button key={`${c.lat}-${c.lon}`} type="button" onClick={() => setPlace(c)}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="panel error" role="alert">
          <p>{error}</p>
          <button type="button" className="retry" onClick={load}>Qayta urinish</button>
        </div>
      )}

      {loading && !data && <div className="panel skeleton">Yuklanmoqda…</div>}

      {data && (
        <div className={loading ? "content is-loading" : "content"}>
          <CurrentWeather place={place} data={data} unit={unit} />
          <Hourly data={data} unit={unit} />
          <Forecast data={data} unit={unit} />
        </div>
      )}

      <footer className="credit">Ma'lumot: Open-Meteo.com</footer>
    </main>
  );
}
