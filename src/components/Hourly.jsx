import { describe, hhmm, toUnit } from "../utils/weather.js";

export default function Hourly({ data, unit }) {
  const h = data.hourly;
  const nowHour = data.current.time.slice(0, 13) + ":00";
  let start = h.time.findIndex((t) => t >= nowHour);
  if (start < 0) start = 0;
  const idx = Array.from({ length: 24 }, (_, i) => start + i).filter((i) => i < h.time.length);

  return (
    <section className="panel">
      <h3>Soatlik prognoz</h3>
      <ul className="hourly">
        {idx.map((i, n) => {
          const info = describe(h.weather_code[i], h.is_day[i]);
          const rain = h.precipitation_probability[i];
          return (
            <li key={h.time[i]}>
              <span className="muted">{n === 0 ? "Hozir" : hhmm(h.time[i])}</span>
              <span className="h-icon" aria-hidden="true">{info.icon}</span>
              <b>{toUnit(h.temperature_2m[i], unit)}°</b>
              <span className="rain">{rain > 0 ? `${rain}%` : "\u00A0"}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
