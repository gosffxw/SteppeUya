import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import baseProperties from "../data/properties";
import "../styles/property.css";

function Property() {
  const { id } = useParams();

  const [rentPeriod, setRentPeriod] = useState("");
  const [guestsCount, setGuestsCount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    const customProperties =
      JSON.parse(localStorage.getItem("customProperties")) || [];
    setAllProperties([...baseProperties, ...customProperties]);
  }, []);

  const property = useMemo(() => {
    return allProperties.find((item) => item.id === Number(id));
  }, [allProperties, id]);

  if (!property) {
    return (
      <div className="page">
        <Header />
        <main className="container property-page">
          <div className="empty-state">
            <h2>Страница не найдена</h2>
            <p>Такого объекта не существует.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleRequest = () => {
    const currentUserId = Number(localStorage.getItem("currentUserId"));
    const currentUserRole = localStorage.getItem("currentUserRole");
    const currentUserName = localStorage.getItem("currentUserName");

    if (!localStorage.getItem("isAuth")) {
      setError("Сначала войди в аккаунт");
      setMessage("");
      return;
    }

    if (currentUserRole !== "user") {
      setError("Только пользователь может отправлять заявку на аренду");
      setMessage("");
      return;
    }

    if (!rentPeriod || !guestsCount) {
      setError("Заполни срок аренды и количество человек");
      setMessage("");
      return;
    }

    const request = {
      id: Date.now(),
      propertyId: property.id,
      propertyTitle: property.title,
      propertyOwnerId: property.ownerId || null,
      userId: currentUserId,
      userName: currentUserName,
      price: property.price,
      rentPeriod,
      guestsCount,
      createdAt: new Date().toLocaleString(),
      status: "Новая",
    };

    const existingRequests = JSON.parse(localStorage.getItem("requests")) || [];
    existingRequests.push(request);
    localStorage.setItem("requests", JSON.stringify(existingRequests));

    setError("");
    setMessage("Заявка успешно отправлена");
    setRentPeriod("");
    setGuestsCount("");
  };

  const handleContact = () => {
    setMessage("Запрос на связь с хозяином отправлен");
    setError("");
  };

  return (
    <div className="page">
      <Header />

      <main className="container property-page">
        <section className="property-main">
          <img
            src={property.image}
            alt={property.title}
            className="property-image"
          />

          <div className="property-info">
            <h1>{property.title}</h1>
            <p className="property-description">{property.description}</p>

            <div className="property-meta">
              <span>{property.city}</span>
              <span>{property.type}</span>
              <span>{property.guests} гостя</span>
              <span>{property.address}</span>
            </div>
          </div>
        </section>

        <aside className="property-sidebar">
          <div className="booking-card">
            <h2>{property.price} тг/сутки</h2>

            <input
              type="text"
              placeholder="Срок аренды"
              value={rentPeriod}
              onChange={(e) => setRentPeriod(e.target.value)}
            />

            <select
              value={guestsCount}
              onChange={(e) => setGuestsCount(e.target.value)}
            >
              <option value="">Количество человек</option>
              <option value="1">1 человек</option>
              <option value="2">2 человека</option>
              <option value="3">3 человека</option>
              <option value="4">4 человека</option>
            </select>

            {error && <p className="form-error">{error}</p>}
            {message && <p className="form-success">{message}</p>}

            <button onClick={handleRequest}>Отправить заявку</button>
            <button className="secondary-contact-btn" onClick={handleContact}>
              Связаться с хозяином
            </button>
          </div>

          <div className="map-block">
            <h3>Местоположение</h3>
            <div className="fake-map">
              <span>Карта</span>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default Property;