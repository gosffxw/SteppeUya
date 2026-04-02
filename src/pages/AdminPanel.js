import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import baseProperties from "../data/properties";

function AdminPanel() {
  const role = localStorage.getItem("currentUserRole");
  const currentUserId = Number(localStorage.getItem("currentUserId"));

  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [customProperties, setCustomProperties] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setRequests(JSON.parse(localStorage.getItem("requests")) || []);
    setCustomProperties(JSON.parse(localStorage.getItem("customProperties")) || []);
  }, []);

  const allProperties = useMemo(
    () => [...baseProperties, ...customProperties],
    [customProperties]
  );

  const handleDeleteUser = (userId) => {
    if (Number(userId) === Number(currentUserId)) return;

    const nextUsers = users.filter((user) => Number(user.id) !== Number(userId));
    localStorage.setItem("users", JSON.stringify(nextUsers));
    setUsers(nextUsers);

    const nextCustomProperties = customProperties.filter(
      (property) => Number(property.ownerId) !== Number(userId)
    );
    localStorage.setItem("customProperties", JSON.stringify(nextCustomProperties));
    setCustomProperties(nextCustomProperties);

    const nextRequests = requests.filter(
      (request) =>
        Number(request.userId) !== Number(userId) &&
        Number(request.propertyOwnerId) !== Number(userId)
    );
    localStorage.setItem("requests", JSON.stringify(nextRequests));
    setRequests(nextRequests);
  };

  const handleDeleteCustomProperty = (propertyId) => {
    const nextCustomProperties = customProperties.filter(
      (property) => Number(property.id) !== Number(propertyId)
    );
    localStorage.setItem("customProperties", JSON.stringify(nextCustomProperties));
    setCustomProperties(nextCustomProperties);

    const nextRequests = requests.filter(
      (request) => Number(request.propertyId) !== Number(propertyId)
    );
    localStorage.setItem("requests", JSON.stringify(nextRequests));
    setRequests(nextRequests);
  };

  if (role !== "admin") {
    return (
      <div className="page">
        <Header />
        <main className="container" style={{ padding: "40px 0" }}>
          <div className="empty-state">
            <h2>Доступ запрещён</h2>
            <p>Только администратор может открыть эту страницу.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <main className="container" style={{ padding: "40px 0", display: "grid", gap: "28px" }}>
        <h1 className="section-title">Админ-панель</h1>

        <section className="empty-state" style={{ textAlign: "left" }}>
          <h2 style={{ marginBottom: "16px" }}>Пользователи</h2>

          {users.length === 0 ? (
            <p>Пользователей нет</p>
          ) : (
            <div style={{ display: "grid", gap: "14px" }}>
              {users.map((user) => (
                <div
                  key={user.id}
                  style={{
                    background: "white",
                    borderRadius: "18px",
                    padding: "18px",
                    boxShadow: "0 6px 18px rgba(16,18,17,0.05)",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{user.name}</strong>
                    <div>{user.email}</div>
                    <div>Роль: {user.role}</div>
                  </div>

                  {Number(user.id) !== Number(currentUserId) ? (
                    <button
                      className="profile-logout-secondary"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Удалить пользователя
                    </button>
                  ) : (
                    <span style={{ color: "#7c7469" }}>Текущий админ</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="empty-state" style={{ textAlign: "left" }}>
          <h2 style={{ marginBottom: "16px" }}>Все заявки</h2>

          {requests.length === 0 ? (
            <p>Заявок нет</p>
          ) : (
            <div style={{ display: "grid", gap: "14px" }}>
              {requests.map((request) => (
                <div
                  key={request.id}
                  style={{
                    background: "white",
                    borderRadius: "18px",
                    padding: "18px",
                    boxShadow: "0 6px 18px rgba(16,18,17,0.05)",
                  }}
                >
                  <strong>{request.propertyTitle}</strong>
                  <div>Отправитель: {request.userName}</div>
                  <div>Цена: {request.price} тг/сутки</div>
                  <div>Срок аренды: {request.rentPeriod}</div>
                  <div>Количество человек: {request.guestsCount}</div>
                  <div>Статус: {request.status}</div>
                  <div>Дата: {request.createdAt}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="empty-state" style={{ textAlign: "left" }}>
          <h2 style={{ marginBottom: "16px" }}>Все квартиры</h2>

          {allProperties.length === 0 ? (
            <p>Квартир нет</p>
          ) : (
            <div style={{ display: "grid", gap: "14px" }}>
              {allProperties.map((property) => {
                const isCustom = customProperties.some(
                  (item) => Number(item.id) === Number(property.id)
                );

                return (
                  <div
                    key={property.id}
                    style={{
                      background: "white",
                      borderRadius: "18px",
                      padding: "18px",
                      boxShadow: "0 6px 18px rgba(16,18,17,0.05)",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "16px",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong>{property.title}</strong>
                      <div>{property.city}</div>
                      <div>{property.price} тг</div>
                      <div>{property.type}</div>
                    </div>

                    {isCustom ? (
                      <button
                        className="profile-logout-secondary"
                        onClick={() => handleDeleteCustomProperty(property.id)}
                      >
                        Удалить квартиру
                      </button>
                    ) : (
                      <span style={{ color: "#7c7469" }}>Базовая квартира</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminPanel;