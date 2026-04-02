import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function SearchBar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (city) {
      params.set("city", city);
    }

    if (guests) {
      params.set("guests", guests);
    }

    navigate(`/catalog?${params.toString()}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Поиск"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Местоположение</option>
        <option value="Астана">Астана</option>
        <option value="Алматы">Алматы</option>
      </select>

      <input type="date" />

      <select value={guests} onChange={(e) => setGuests(e.target.value)}>
        <option value="1">1 человек</option>
        <option value="2">2 человека</option>
        <option value="3">3 человека</option>
        <option value="4">4 человека</option>
      </select>

      <button type="submit">Найти</button>
    </form>
  );
}

export default SearchBar;