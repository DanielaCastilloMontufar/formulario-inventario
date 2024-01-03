
// import { Box, CardActionArea, Grid, Typography } from '@mui/material';
// import {
//   Link, Navigate,
//   // Navigate, Route, 
//   // ,BrowserRouter
//   //  as Router, Routes 
// } from 'react-router-dom';
// import { useUsers } from '../context/UserContext';
// // import PerfilPage from './Perfil'
// const HomePage = () => {
//   const { users } = useUsers();

//   if (!users) {
//     <Navigate to="/" /> 
//     return null;
//   }

//   return (
//     <>
//       <Box display="flex" alignItems="center" justifyContent="center">
//         <Grid marginTop={10}>
//           <Typography variant="h4" align="center" fontWeight="bold" color="#058237">
//             BIENVENIDO/A:
//           </Typography>
//           <Typography variant="h4" align="center" fontWeight="bold" textTransform="uppercase">
//             {user?.name}
//           </Typography>
//         </Grid>
//       </Box>
//       <Typography variant="h2" marginTop={10} fontWeight={500}>
//         Bienvenid@ al control de inventarios, revisa las diversas opciones a las que puedes ingresar:
//       </Typography>
//       {
//         role === 'client' && (
//           <Grid item xs={12} sm={6} md={4} lg={3} display='flex' gap={10} mt={10} >
//             <Link to="/perfil" >
//               {/* <Route path="/perfil" element={<PerfilPage />} /> */}
//               <CardActionArea sx={{ background: '#005121' }}>
//                 <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
//                   PERFIL
//                 </Typography>
//               </CardActionArea>
//             </Link>

//             <Link to="/areas">
//               <CardActionArea sx={{ background: '#005121' }}>
//                 <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
//                   ÁREAS
//                 </Typography>
//               </CardActionArea>
//             </Link>
//           </Grid>
//         )
//       }
//       {
//               role === 'admin' && (
//                 <Grid item xs={12} sm={6} md={4} lg={3} display='flex' gap={10} mt={10}>
//                   <Link to="/perfil">
//                     <CardActionArea sx={{ background: '#005121' }}>
//                       <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
//                         PERFIL
//                       </Typography>
//                     </CardActionArea>
//                   </Link>
//                   <Link to="/areas">
//                     <CardActionArea sx={{ background: '#005121' }}>
//                       <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
//                         ÁREAS
//                       </Typography>
//                     </CardActionArea>
//                   </Link>
//                   <Link to="/dashboard">
//                     <CardActionArea sx={{ background: '#005121' }}>
//                       <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
//                         DASHBOARD
//                       </Typography>
//                     </CardActionArea>
//                   </Link>
//                   <Link to="/equipos">
//                     <CardActionArea sx={{ background: '#005121' }}>
//                       <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
//                         EQUIPOS
//                       </Typography>
//                     </CardActionArea>
//                   </Link>
//                   <Link to="/usuarios">
//                     <CardActionArea sx={{ background: '#005121' }}>
//                       <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
//                         USUARIOS
//                       </Typography>
//                     </CardActionArea>
//                   </Link>
//                 </Grid>
//               )} 

//     </>
//   )
// }
// export default HomePage




import { Box, CardActionArea, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import { useLogin } from '../context/LoginContext'
import { useEffect } from 'react';

const HomePage = () => {
  const { userData, getUser} = useUsers();
  const navigate = useNavigate();
  const {user} = useLogin();

  console.log(user)

  useEffect(() => {
    if(user){
      navigate("/home", { replace: true });
      getUser(user.id);
    }
    else {
      // navigate("/login")
    }
  }, [user])
  
  // console.log("USER",usuario);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Grid marginTop={10}>
          <Typography variant="h4" align="center" fontWeight="bold" color="#058237">
            BIENVENIDO/A:
          </Typography>
          <Typography variant="h4" align="center" fontWeight="bold" textTransform="uppercase">
            {/* {user.name} */}
            {/* {user.user.name} */}
            {userData.name}

          </Typography>
        </Grid>
      </Box>
      <Typography variant="h2" marginTop={10} fontWeight={500}>
        Bienvenid@ al control de inventarios, revisa las diversas opciones a las que puedes ingresar:
      </Typography>
      {
        userData.role === 'client' && (
          <Grid item xs={12} sm={6} md={4} lg={3} display='flex' gap={10} mt={10} >
            <Link to="/perfil" >
              {/* <Route path="/perfil" element={<PerfilPage />} /> */}
              <CardActionArea sx={{ background: '#005121' }}>
                <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
                  PERFIL
                </Typography>
              </CardActionArea>
            </Link>

            <Link to="/areas">
              <CardActionArea sx={{ background: '#005121' }}>
                <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
                  ÁREAS
                </Typography>
              </CardActionArea>
            </Link>
          </Grid>
         )
      }
      {
         userData.role === 'admin' && ( 
          <Grid item xs={12} sm={6} md={4} lg={3} display='flex' gap={10} mt={10}>
            <Link to="/perfil">
              <CardActionArea sx={{ background: '#005121' }}>
                <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
                  PERFIL
                </Typography>
              </CardActionArea>
            </Link>
            <Link to="/areas">
              <CardActionArea sx={{ background: '#005121' }}>
                <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
                  ÁREAS
                </Typography>
              </CardActionArea>
            </Link>
            <Link to="/dashboard">
              <CardActionArea sx={{ background: '#005121' }}>
                <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
                  DASHBOARD
                </Typography>
              </CardActionArea>
            </Link>
            <Link to="/equipos">
              <CardActionArea sx={{ background: '#005121' }}>
                <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
                  EQUIPOS
                </Typography>
              </CardActionArea>
            </Link>
            <Link to="/usuarios">
              <CardActionArea sx={{ background: '#005121' }}>
                <Typography variant="subtitle1" align="center" sx={{ m: 2 }} color='white'>
                  USUARIOS
                </Typography>
              </CardActionArea>
            </Link>
          </Grid>
        )} 

    </>
  )
}
export default HomePage
