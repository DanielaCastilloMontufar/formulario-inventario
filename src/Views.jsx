import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import PerfilPage from "./components/Perfil";
import HomePage from "./components/Home";
import Areas from "./components/Areas";
import Dashboard from "./components/Dashboard";
import Equipos from "./components/Equipos";
import Usuarios from "./components/Usuarios";
import ProductDetailPage from "./components/informacion/ProductDetailPage";
import Login from "./components/LoginForm";
import EquipmentForm from "./components/EquipmentForm";
import UserForm from "./components/UserForm";
import ProductCardArea from "./components/ProductCardArea";

const Views = () => {
  return (
    <Routes>
      {/* <Route path="/ingresar" index element={<SignIn />} /> */}
      <Route path="/" index element={<Login />} />
      {/* <Route element={<ProtectedRoutes />}> */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/producto/:area" element={<ProductCardArea />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/equipos" element={<Equipos />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route exact path="/informacion/:slug" element={<ProductDetailPage />} />
      {/* <Route exact path="/product-list/:area" element={<ProductListPage />} /> */}
      <Route path="/formulario-equipo" element={<EquipmentForm />} />
      <Route path="/formulario-usuarios" element={<UserForm />} />

      <Route path="*" element={<NotFound />} />
      {/* </Route> */}
    </Routes>
  );
};

export default Views;
