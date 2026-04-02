import Header from "../components/Header";
import Footer from "../components/Footer";

function Requests() {
  const role = localStorage.getItem("currentUserRole");
  const currentUserId = Number(localStorage.getItem("currentUserId"));
  const requests = JSON.parse(localStorage.getItem("requests")) || [];

  let filteredRequests = [];

  if (role === "user") {
    filteredRequests = requests.filter(
      (request) => request.userId === currentUserId
    );
  } else if (role === "landlord") {
    filteredRequests = requests.filter(
      (request) => request.propertyOwnerId === currentUserId
    );
  } else if (role === "admin") {
    filteredRequests = requests;
  }

  const pageTitle =
    role === "user"
      ? "Мои заявки"
      : role === "landlord"
      ? "Заявки на мои квартиры"
      : "Все заявки";

  return (
    <div className="page">
      <Header />

      <main className="container" style={{ padding: "40px 0" }}>
        <h1 className="section-title">{pageTitle}</h1>

        {filteredRequests.length === 0 ? (
          <div className="empty-state">
            <h2>Заявок пока нет</h2>
            <p>Когда появятся заявки, они будут отображаться здесь.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                style={{
                  background: "var(--surface)",
                  borderRadius: "24px",
                  padding: "24px",
                  boxShadow: "var(--shadow)",
                }}
              >
                <h2 style={{ marginBottom: "10px" }}>{request.propertyTitle}</h2>
                <p style={{ marginBottom: "8px" }}>Цена: {request.price} тг/сутки</p>
                <p style={{ marginBottom: "8px" }}>Срок аренды: {request.rentPeriod}</p>
                <p style={{ marginBottom: "8px" }}>Количество человек: {request.guestsCount}</p>
                <p style={{ marginBottom: "8px" }}>Статус: {request.status}</p>

                {(role === "landlord" || role === "admin") && (
                  <p style={{ marginBottom: "8px" }}>
                    Отправитель: {request.userName}
                  </p>
                )}

                <p>Дата заявки: {request.createdAt}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Requests;