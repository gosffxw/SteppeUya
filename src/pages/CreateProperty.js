import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/auth.css";

function CreateProperty() {
  const navigate = useNavigate();

  const role = localStorage.getItem("currentUserRole");
  const ownerId = Number(localStorage.getItem("currentUserId"));

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Астана");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Посуточная аренда");
  const [guests, setGuests] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setImage(reader.result); // base64 строка
  };

  reader.readAsDataURL(file);
};
  if (role !== "landlord") {
    return (
      <div className="page">
        <Header />
        <main className="auth-page">
          <div className="auth-form">
            <h1>Доступ запрещён</h1>
            <p>Только арендатор может добавлять квартиры.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !guests || !description || !address) {
      setError("Заполни все обязательные поля");
      setMessage("");
      return;
    }

    const savedProperties =
      JSON.parse(localStorage.getItem("customProperties")) || [];

    const newProperty = {
      id: Date.now(),
      ownerId: ownerId,
      title,
      city,
      price: Number(price),
      type,
      guests: Number(guests),
      image:
        image ||
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      description,
      address,
      rating: 5,
    };

    savedProperties.push(newProperty);
    localStorage.setItem("customProperties", JSON.stringify(savedProperties));

    setError("");
    setMessage("Объявление успешно создано");

    setTimeout(() => {
      navigate("/my-properties");
    }, 900);
  };

  return (
    <div className="page">
      <Header />

      <main className="auth-page">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Добавить квартиру</h1>

          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="Астана">Астана</option>
            <option value="Алматы">Алматы</option>
          </select>

          <input
            type="number"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {image && (
            <img
              src={image}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "16px",
                marginTop: "10px",
                maxHeight: "200px",
                objectFit: "cover",
              }}
            />
          )}
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Посуточная аренда">Посуточная аренда</option>
            <option value="Месячная аренда">Месячная аренда</option>
          </select>

          <input
            type="number"
            placeholder="Количество гостей"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />

          <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <input
        type="text"
        placeholder="Адрес"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{
              border: "none",
              borderRadius: "16px",
              padding: "14px",
              resize: "vertical",
              font: "inherit",
            }}
          />

          {error && <p className="form-error">{error}</p>}
          {message && <p className="form-success">{message}</p>}

          <button type="submit">Сохранить</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default CreateProperty;