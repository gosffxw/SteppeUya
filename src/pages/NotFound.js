import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <div className="page">
      <Header />

      <main className="container" style={{ padding: "60px 0" }}>
        <div className="empty-state">
          <h1 style={{ fontSize: "56px", marginBottom: "12px" }}>404</h1>
          <h2 style={{ marginBottom: "12px" }}>Страница не найдена</h2>
          <p style={{ marginBottom: "24px" }}>
            Такой страницы не существует или она была перемещена.
          </p>

          <Link to="/" className="btn-primary">
            Вернуться на главную
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;