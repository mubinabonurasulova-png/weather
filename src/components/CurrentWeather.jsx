import { describe, toUnit, windDirection } from "../utils/weather.js";

export default function CurrentWeather({ place, data, unit }) {
  const c = data.current;
  const info = describe(c.weather_code, c.is_day);
  const today = data.daily;

  return (
    <section className="panel current">
      <div className="current-top">
        <div>
          <h2>{place.name}</h2>
          <p className="muted">{[place.admin, place.country].filter(Boolean).join(", ")}</p>
        </div>
        <div className="big-icon" aria-hidden="true">{info.icon}</div>
      </div>

      <div className="temp-row">
        <span className="temp">{toUnit(c.temperature_2m, unit)}°</span>
        <div>
          <p className="cond">{info.label}</p>
          <p className="muted">
            Hissiyot: {toUnit(c.apparent_temperature, unit)}° · {toUnit(today.temperature_2m_min[0], unit)}° / {toUnit(today.temperature_2m_max[0], unit)}°
          </p>
        </div>
      </div>

      <dl className="stats">
        <div><dt>Namlik</dt><dd>{c.relative_humidity_2m}%</dd></div>
        <div><dt>Shamol</dt><dd>{Math.round(c.wind_speed_10m)} km/soat</dd></div>
        <div><dt>Yo'nalish</dt><dd>{windDirection(c.wind_direction_10m)}</dd></div>
        <div><dt>Bosim</dt><dd>{Math.round(c.surface_pressure * 0.750062)} mm</dd></div>
      </dl>
    </section>
  );
}
