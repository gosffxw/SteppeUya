import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/header.css";

function Header() {
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("isAuth") === "true";
  const currentUserName = localStorage.getItem("currentUserName") || "Гость";
  const currentUserRole = localStorage.getItem("currentUserRole") || "";
  const firstLetter = currentUserName.trim().charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUserName");
    localStorage.removeItem("currentUserRole");
    localStorage.removeItem("currentUserId");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <img src={logo} alt="SteppeUya logo" className="brand-logo" />
          <div className="brand-text-wrap">
            <span className="brand-text">SteppeUya</span>
            <span className="brand-subtitle">rental platform</span>
          </div>
        </Link>

       <nav className="nav">
  <Link to="/">Главная</Link>
  <Link to="/catalog">Жильё</Link>
  <a href="#contacts">Контакты</a>

  {/* USER */}
  {isAuth && currentUserRole === "user" && (
    <>
      <Link to="/favorites">Избранное</Link>
      <Link to="/requests">Мои заявки</Link>
    </>
  )}

  {/* LANDLORD */}
  {isAuth && currentUserRole === "landlord" && (
    <>
      <Link to="/create-property">Добавить жильё</Link>
      <Link to="/my-properties">Мои квартиры</Link>
      <Link to="/requests">Заявки</Link>
    </>
  )}

  {/* ADMIN */}
  {isAuth && currentUserRole === "admin" && (
    <>
      <Link to="/admin">Админ-панель</Link>
      <Link to="/requests">Все заявки</Link>
    </>
  )}

  {isAuth ? (
    <>
      <Link to="/profile" className="profile-chip">
        <span className="profile-avatar">{firstLetter}</span>
        <span className="profile-name">{currentUserName}</span>
      </Link>

      <button className="logout-btn" onClick={handleLogout}>
        Выйти
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="ghost-link">
        Войти
      </Link>
      <Link to="/register" className="register-link">
        Зарегистрироваться
      </Link>
    </>
  )}
</nav>
      </div>
    </header>
  );
}

export default Header;