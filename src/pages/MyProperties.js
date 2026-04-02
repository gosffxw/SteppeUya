import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyProperties() {
  const role = localStorage.getItem("currentUserRole");
  const currentUserId = Number(localStorage.getItem("currentUserId"));
  const [myProperties, setMyProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProperties =
      JSON.parse(localStorage.getItem("customProperties")) || [];

    const filteredProperties = savedProperties.filter(
      (item) => Number(item.ownerId) === Number(currentUserId)
    );

    setMyProperties(filteredProperties);
  }, [currentUserId]);

  const handleDelete = (id) => {
    const savedProperties =
      JSON.parse(localStorage.getItem("customProperties")) || [];

    const updatedProperties = savedProperties.filter(
      (item) => item.id !== id
    );

    localStorage.setItem("customProperties", JSON.stringify(updatedProperties));

    const filteredProperties = updatedProperties.filter(
      (item) => Number(item.ownerId) === Number(currentUserId)
    );

    setMyProperties(filteredProperties);
  };

  if (role !== "landlord") {
    return (
      <div className="page">
        <Header />
        <main className="container" style={{ padding: "40px 0" }}>
          <div className="empty-state">
            <h2>Доступ запрещён</h2>
            <p>Эта страница доступна только арендатору.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <main className="container" style={{ padding: "40px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <h1 className="section-title" style={{ marginBottom: 0 }}>
            Мои квартиры
          </h1>

          <button
            className="btn-primary"
            onClick={() => navigate("/create-property")}
          >
            Добавить новую квартиру
          </button>
        </div>

        {myProperties.length === 0 ? (
          <div className="empty-state">
            <h2>У тебя пока нет объявлений</h2>
            <p>Добавь свою первую квартиру через страницу “Добавить жильё”.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            {myProperties.map((property) => (
              <div
                key={property.id}
                style={{
                  background: "var(--surface)",
                  borderRadius: "24px",
                  padding: "24px",
                  boxShadow: "var(--shadow)",
                }}
              >
                <h2>{property.title}</h2>
                <p>Город: {property.city}</p>
                <p>Цена: {property.price} тг</p>
                <p>Тип: {property.type}</p>
                <p>Гостей: {property.guests}</p>
                <p>Адрес: {property.address}</p>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "16px",
                    flexWrap: "wrap",
                  }}
                >
<button
  className="btn-primary"
  onClick={() => navigate(`/edit-property/${property.id}`)}
>
  Редактировать
</button>
                  <button
                    className="profile-logout-secondary"
                    onClick={() => handleDelete(property.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MyProperties;