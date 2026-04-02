import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("isAuth") === "true";
  const currentUserId = Number(localStorage.getItem("currentUserId"));
  const currentUserRole = localStorage.getItem("currentUserRole");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((item) => Number(item.id) === Number(currentUserId));

  if (!isAuth || !user) {
    return (
      <div className="page">
        <Header />
        <main className="profile-page container">
          <div className="empty-state">
            <h2>Профиль недоступен</h2>
            <p>Сначала войди в аккаунт.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const firstLetter = user.name.trim().charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUserName");
    localStorage.removeItem("currentUserRole");
    localStorage.removeItem("currentUserId");
    navigate("/");
    window.location.reload();
  };

  const roleLabel =
    currentUserRole === "user"
      ? "Пользователь"
      : currentUserRole === "landlord"
      ? "Арендатор"
      : currentUserRole === "admin"
      ? "Администратор"
      : "Неизвестно";

  return (
    <div className="page">
      <Header />

      <main className="profile-page container">
        <section className="profile-card">
          <div className="profile-top">
            <div className="profile-big-avatar">{firstLetter}</div>

            <div>
              <h1>{user.name}</h1>
              <p className="profile-subtitle">Личный кабинет пользователя</p>
            </div>
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-item">
              <span>Имя</span>
              <strong>{user.name}</strong>
            </div>

            <div className="profile-info-item">
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div className="profile-info-item">
              <span>Статус</span>
              <strong>Авторизован</strong>
            </div>

            <div className="profile-info-item">
              <span>Роль</span>
              <strong>{roleLabel}</strong>
            </div>
          </div>

          <div className="profile-actions">
            {currentUserRole === "user" && (
              <button className="btn-primary" onClick={() => navigate("/catalog")}>
                Смотреть жильё
              </button>
            )}

            {currentUserRole === "landlord" && (
              <button
                className="btn-primary"
                onClick={() => navigate("/my-properties")}
              >
                Мои квартиры
              </button>
            )}

            {currentUserRole === "admin" && (
              <button className="btn-primary" onClick={() => navigate("/admin")}>
                Открыть админ-панель
              </button>
            )}

            <button className="profile-logout-secondary" onClick={handleLogout}>
              Выйти из аккаунта
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;