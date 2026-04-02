import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import properties from "../data/properties";
import "../styles/home.css";

function Home() {
  return (
    <div className="page">
      <Header />

      <section className="home-hero container">
        <div className="home-hero__image">
          <div className="home-hero__bubble">
            <h1>SteppeUya — твой дом, где бы ты ни был</h1>
            <p>Удобный поиск жилья для посуточной и долгосрочной аренды</p>
          </div>
        </div>

        <SearchBar />
      </section>

      <section className="container popular-section">
        <div className="popular-section__head">
          <h2>Популярное жильё</h2>
          <a href="/catalog" className="btn-secondary">
            Смотреть всё
          </a>
        </div>

        <div className="properties-grid">
          {properties.slice(0, 3).map((property) => (
            <Card key={property.id} property={property} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;