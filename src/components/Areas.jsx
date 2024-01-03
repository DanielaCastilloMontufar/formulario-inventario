// import { Card, CardActionArea, Grid, Typography } from "@mui/material";
// import { Link } from "react-router-dom";


// const Areas = () => {

//   const role = 'client';
//   const area = 'TECNOLOGÍA DE INFORMACIÓN';

//   const categories = [
//     { label: 'TECNOLOGÍA DE INFORMACIÓN', link: 'areas/sistemas' },
//     { label: 'Protestos', link: 'areas/protestos' },
//     { label: 'Caja', link: 'areas/caja' },
//     { label: 'Contabilidad', link: 'areas/contabilidad' },
//     { label: 'Certificación de Origen', link: 'areas/certificacion_origen' },
// ];

// // const filteredCategoriesAdmin = categories.filter(category => {
// //     // if (user && user.role === 'admin') 
// //     if (role === 'admin'){
// //         return true;
// //     }
// //     return false;
// // });

// // const filteredCategoriesClient = categories.filter(category => {
// //     if (role === 'client' && category.link.endsWith(area.toLowerCase())) {
// //         return true;
// //     }
// //     return false;
// // });


//   return (
//     <>
//     <Typography variant='h1' component='h1' color="#058237" sx={{ mb: 4 }} marginTop={15}>ÁREAS</Typography>
//                 <Grid container spacing={2}>
//                     {/* {
//                         role === 'admin' && ( */}
//                             <>
//                                 {/* {filteredCategoriesAdmin.map((category, index) => ( */}
//                                     <Grid item xs={12} sm={6} md={4} lg={3} 
//                                     // key={index}
//                                     >
//                                         <Card sx={{ fontWeight: '300', m: 20 }}>
//                                                 <Link 
//                                                 // to={`/${category.link}`}
//                                                 >
//                                                     <CardActionArea sx={{ background: '#005121' }}>
//                                                         <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
//                                                           hola
//                                                             {/* {category.label} */}
//                                                         </Typography>
//                                                     </CardActionArea>
//                                                 </Link>
//                                         </Card>
//                                     </Grid>
//                                 {/* ))} */}
//                             </>
//                        {/* )
//                     }  */}

//                     {/* {
//                         role === 'client' && ( */}
//                             <>
//                                 {/* {filteredCategoriesClient.map((category, index) => ( */}
//                                     {/* <Grid item xs={12} sm={6} md={4} lg={3}  */}
//                                     {/* // key={index}
//                                     >
//                                         <Card sx={{ fontWeight: '300', mt: 8, m: 2 }}>
//                                                 <Link  */}
//                                                 {/* // to={`/${category.link}`}
//                                                 >
//                                                     <CardActionArea sx={{ background: '#005121' }}>
//                                                         <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'> */}
//                                                             {/* {category.label} */}
//                                                         {/* </Typography>
//                                                     </CardActionArea>
//                                                 </Link>
//                                         </Card>
//                                     </Grid> */}
//                                 {/* ))} */}
//                             </>
//                         {/* )
//                     } */}

//                 </Grid>
//     </>
//   )
// }

// export default Areas

// import { useContext } from 'react';
// import { Card, CardActionArea, Grid, Link, Typography } from '@mui/material';
// import { AuthContext } from '../../context';

// const CategoryPage = () => {
//   const { user } = useContext(AuthContext);

//   const areas = [
//     'TECNOLOGIA DE INFORMACION',
//     'CONTABILIDAD',
//     'COMERCIAL',
//     'CAJA',
//     'PROTESTOS',
//     'ORIGEN',
//     'SECRETARIA',
//     'SALON VITOR',
//     'SALON CERVESUR',
//     'LEGAL',
//     'DIRECTORIO 3',
//     'SALON 1',
//     'SALON 2',
//     'SALON 3',
//     'AUDITORIO',
//     'COCINA',
//     'BAÑO PERSONAL',
//     'BAÑO SALON CERVESUR',
//     'BAÑO AUDITORIO',
//     'HALL PRIMERA CASONA',
//     'HALL SEGUNDA CASONA',
//     'MENSAJERIA',
//     'GERENCIA',
//     'SUBGERENCIA',
//     'ARBITRAJE',
//     'ARBITRAJE 2',
//     'SECRETARIA ARBITRAL',
//   ];

//   const filteredAreasAdmin = areas;

//   const filteredAreasClient = areas.filter(area => {
//     return user && user.role === 'client' && user.area && area.toLowerCase() === user.area.toLowerCase();
//   });

//   const filteredAreas = user?.role === 'admin' ? filteredAreasAdmin : filteredAreasClient;

//   return (
//     <div>
//       <Typography variant='h1' component='h1' color="#058237" style={{ marginBottom: '1rem', marginTop: '1.5rem' }}>
//         ÁREAS
//       </Typography>
//       <Grid container spacing={2}>
//         {filteredAreas.map((area, index) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//             <Card style={{ fontWeight: '300', marginTop: '1rem', margin: '0.5rem' }}>
//               <Link href={`/areas/${area.toLowerCase()}`} passHref>
//                 <CardActionArea style={{ background: '#005121' }}>
//                   <Typography variant="subtitle1" align="center" style={{ margin: '0.5rem' }} color='white'>
//                     {area}
//                   </Typography>
//                 </CardActionArea>
//               </Link>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default CategoryPage;



