import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/auth.css";
import FormError from "../components/FormError";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Заполни все поля");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) {
      setError("Такого пользователя не существует");
      return;
    }

    if (foundUser.password !== password) {
      setError("Неверный пароль");
      return;
    }

    localStorage.setItem("isAuth", "true");
    localStorage.setItem("currentUserName", foundUser.name);
    localStorage.setItem("currentUserRole", foundUser.role);
    localStorage.setItem("currentUserId", foundUser.id);

    setError("");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="page">
      <Header />

      <main className="auth-page">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Войти</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="form-error">{error}</p>}
          <FormError text={error} />
          <button type="submit">Войти</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default Login;