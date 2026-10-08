import { useEffect, useRef, useState } from "react";
import { searchCities } from "../utils/api.js";

export default function SearchBar({ onSelect, onLocate, locating }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const boxRef = useRef(null);

  // Yozishni to'xtatgandan keyin qidiradi (debounce)
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setMsg("");
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const list = await searchCities(q);
        setResults(list);
        setMsg(list.length ? "" : "Shahar topilmadi");
        setOpen(true);
      } catch {
        setMsg("Qidirishda xatolik. Internetni tekshiring.");
        setOpen(true);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  // Tashqariga bosilganda yopiladi
  useEffect(() => {
    const close = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  const pick = (city) => {
    onSelect(city);
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();
    if (results[0]) pick(results[0]);
  };

  return (
    <div className="search" ref={boxRef}>
      <form onSubmit={submit} className="search-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Shahar nomini yozing (masalan: Samarkand)"
          aria-label="Shahar qidirish"
          autoComplete="off"
        />
        <button type="button" className="locate" onClick={onLocate} disabled={locating} aria-label="Mening joylashuvim" title="Mening joylashuvim">
          {locating ? "…" : "📍"}
        </button>
      </form>

      {open && (results.length > 0 || msg) && (
        <ul className="suggest">
          {msg && <li className="suggest-msg">{msg}</li>}
          {results.map((c) => (
            <li key={`${c.lat}-${c.lon}`}>
              <button type="button" onClick={() => pick(c)}>
                <b>{c.name}</b>
                <span>{[c.admin, c.country].filter(Boolean).join(", ")}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
