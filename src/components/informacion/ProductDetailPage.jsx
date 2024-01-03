// ProductDetailPage.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../utils/client"; // Asegúrate de importar tu configuración de Supabase
import { Box, Grid, Typography } from "@mui/material";
import { ProductSlideshow } from "../ProductSlideshow";
import Barcode from 'react-barcode';
import { useUsers } from "../../context/UserContext";
import { useLogin } from "../../context/LoginContext";
// import { data } from "autoprefixer";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { userData, getUser } = useUsers();
    // const [usuario, setUsuario] = useState(null)
    const navigate = useNavigate();
    const { user } = useLogin();

    console.log(user)

    useEffect(() => {
        if (user) {
            // navigate("/areas", { replace: true });
            getUser(user.id);
        }
        else {
          navigate("/login");
        }
    }, [user])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('equipos')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error("Error fetching product:", error);
        } else {
          setProduct(data);
        }
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
    <Grid container spacing={3} marginTop={15}>
      <Grid item xs={12} sm={7}>
        {Array.isArray(product.images) && product.images.length > 0 ? (
          <ProductSlideshow images={product.images} />
        ) : (
          <div>No hay imágenes disponibles</div>
        )}

      </Grid>
      <Grid item xs={12} sm={5}>
        <Typography variant='h1' component='h1'>{product.title}</Typography>
        <Typography variant='subtitle1' component='h2'>{product.area}</Typography>
        <Box display='flex'>
          <Typography variant='subtitle1' component='h2' sx={{ mr: 1 }}>Encargado/a: </Typography>
          <Typography variant='subtitle1' fontWeight={400}>{product.attendant}</Typography>
        </Box>
        <Grid container spacing={2} marginTop={1}>
          <Grid item xs={10} sm={6}>
            <Box>
              <Typography variant='subtitle1'>Tipo de activo:</Typography>
              <Typography variant='subtitle1' fontWeight={400}>{product.active_type}</Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant='subtitle1'>Modelo:</Typography>
              <Typography variant='subtitle1' fontWeight={400}>{product.model}</Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography variant='subtitle1'>Medidas:</Typography>
              <Typography variant='subtitle1' fontWeight={400}>{product.measures}</Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography variant='subtitle1'>Constancia de uso:</Typography>
              <Typography variant='subtitle1' fontWeight={400}>{product.condition_use}</Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography variant='subtitle1'>Cantidad: </Typography>
              <Typography variant='subtitle1' fontWeight={400}>{product.quantity}</Typography>
            </Box>



          </Grid>

          <Grid item xs={10} sm={4}>
            <Box>
              <Typography variant='subtitle1'>Marca:</Typography>
              <Typography variant='subtitle1' fontWeight={400}>{product.brand}</Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant='subtitle1'>Número de serie:</Typography>
              <Typography variant='subtitle1' fontWeight={400}>{product.serial}</Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography variant='subtitle1'>Color:</Typography>
              <Typography variant='subtitle1' fontWeight={400}>{product.color}</Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography variant='subtitle1'>Estado:</Typography>
              <Typography variant='subtitle1' fontWeight={400}>{product.state}</Typography>
            </Box>


            <Box sx={{ mt: 1 }}>
              <Typography variant='subtitle1'>Fecha de compra:</Typography>
              <Typography variant='subtitle1' fontWeight={400}>
                {new Date(product.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }).replace(/^\w/, (c) => c.toUpperCase())}
              </Typography>
            </Box>

          </Grid>

        </Grid>
        <Grid marginTop={5}>
          <Barcode value={product.id} width={1.2} height={80} background="#b2eab8"/>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default ProductDetailPage;
