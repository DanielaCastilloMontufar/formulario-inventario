// import { useState } from 'react';
// import { supabase } from '../utils/client'; 

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const login = async (e) => {
//     e.preventDefault();
//     try {
//       const { user, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       console.log(email)

//       if (error) {
//         console.error(error.message);
//       } else {
//         console.log('Login successful', user);
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={login}>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

// import { useState } from 'react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const login = async (e) => {
//     e.preventDefault();
//     try {
//       const { user, error } = await supabase.auth.signIn({
//         email,
//         password,
//       });

//       if (error) {
//         console.error(error.message);
//       } else {
//         console.log('Login successful', user);
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={login}>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// // export default Login;
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Button, TextField, Typography, Box, Grid, Chip } from '@mui/material';
// import ErrorOutline from '@mui/icons-material/ErrorOutline';
// import { validations } from './validations'; 
// import { supabase } from "../utils/client";


// const LoginForm = () => {
//   const [showError, setShowError] = useState(false);
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onLoginUser = async (data) => {
//     try {
//       const { user, error } = await supabase.auth.signIn({
//         email: data.email,
//         password: data.password,
//       });

//       if (error) {
//         console.error(error);
//         setShowError(true);
//       } else {
//         // Inicio de sesión exitoso, redirige o realiza alguna acción
//         console.log('Inicio de sesión exitoso', user);
//       }
//     } catch (error) {
//       console.error('Error en el inicio de sesión', error.message);
//       setShowError(true);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onLoginUser)} noValidate>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '70vh', // Ajusta esto según tus necesidades
//         }}
//       >
//         <Box sx={{ width: 350, padding: '10px 20px' }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="h1" component="h1">
//                 Iniciar Sesión
//               </Typography>
//               <Chip
//                 label="No reconocemos ese usuario / contraseña"
//                 color="error"
//                 icon={<ErrorOutline />}
//                 className="fadeIn"
//                 sx={{ display: showError ? 'flex' : 'none' }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 type="email"
//                 label="Correo"
//                 variant="filled"
//                 fullWidth
//                 {...register('email', {
//                   required: 'Este campo es requerido',
//                   validate: validations.isEmail,
//                 })}
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Contraseña"
//                 type="password"
//                 variant="filled"
//                 fullWidth
//                 {...register('password', {
//                   required: 'Este campo es requerido',
//                   minLength: { value: 6, message: 'Mínimo 6 caracteres' },
//                 })}
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 color="secondary"
//                 className="circular-btn"
//                 size="large"
//                 fullWidth
//                 sx={{
//                   backgroundColor: '#058237', // Cambia el color según tu preferencia
//                   '&:hover': {
//                     backgroundColor: '#45a049', // Cambia el color de hover según tu preferencia
//                   },
//                 }}
//               >
//                 Ingresar
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </form>
//   );
// };

// export default LoginForm;


// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Button, TextField, Typography, Box, Grid, Chip } from '@mui/material';
// import ErrorOutline from '@mui/icons-material/ErrorOutline';
// import { supabase } from "../utils/client";
// import { useNavigate } from 'react-router-dom';
// import { validations } from './validations';

// const LoginForm = () => {
//   const [showError, setShowError] = useState(false);
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onLoginUser = async (data) => {
//     try {
//       const { user, session, error } = await supabase.auth.signInWithPassword({
//         email: data.email,
//         password: data.password,
//       });

//       if (error) {
//         console.error('Error en el inicio de sesión:', error);
//         setShowError(true);
//       } else {
//         console.log('Inicio de sesión exitoso', user, session);
//         setShowError(false);

//         // Redirige a /home después de un inicio de sesión exitoso
//         navigate('/home');
//       }
//     } catch (error) {
//       console.error('Error en el inicio de sesión', error.message);
//       setShowError(true);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onLoginUser)} noValidate>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '70vh', // Ajusta esto según tus necesidades
//         }}
//       >
//         <Box sx={{ width: 350, padding: '10px 20px' }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="h1" component="h1">
//                 Iniciar Sesión
//               </Typography>
//               <Chip
//                 label="No reconocemos ese usuario / contraseña"
//                 color="error"
//                 icon={<ErrorOutline />}
//                 className="fadeIn"
//                 sx={{ display: showError ? 'flex' : 'none' }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 type="email"
//                 label="Correo"
//                 variant="filled"
//                 fullWidth
//                 {...register('email', {
//                   required: 'Este campo es requerido',
//                   validate: validations.isEmail,
//                 })}
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Contraseña"
//                 type="password"
//                 variant="filled"
//                 fullWidth
//                 {...register('password', {
//                   required: 'Este campo es requerido',
//                   minLength: { value: 6, message: 'Mínimo 6 caracteres' },
//                 })}
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 color="secondary"
//                 className="circular-btn"
//                 size="large"
//                 fullWidth
//                 sx={{
//                   backgroundColor: '#058237',
//                   '&:hover': {
//                     backgroundColor: '#45a049',
//                   },
//                 }}
//               >
//                 Ingresar
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </form>
//   );
// };

// export default LoginForm;


import { useEffect, useState } from 'react';
import { supabase } from '../utils/client';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, Grid, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useLogin } from '../context/LoginContext';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInMail, error } = useLogin();
  const navigate = useNavigate();
  const {user} = useLogin();
  console.log("user", user);


  useEffect(() => {
    if(user){
      navigate("/home", { replace: false });
    }
    else {
      navigate("/login");
    }
  }, [user])


  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      signInMail({ email, password });

      try {
          const { error } = await supabase.auth.signInWithPassword({
              email: email,
              password: password,
          })
          console.log(error)
      } catch (error) {
          console.error(error);
      }
      //Validación adicional para el número de 8 dígitos
      const isValidEmail = /^[0-9]{5}$/.test(email);
      navigate("/home");
      if (!isValidEmail) {
        error('El usuario debe ser un número de 5 dígitos');
        return;
      }


      try {
          const formData = new FormData();
          formData.append('email', email);
          formData.append('password', password);

          const response = await fetch('/login', {
              method: 'POST',
              body: formData,
          });

          if (response.ok) {
              const data = await response.json();
              const token = data.token;
              console.log(token);
              navigate("/");
          } else {
              error('Error al iniciar sesión');
          }
      } catch (error) {
        error('Error al conectar con el servidor');
      }

      error('');
      handleEmailChange('');
      handlePasswordChange('');
  };

  return (
    <form className="bg-white">
      <Box sx={{ width: 350, padding: '100px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component="h1"> Iniciar Sesión</Typography>
            {error &&
          <Chip
          label="No reconocemos ese usuario / contraseña"
          color="error"
          icon={<ErrorOutline />}
          className="fadeIn pt-10"
          sx={{display: error? 'flex': 'none'}}
          /> 
          // <p className="form-error">{error}</p>
          }
          </Grid>
          <Grid item xs={12}>
            <div className="mb-4">
              <TextField
                className="block text-gray-700 text-sm mb-2"
                htmlFor="email" type="email" label="Correo" variant="filled" fullWidth value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
                Usuario
              </TextField>
              {/* <input
                className="shadow appearance-none text-sm border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={handleEmailChange}
              /> */}
            </div>
          </Grid>
          <Grid item xs={12}>
          <div className="mb-6">
            <TextField
              className="block text-gray-700 text-sm mb-2"
              htmlFor="password" label="Contraseña" type='password' variant="filled" fullWidth value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              Contraseña
            </TextField>
            {/* <input
              className="shadow appearance-none text-sm border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={handlePasswordChange}
            /> */}
          </div>
          </Grid>
          
          <div className="flex items-center justify-between">
            <button
              className="text-base"
              type="button"
              onClick={handleSubmit}
            >
              Iniciar sesión
            </button>
          </div>
        </Grid>
      </Box>
    </form>
  );
}

export default LoginForm;
