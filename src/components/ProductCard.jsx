// import { useState, useMemo, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
// import { useUsers } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';
// import { useLogin } from '../context/LoginContext';
// import { supabase } from '../utils/client';

// const ProductCard = ({ product }) => {
//   const [isImageLoaded, setIsImageLoaded] = useState(false);
//   const [isHovered, setisHovered] = useState(false);
//   const [processProducts, setProcessProducts] = useState([]);

//   // const productImage = useMemo(() => {
//   //   return isHovered ? `/products/${product.images[1]}` : `/products/${product.images[0]}`;
//   // }, [isHovered, product.images]);

//   const { userData, getUser } = useUsers();
//   // const [usuario, setUsuario] = useState(null)
//   const navigate = useNavigate();
//   const { user } = useLogin();

//   useEffect(() => {
//     if (user) {
//       getUser(user.id);
//       console.log("USER", user)
//     }
//   }, [user]);

//   console.log("USER IN PRODUCT CARD", userData);
//   async function fetchUserProducts() {
//     try {
//       const { data, error } = await supabase
//         .from('equipos')
//         .select(`*, users(name)`)
//         .where('attendant', '=', userData.name);

//       if (error) {
//         console.error('Error fetching data:', error.message, error.details);
//         return;
//       }

//       setProcessProducts(data);
//     } catch (error) {
//       console.error('Unexpected error:', error);
//     }
//   }

//   useEffect(() => {
//     fetchUserProducts();
//   }, [userData.name]);


//   return (
//     <Grid item xs={4} sm={3} onMouseEnter={() => setisHovered(true)} onMouseLeave={() => setisHovered(false)}>
//       <div>
//         {processProducts.map(product => (
//           <div key={product.id}>
//             {/* Render product information here */}
//             <p>{product.attendant}</p>
//           </div>
//         ))}
//       </div>
//       {/* <Card>
//         <CardActionArea>
//           <CardMedia
//             component='img'
//             className='fadeIn'
//             image={productImage}
//             alt={product.title}
//             onLoad={() => setIsImageLoaded(true)}
//           />
//         </CardActionArea>
//       </Card>

//       <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
//         <Typography fontWeight={800}> {product.title} </Typography>
//         <Typography fontWeight={400}> {product.area} </Typography>
//       </Box> */}
//     </Grid>
//   );
// }

// // ProductCard.propTypes = {
// //   product: PropTypes.shape({
// //     _id: PropTypes.string.isRequired,
// //     active_type: PropTypes.string.isRequired,
// //     images: PropTypes.arrayOf(PropTypes.string).isRequired,
// //     area: PropTypes.string.isRequired,
// //     brand: PropTypes.string.isRequired,
// //     slug: PropTypes.string.isRequired,
// //     model: PropTypes.string.isRequired,
// //     serial: PropTypes.string.isRequired,
// //     measures: PropTypes.string.isRequired,
// //     color: PropTypes.string.isRequired,
// //     state: PropTypes.string.isRequired,
// //     tags: PropTypes.arrayOf(PropTypes.string).isRequired,
// //     title: PropTypes.string.isRequired,
// //     condition_use: PropTypes.string.isRequired,
// //     quantity: PropTypes.number.isRequired,
// //     attendant: PropTypes.string.isRequired,
// //     createdAt: PropTypes.string.isRequired,
// //     updatedAt: PropTypes.string.isRequired,
// //   }).isRequired,
// // };

// ProductCard.propTypes = {
//   processProducts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired, // assuming id is a number, adjust accordingly
//       attendant: PropTypes.string.isRequired, // adjust the type accordingly
//       // ... (add other expected props and their types)
//     })
//   ),
// };

// export default ProductCard;

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { useUsers } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';
import { supabase } from '../utils/client';

const ProductCard = () => {
  const [IsImageLoaded, setIsImageLoaded] = useState(false)
  const [isHovered, setisHovered] = useState(false);
  const [processProducts, setProcessProducts] = useState([]);
  const { userData, getUser } = useUsers();
  const navigate = useNavigate();
  const { user } = useLogin();

  useEffect(() => {
    if (user) {
      // navigate("/perfil", { replace: true });
      getUser(user.id);
    }
    else {
      navigate("/login");
    }
  }, [user]);

  console.log("INFO USER PRODUCT CARD", userData);
  useEffect(() => {
    async function fetchUserProducts() {
      try {
        const { data, error } = await supabase
          .from('equipos')
          .select(`*`)
          .eq('attendant', userData.name);

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
  }, [userData.name]);

  const capitalizeFirstLetter = (text) => {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  return (
    // <Grid container spacing={2}>
    //   {processProducts.map(product => (
    //     <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
    //       <Card
    //         onMouseEnter={() => setisHovered(true)}
    //         onMouseLeave={() => setisHovered(false)}
    //       >
    //         <CardActionArea>
    //           <CardMedia
    //             component='img'
    //             className='fadeIn'
    //             image={product.image}
    //             alt={product.title}
    //             onLoad={() => setIsImageLoaded(true)}
    //           />

    //           <Box sx={{
    //             mt: 1,
    //             // display: isImageLoaded ? 'block' : 'none' 
    //           }} className='fadeIn'>
    //             <Typography variant='h2' component='h2'>
    //               {capitalizeFirstLetter(product.title)}
    //             </Typography>
    //             <Typography variant='h3' component='h3' paddingTop={1}>
    //               {capitalizeFirstLetter(product.area)}
    //             </Typography>
    //           </Box>
    //         </CardActionArea>
    //       </Card>
    //     </Grid>
    //   ))}
    // </Grid>
    <Grid container spacing={2}>
      {processProducts.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
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

ProductCard.propTypes = {
  processProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      attendant: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default ProductCard;
