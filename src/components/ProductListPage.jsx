import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCardArea'; 
import { supabase } from '../utils/client';
import { useLogin } from '../context/LoginContext';
import { useUsers } from '../context/UserContext';

const ProductListPage = () => {
  const [processProducts, setProcessProducts] = useState([]);
  const { area } = useParams();
  const navigate = useNavigate();
  const { userData, getUser } = useUsers();
  const { user } = useLogin();

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
      async function fetchProductsByArea() {
        try {
          const { data, error } = await supabase
            .from('equipos')
            .select('*')
            .eq('area', area.toUpperCase()); // Convertir area a mayúsculas
    
          if (error) {
            console.error('Error fetching data:', error.message, error.details);
            return;
          }
    
          console.log("EQUIPOS", data);
          setProcessProducts(data);
          console.log("EQUIPOS2", data);
        } catch (error) {
          console.error('Unexpected error:', error);
        }
      }
    
      fetchProductsByArea();
    }, [area]);

  return (
    <div>
      <Typography variant='h1' component='h1' color="#058237" marginTop={15}>
        Productos en el área: 
      </Typography>
      <Typography variant='h1' component='h1' color="#000" textTransform={'uppercase'}>
        {area}
      </Typography>
      <Grid container spacing={2}>
        {processProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </div>
  );
};

export default ProductListPage;
