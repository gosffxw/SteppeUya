import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/auth.css";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("currentUserRole");
  const currentUserId = Number(localStorage.getItem("currentUserId"));

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Астана");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Посуточная аренда");
  const [guests, setGuests] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setImage(reader.result);
  };

  reader.readAsDataURL(file);
};
  useEffect(() => {
    const savedProperties =
      JSON.parse(localStorage.getItem("customProperties")) || [];

    const property = savedProperties.find(
      (item) =>
        Number(item.id) === Number(id) &&
        Number(item.ownerId) === Number(currentUserId)
    );

    if (!property) {
      return;
    }

    setTitle(property.title || "");
    setCity(property.city || "Астана");
    setPrice(property.price || "");
    setType(property.type || "Посуточная аренда");
    setGuests(property.guests || "");
    setImage(property.image || "");
    setDescription(property.description || "");
    setAddress(property.address || "");
  }, [id, currentUserId]);

  if (role !== "landlord") {
    return (
      <div className="page">
        <Header />
        <main className="auth-page">
          <div className="auth-form">
            <h1>Доступ запрещён</h1>
            <p>Редактировать объявления может только арендатор.</p>
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
      setSuccess("");
      return;
    }

    const savedProperties =
      JSON.parse(localStorage.getItem("customProperties")) || [];

    const updatedProperties = savedProperties.map((item) => {
      if (
        Number(item.id) === Number(id) &&
        Number(item.ownerId) === Number(currentUserId)
      ) {
        return {
          ...item,
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
        };
      }

      return item;
    });

    localStorage.setItem("customProperties", JSON.stringify(updatedProperties));

    setError("");
    setSuccess("Объявление успешно обновлено");

    setTimeout(() => {
      navigate("/my-properties");
    }, 900);
  };

  return (
    <div className="page">
      <Header />

      <main className="auth-page">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Редактировать квартиру</h1>

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
            type="text"
            placeholder="Ссылка на фото"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
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
          {success && <p className="form-success">{success}</p>}

          <button type="submit">Сохранить изменения</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default EditProperty;