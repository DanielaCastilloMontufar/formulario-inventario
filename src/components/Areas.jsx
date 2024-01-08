import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/client";
import { useLogin } from "../context/LoginContext";
import Layout from "./Layout";
import Loading from "./Loading";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [processArea, setProcessArea] = useState([]);
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
  
  useEffect(() => {
    if (userData !== null)
      getAreas();
  }, [userData])

  const getUser = async (id) => {
    const { error, data } = await supabase
    .from("users")
    .select()
    .eq(`id`, id)
    .single();
    if (error) throw error.message;
    setUserData(data);
  };
  
  const getAreas = async () => {
    try {
      if (userData.role !== undefined) {
        if (userData.role === "admin") {
          const { data, error } = await supabase
            .from("areas")
            .select(`name`);
          if (error) throw error;
          const areas = data.map((item) => {
            return {name: item.name };
          }
          );
          setProcessArea(areas);
        } else {
          const { data, error } = await supabase
            .from("area_users")
            .select(`areas(name)`)
            .eq("id_user", userData.id);
          if (error) throw error;
          const areas = data.map((item) => {
            return { name: item.areas.name };
          });
          setProcessArea(areas);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      {loading && <Loading />}
      <h1 className="text-[#058237] font-semibold text-3xl">ÁREAS</h1>
      <div className="grid grid-cols-4 gap-5 mt-10">
        {processArea.map((areaName, index) => (
          <div key={index} className="w-full">
            <a
              href={`/producto/${areaName.name}`}
              className="bg-[#058237] rounded-md p-5 text-white text-sm block text-center hover:bg-[#005121] hover:text-white transition-colors duration-300"
            >
              {areaName.name}
            </a>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CategoryPage;
