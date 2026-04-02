import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Card({ property }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.some((item) => item.id === property.id);
    setIsFavorite(exists);
  }, [property.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let updatedFavorites = [];

    if (favorites.some((item) => item.id === property.id)) {
      updatedFavorites = favorites.filter((item) => item.id !== property.id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, property];
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <article className="property-card">
      <div className="property-card__image-wrapper">
        <img
          src={property.image}
          alt={property.title}
          className="property-card__image"
        />

        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={toggleFavorite}
          type="button"
        >
          ♥
        </button>
      </div>

      <div className="property-card__body">
        <h3>{property.title}</h3>
        <p>{property.type}</p>
        <p>{property.city}</p>
        <p className="property-card__price">{property.price} тг/сутки</p>
        <p className="property-card__rating">{"★".repeat(property.rating)}</p>

        <Link to={`/property/${property.id}`} className="property-card__link">
          Подробнее
        </Link>
      </div>
    </article>
  );
}

export default Card;