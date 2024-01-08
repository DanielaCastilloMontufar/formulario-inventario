import { useState, useEffect } from "react";
import { useUsers } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import { supabase } from "../utils/client";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Layout from "./Layout";

const ProductCardArea = () => {
  const [loading, setLoading] = useState(true);
  const [processProducts, setProcessProducts] = useState([]);
  const { getUser } = useUsers();
  const { getSessionAuth } = useLogin();
  const { area } = useParams();
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
    async function fetchUserProducts() {
      try {
        const { data, error } = await supabase
          .from("equipos")
          .select("*")
          .eq("area", area.toUpperCase());

        if (error) {
          console.error("Error fetching data:", error.message, error.details);
          return;
        }

        setProcessProducts(data);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }

    fetchUserProducts();
  }, [area]);

  return (
    <Layout>
      {loading && <Loading />}
      <div className="grid md:grid-cols-5 grid-cols-3 gap-8">
        {processProducts.map((product) => (
          <Link
            to={`/informacion/${product.id}`}
            key={product.id}
            className="flex flex-col gap-2 border border-zinc-300 p-5 hover:bg-zinc-100 transition-colors duration-200"
          >
            <img
              src={`/images/${
                product.image ? product.image[0] : "producto.jpeg"
              }`}
              alt={`${product.title}`}
              className="w-full aspect-square"
            />
            <h3 className="text-[#058237] font-bold text-lg text-wrap">
              {product.title}
            </h3>
            <h4 className="text-black font-semibold text-xs">{product.area}</h4>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default ProductCardArea;
