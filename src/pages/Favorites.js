import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
    };

    loadFavorites();
    window.addEventListener("storage", loadFavorites);

    return () => {
      window.removeEventListener("storage", loadFavorites);
    };
  }, []);

  return (
    <div className="page">
      <Header />

      <main className="container" style={{ padding: "40px 0" }}>
        <h1 className="section-title">Избранное</h1>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <h2>Пока ничего нет в избранном</h2>
            <p>Добавляй понравившиеся объявления, чтобы быстро к ним вернуться.</p>
          </div>
        ) : (
          <div className="catalog-grid">
            {favorites.map((property) => (
              <Card key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;