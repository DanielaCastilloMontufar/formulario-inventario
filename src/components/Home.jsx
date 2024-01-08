import { useEffect, useState } from "react";
import { supabase } from "../utils/client";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { getSessionAuth } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionAuth = async () => {
      const session = await getSessionAuth();
      if (session) {
        await getUser(session.id);
        setLoading(false);
      } else {
        navigate("/", { replace: true });
      }
    };
    sessionAuth();
  }, []);

  const getUser = async (id) => {
    const { error, data } = await supabase
      .from("users")
      .select()
      .eq(`id`, id)
      .single();
    if (error) throw error.message;
    setUserData(data);
  };
  
  return (
    <Layout>
      {loading && <Loading />}
      <div className="">
        <h1 className="text-[#058237] font-bold text-3xl">BIENVENIDO/A:</h1>
        <h1 className="text-black font-bold text-3xl">
          {userData && userData.name}
        </h1>
        <p className="mt-5 text-lg">
          Bienvenid@ al control de inventarios, revisa las diversas opciones a
          las que puedes ingresar:
        </p>
      </div>
      <div className="grid grid-cols-5 gap-5 mt-10">
        <Link
          to="/perfil"
          className="bg-[#058237] uppercase text-white text-lg text-center py-5 rounded-lg hover:text-white hover:bg-[#005121] transition-colors duration-300"
        >
          perfil
        </Link>
        <Link
          to="/areas"
          className="bg-[#058237] uppercase text-white text-lg text-center py-5 rounded-lg hover:text-white hover:bg-[#005121] transition-colors duration-300"
        >
          áreas
        </Link>
        {userData && userData.role === "admin" && (
          <Link
            to="/dashboard"
            className="bg-[#058237] uppercase text-white text-lg text-center py-5 rounded-lg hover:text-white hover:bg-[#005121] transition-colors duration-300"
          >
            dashboard
          </Link>
        )}
        {userData && userData.role === "admin" && (
          <Link
            to="/equipos"
            className="bg-[#058237] uppercase text-white text-lg text-center py-5 rounded-lg hover:text-white hover:bg-[#005121] transition-colors duration-300"
          >
            equipos
          </Link>
        )}
        {userData && userData.role === "admin" && (
          <Link
            to="/usuarios"
            className="bg-[#058237] uppercase text-white text-lg text-center py-5 rounded-lg hover:text-white hover:bg-[#005121] transition-colors duration-300"
          >
            usuarios
          </Link>
        )}
      </div>
    </Layout>
  );
};
export default HomePage;
