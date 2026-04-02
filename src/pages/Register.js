import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/auth.css";
import FormError from "../components/FormError";
import FormSuccess from "../components/FormSuccess";
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !repeatPassword) {
      setError("Заполни все поля");
      setSuccess("");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен быть минимум 6 символов");
      setSuccess("");
      return;
    }

    if (password !== repeatPassword) {
      setError("Пароли не совпадают");
      setSuccess("");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      setError("Пользователь с таким email уже существует");
      setSuccess("");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setError("");
    setSuccess("Регистрация прошла успешно");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="page">
      <Header />

      <main className="auth-page">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Регистрация</h1>

          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <input
            type="password"
            placeholder="Повтори пароль"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Пользователь</option>
            <option value="landlord">Арендатор</option>
          </select>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}
          <FormError text={error} />
          <FormSuccess text={success} />

          <button type="submit">Зарегистрироваться</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default Register;