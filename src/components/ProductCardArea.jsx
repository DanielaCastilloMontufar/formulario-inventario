import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { useUsers } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';
import { supabase } from '../utils/client';
import { useParams } from 'react-router-dom';

const ProductCardArea = () => {
  const [IsImageLoaded, setIsImageLoaded] = useState(false)
  const [isHovered, setisHovered] = useState(false);
  const [processProducts, setProcessProducts] = useState([]);
  const { userData, getUser } = useUsers();
  const navigate = useNavigate();
  const { user } = useLogin();
  let { area } = useParams();

  useEffect(() => {
    if (user) {
      // navigate("/perfil", { replace: true });
      getUser(user.id);
    }
    else {
      navigate("/login");
    }
  }, [user]);

  console.log("area",area);

  useEffect(() => {
    async function fetchUserProducts() {
      try {
        const { data, error } = await supabase
          .from('equipos')
          .select('*')
          .eq('area', area.toUpperCase());

        if (error) {
          console.error('Error fetching data:', error.message, error.details);
          return;
        }

        setProcessProducts(data);
        console.log("INFO PRODUCTS", data);
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }

    fetchUserProducts();
  }, [area]);

  const capitalizeFirstLetter = (text) => {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  return (
    <Grid container spacing={2}
      style={{ marginTop: 10 }}>
      {processProducts.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}
        >
          <Link href={`/informacion/${product.slug}`}>
            <Card
              onMouseEnter={() => setisHovered(true)}
              onMouseLeave={() => setisHovered(false)}
              sx={{
                borderRadius: '20px',
                display: 'flex'
              }}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  className='fadeIn'
                  image={product.image}
                  alt={product.title}
                  onLoad={() => setIsImageLoaded(true)}
                />

                <Box sx={{
                  mt: 1,
                  // display: isImageLoaded ? 'block' : 'none' 
                }} className='fadeIn'>
                  <Typography variant='h2' component='h2'>
                    {capitalizeFirstLetter(product.title)}
                  </Typography>
                  <Typography variant='h3' component='h3' paddingTop={1}>
                    {capitalizeFirstLetter(product.area)}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

ProductCardArea.propTypes = {
  processProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      attendant: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default ProductCardArea;

