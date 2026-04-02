import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const currentUserRole = localStorage.getItem("currentUserRole") || "";

  return (
    <footer className="footer" id="contacts">
      <div className="container footer-inner">
        <div className="footer-col">
          <h3>SteppeUya</h3>
          <p>
            Удобный сервис аренды жилья по всему Казахстану.
            Найди свой идеальный дом быстро и просто.
          </p>
        </div>

        <div className="footer-col">
          <h4>Навигация</h4>
          <Link to="/">Главная</Link>
          <Link to="/catalog">Жильё</Link>

          {!isAuth && (
            <>
              <Link to="/login">Войти</Link>
              <Link to="/register">Регистрация</Link>
            </>
          )}

          {isAuth && currentUserRole === "user" && (
            <>
              <Link to="/profile">Профиль</Link>
              <Link to="/favorites">Избранное</Link>
              <Link to="/requests">Мои заявки</Link>
            </>
          )}

          {isAuth && currentUserRole === "landlord" && (
            <>
              <Link to="/profile">Профиль</Link>
              <Link to="/create-property">Добавить жильё</Link>
              <Link to="/my-properties">Мои квартиры</Link>
              <Link to="/requests">Заявки</Link>
            </>
          )}

          {isAuth && currentUserRole === "admin" && (
            <>
              <Link to="/profile">Профиль</Link>
              <Link to="/admin">Админ-панель</Link>
              <Link to="/requests">Все заявки</Link>
            </>
          )}
        </div>

        <div className="footer-col">
          <h4>Поддержка</h4>
          <a href="mailto:steppeuya@gmail.com">steppeuya@gmail.com</a>
          <a href="tel:+77770000000">+7 777 000 00 00</a>
          <a href="/">Политика конфиденциальности</a>
        </div>

        <div className="footer-col">
          <h4>Контакты</h4>
          <p>Астана, Казахстан</p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href="https://wa.me/77770000000" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} SteppeUya — Все права защищены
      </div>
    </footer>
  );
}

export default Footer;