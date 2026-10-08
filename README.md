# Mubi Ob-havo

React + Vite da yozilgan ob-havo ilovasi. Ma'lumot Open-Meteo.com dan olinadi
(API kalit kerak emas, bepul).

## Imkoniyatlar
- Shahar qidirish (yozganda tavsiyalar chiqadi)
- Joriy ob-havo: harorat, hissiyot, namlik, shamol, bosim
- 24 soatlik va 7 kunlik prognoz
- Mening joylashuvim (📍 tugmasi)
- °C / °F almashtirish
- Oxirgi qidirilgan shaharlar va tanlovlar saqlanadi
- Ob-havoga qarab fon rangi o'zgaradi
- Mobil, planshet va kompyuterda ishlaydi

## Ishga tushirish
```bash
npm install
npm run dev
```

## Saytga joylash
```bash
npm run build
```
`dist/` papkasini Vercel yoki Netlify'ga yuklang, yoki GitHub'ga push qilib Vercel bilan ulang.

## Struktura
```
src/
  App.jsx
  index.css
  main.jsx
  hooks/useLocalStorage.js
  utils/api.js, weather.js
  components/ SearchBar, CurrentWeather, Hourly, Forecast
```