// import React from 'react';
import { Box, Card, CardActionArea, Grid, Link, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useUsers } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';
import { useEffect, useState } from 'react';
import ProductCardArea from './ProductCardArea';
import { supabase } from '../utils/client';

const useStyles = makeStyles({
  hoverEffect: {
    '&:hover': {
      backgroundColor: '#a5c2b1',
      transition: 'all 0.3s ease-in-out',
    },
  },
});

const CategoryPage = () => {

  const { userData, getUser } = useUsers();
  // const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate();
  const { user } = useLogin();
  const [processArea, setProcessArea] = useState([]);


  useEffect(() => {
    if (user) {
      navigate("/areas", { replace: true });
      getUser(user.id);
    }
    else {
      navigate("/login");
    }
  }, [user])

  const classes = useStyles();

  const allAreas  = [
    'TECNOLOGIA DE INFORMACION',
    'CONTABILIDAD',
    'COMERCIAL',
    'CAJA',
    'PROTESTOS',
    'ORIGEN',
    'SECRETARIA',
    'SALON VITOR',
    'SALON CERVESUR',
    'LEGAL',
    'DIRECTORIO 3',
    'SALON 1',
    'SALON 2',
    'SALON 3',
    'AUDITORIO',
    'COCINA',
    'BAÑO PERSONAL',
    'BAÑO SALON CERVESUR',
    'BAÑO AUDITORIO',
    'HALL PRIMERA CASONA',
    'HALL SEGUNDA CASONA',
    'MENSAJERIA',
    'GERENCIA',
    'SUBGERENCIA',
    'ARBITRAJE',
    'ARBITRAJE 2',
    'CENTRO DE ARBITRAJE',
  ];
  
  useEffect(() => {
      fetchProcess()
  }, []);

  async function fetchProcess() {
    try {
      let areaNames = [];
      if (userData.role === 'admin') {
        // If the user is an admin, show all areas
        areaNames = allAreas;
      } else {
        // Fetch areas based on the client user
        const { data, error } = await supabase
            .from('area_users')
            .select(`areas(name)`)
            .eq('id_user', userData.id)

        if (error) {
          console.error('Error fetching data:', error.message, error.details);
          return;
        }

        if (data.length === 0) {
          console.warn('No areas found for the user with ID:', userData.id);
          return;
        }

        areaNames = data.map((item) => item.areas.name);
      }

      setProcessArea(areaNames);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  return (
    <div>
      <Typography variant='h1' component='h1' color="#058237" marginTop={15}>
        ÁREAS
      </Typography>
      <Grid container spacing={2} marginTop={2}>
        {processArea.map((areaName, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper style={{ borderRadius: '20px', height: '100%', margin: 0, padding: 0 }}>
              <Link href={`/areas/${areaName}`} style={{ textDecoration: 'none' }}>
                <CardActionArea
                  className={`${classes.hoverEffect} center-content`}
                  style={{
                    background: '#005121',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0,
                    padding: 10,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" align="center" style={{ margin: '1rem' }} color='white'>
                      {areaName}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryPage;

//   async function fetchProcess() {
//     try {
//         const { data, error } = await supabase
//             .from('area_users')
//             .select(`areas(name)`)
//             .eq('id_user', userData.id)

//         if (error) {
//             console.error('Error fetching data:', error.message, error.details);
//             return;
//         }


//         if (data.length === 0) {
//             console.warn('No areas found for the user with ID:', userData.id);
//             return;
//         }

       
//         // const areaNames = data.map((item) => item.areas.name);    
//         setProcessArea(data);
//     } catch (error) {
//         console.error('Unexpected error:', error);
//     }
// }
 

//   return (
//     <div>
//       <Typography variant='h1' component='h1' color="#058237" marginTop={15}>
//         ÁREAS
//       </Typography>
//       <Grid container spacing={2} marginTop={2}>
//         {
//           processArea.map((areaItem, index) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
//               <Paper style={{ borderRadius: '20px', height: '100%', margin: 0, padding: 0 }}>
//                 <Link href={`/product-list/${areaItem.areas.name}`} style={{ textDecoration: 'none' }}>
//                   <CardActionArea
//                     className={`${classes.hoverEffect} center-content`}
//                     style={{
//                       background: '#005121',
//                       flexGrow: 1,
//                       display: 'flex',
//                       flexDirection: 'column',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       margin: 0,
//                       padding: 10,
//                     }}
//                   >
//                     <Box>
//                       <Typography variant="subtitle1" align="center" style={{ margin: '1rem' }} color='white'>
//                         {areaItem.areas.name}
//                       </Typography>
//                     </Box>
//                   </CardActionArea>
//                 </Link>
//               </Paper>
//             </Grid>
//           ))
//         } 
//       </Grid>
//     </div>
//   );
// };

// export default CategoryPage;
