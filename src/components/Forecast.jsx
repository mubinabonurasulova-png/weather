import { dayName, describe, hhmm, toUnit } from "../utils/weather.js";

export default function Forecast({ data, unit }) {
  const d = data.daily;
  const min = Math.min(...d.temperature_2m_min);
  const max = Math.max(...d.temperature_2m_max);
  const span = max - min || 1;

  return (
    <section className="panel">
      <h3>7 kunlik prognoz</h3>
      <ul className="daily">
        {d.time.map((date, i) => {
          const info = describe(d.weather_code[i]);
          const left = ((d.temperature_2m_min[i] - min) / span) * 100;
          const width = ((d.temperature_2m_max[i] - d.temperature_2m_min[i]) / span) * 100;
          return (
            <li key={date}>
              <span className="d-name">{dayName(date, i)}</span>
              <span className="d-icon" title={info.label}>{info.icon}</span>
              <span className="d-min">{toUnit(d.temperature_2m_min[i], unit)}°</span>
              <span className="bar" aria-hidden="true">
                <i style={{ left: `${left}%`, width: `${Math.max(width, 8)}%` }} />
              </span>
              <span className="d-max">{toUnit(d.temperature_2m_max[i], unit)}°</span>
            </li>
          );
        })}
      </ul>
      <p className="sun muted">
        🌅 Quyosh chiqishi {hhmm(d.sunrise[0])} · 🌇 Botishi {hhmm(d.sunset[0])}
      </p>
    </section>
  );
}
