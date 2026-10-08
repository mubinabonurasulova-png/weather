// Open-Meteo weather code -> o'zbekcha matn, emoji va fon turi
const CODES = {
  0: ["Ochiq", "☀️", "clear"],
  1: ["Asosan ochiq", "🌤️", "clear"],
  2: ["Qisman bulutli", "⛅", "cloud"],
  3: ["Bulutli", "☁️", "cloud"],
  45: ["Tuman", "🌫️", "fog"],
  48: ["Qirovli tuman", "🌫️", "fog"],
  51: ["Mayda yomg'ir", "🌦️", "rain"],
  53: ["Mayda yomg'ir", "🌦️", "rain"],
  55: ["Mayda yomg'ir", "🌦️", "rain"],
  56: ["Muzli yomg'ir", "🌧️", "rain"],
  57: ["Muzli yomg'ir", "🌧️", "rain"],
  61: ["Yengil yomg'ir", "🌧️", "rain"],
  63: ["Yomg'ir", "🌧️", "rain"],
  65: ["Kuchli yomg'ir", "🌧️", "rain"],
  66: ["Muzli yomg'ir", "🌧️", "rain"],
  67: ["Muzli yomg'ir", "🌧️", "rain"],
  71: ["Yengil qor", "🌨️", "snow"],
  73: ["Qor", "🌨️", "snow"],
  75: ["Kuchli qor", "❄️", "snow"],
  77: ["Qor donalari", "🌨️", "snow"],
  80: ["Jala", "🌦️", "rain"],
  81: ["Jala", "🌧️", "rain"],
  82: ["Kuchli jala", "🌧️", "rain"],
  85: ["Qor jala", "🌨️", "snow"],
  86: ["Kuchli qor jala", "❄️", "snow"],
  95: ["Momaqaldiroq", "⛈️", "storm"],
  96: ["Do'l bilan momaqaldiroq", "⛈️", "storm"],
  99: ["Kuchli do'l bilan momaqaldiroq", "⛈️", "storm"],
};

export function describe(code, isDay = 1) {
  const [label, icon, mood] = CODES[code] || ["Noma'lum", "❓", "cloud"];
  const night = !isDay && (code === 0 || code === 1);
  return { label, icon: night ? "🌙" : icon, mood };
}

const DAYS = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];

export function dayName(dateStr, index) {
  if (index === 0) return "Bugun";
  if (index === 1) return "Ertaga";
  const [y, m, d] = dateStr.split("-").map(Number);
  return DAYS[new Date(y, m - 1, d).getDay()];
}

export const hhmm = (iso) => iso.slice(11, 16);

export function toUnit(celsius, unit) {
  const v = unit === "F" ? (celsius * 9) / 5 + 32 : celsius;
  return Math.round(v);
}

export function windDirection(deg) {
  const dirs = ["Shimol", "Shimoli-sharq", "Sharq", "Janubi-sharq", "Janub", "Janubi-g'arb", "G'arb", "Shimoli-g'arb"];
  return dirs[Math.round(deg / 45) % 8];
}
