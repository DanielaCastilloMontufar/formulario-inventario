// import { Box, CardActionArea, Grid, Typography } from "@mui/material"
// import { Link, useNavigate } from "react-router-dom"
// import { useUsers } from "../context/UserContext";
// import { useLogin } from "../context/LoginContext";
// import { useEffect } from "react";




// const SignIn = () => {

//   const { userData, getUser } = useUsers();
//   // const [usuario, setUsuario] = useState(null)
//   const navigate = useNavigate();
//   const { user } = useLogin();

//   console.log(user)

//   useEffect(() => {
//     if (user) {
//       // navigate("/home", { replace: true });
//       getUser(user.id);
//     }
//     else {
//       navigate("/ingresar");
//     }
//   }, [user])
  
//   return (
//     <Box display="flex" alignItems="center" justifyContent="center">
//       <Grid marginTop={10}>
//         <Typography variant="h4" align="center" fontWeight="bold" color="primary">
//           INICIA SESIÓN PARA PODER INGRESAR AL INVENTARIO
//         </Typography>
//         <Link to="/login">
//           <CardActionArea
//             sx={{
//               background: '#09662e',
//               marginTop: 10,
//               width: 'max-content',
//               height: '60px',
//               mx: 'auto',
//             }}
//           >
//             <Typography variant="subtitle1" align="center" color="white">
//               INICIAR SESIÓN
//             </Typography>
//           </CardActionArea>
//         </Link>
//       </Grid>
//     </Box>
//   )
// }

// export default SignIn