import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Property from "./pages/Property";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Requests from "./pages/Requests";
import CreateProperty from "./pages/CreateProperty";
import MyProperties from "./pages/MyProperties";
import AdminPanel from "./pages/AdminPanel";
import EditProperty from "./pages/EditProperty";
import "./styles/global.css";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/property/:id" element={<Property />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/requests" element={<Requests />} />

        <Route path="/create-property" element={<CreateProperty />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
        <Route path="/my-properties" element={<MyProperties />} />

        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;