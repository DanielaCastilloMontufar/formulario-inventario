import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../utils/client";
import { ProductSlideshow } from "../ProductSlideshow";
import Barcode from "react-barcode";
import { useUsers } from "../../context/UserContext";
import { useLogin } from "../../context/LoginContext";
import Loading from "../Loading";
import Layout from "../Layout";

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { slug } = useParams();
  const { getUser } = useUsers();
  const { getSessionAuth } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionAuth = async () => {
      const session = await getSessionAuth();
      if (session) {
        await getUser(session.id);
      } else {
        navigate("/", { replace: true });
      }
    };
    sessionAuth();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("equipos")
          .select("*")
          .eq("id", slug)
          .single();

        if (error) {
          console.error("Error fetching product:", error);
        }
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="w-full p-5">
          {Array.isArray(product.images) && product.images.length > 0 ? (
            <ProductSlideshow images={product.images} />
          ) : (
            <img
              src={`/images/producto.jpeg`}
              alt={`${product.title}`}
              className="w-full aspect-square"
            />
          )}
        </div>
        <div className="w-full p-5">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <h3 className="text-lg font-medium">{product.area}</h3>
          <h4 className="text-sm font-medium">
            <strong>Encargado/a:</strong> {product.attendant}
          </h4>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Tipo de activo:</h5>
              <p className="text-sm font-medium">{product.active_type}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Modelo:</h5>
              <p className="text-sm font-medium">{product.model}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Marca:</h5>
              <p className="text-sm font-medium">{product.brand}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Número de serie:</h5>
              <p className="text-sm font-medium">{product.serial}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Color:</h5>
              <p className="text-sm font-medium">{product.color}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Estado:</h5>
              <p className="text-sm font-medium">{product.state}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Medidas:</h5>
              <p className="text-sm font-medium">{product.measures}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Constancia de uso:</h5>
              <p className="text-sm font-medium">{product.condition_use}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Cantidad:</h5>
              <p className="text-sm font-medium">{product.quantity}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Fecha de compra:</h5>
              <p className="text-sm font-medium">
                {new Date(product.created_at)
                  .toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                  })
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </p>
              <p>{product.created_at.split("T")[0]}</p>
            </div>
          </div>
          <div className="w-full mt-5">
            <Barcode
              value={product.id}
              width={0.9}
              height={80}
              background="#b2eab8"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
