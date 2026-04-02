import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import baseProperties from "../data/properties";
import "../styles/catalog.css";

function Catalog() {
  const [searchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlCity = searchParams.get("city") || "Все";
  const urlGuests = searchParams.get("guests") || "Все";

  const [typeFilter, setTypeFilter] = useState("Все");
  const [cityFilter, setCityFilter] = useState(urlCity);
  const [guestFilter, setGuestFilter] = useState(urlGuests);
  const [searchValue, setSearchValue] = useState(urlSearch);
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    const customProperties =
      JSON.parse(localStorage.getItem("customProperties")) || [];
    setAllProperties([...baseProperties, ...customProperties]);
  }, []);

  const filteredProperties = useMemo(() => {
    return allProperties.filter((item) => {
      const matchSearch =
        searchValue.trim() === "" ||
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description.toLowerCase().includes(searchValue.toLowerCase());

      const matchType = typeFilter === "Все" || item.type === typeFilter;
      const matchCity =
        cityFilter === "Все" || cityFilter === "" || item.city === cityFilter;
      const matchGuests =
        guestFilter === "Все" ||
        String(item.guests) === String(guestFilter) ||
        item.guests >= Number(guestFilter);

      return matchSearch && matchType && matchCity && matchGuests;
    });
  }, [allProperties, searchValue, typeFilter, cityFilter, guestFilter]);

  return (
    <div className="page">
      <Header />

      <main className="container catalog-page">
        <h1 className="section-title">Доступные предложения</h1>

        <div className="catalog-top-search">
          <input
            type="text"
            placeholder="Поиск по названию, городу, описанию"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            <option value="Все">Все города</option>
            <option value="Астана">Астана</option>
            <option value="Алматы">Алматы</option>
          </select>

          <select value={guestFilter} onChange={(e) => setGuestFilter(e.target.value)}>
            <option value="Все">Любое кол-во гостей</option>
            <option value="1">1+ человек</option>
            <option value="2">2+ человека</option>
            <option value="3">3+ человека</option>
            <option value="4">4+ человека</option>
          </select>
        </div>

        <div className="filter-bar">
          <button
            className={typeFilter === "Все" ? "active" : ""}
            onClick={() => setTypeFilter("Все")}
          >
            Все
          </button>

          <button
            className={typeFilter === "Посуточная аренда" ? "active" : ""}
            onClick={() => setTypeFilter("Посуточная аренда")}
          >
            Посуточно
          </button>

          <button
            className={typeFilter === "Месячная аренда" ? "active" : ""}
            onClick={() => setTypeFilter("Месячная аренда")}
          >
            Месячно
          </button>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="catalog-grid">
            {filteredProperties.map((property) => (
              <Card key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>Ничего не найдено</h2>
            <p>Попробуй изменить параметры поиска или фильтры.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Catalog;