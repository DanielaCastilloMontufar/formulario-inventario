// import { AccountCircle, ClearOutlined, ExitToApp, Layers, SearchOutlined } from '@mui/icons-material';
// import { AppBar, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
// import { useState } from 'react';


// const Navbar = () => { 


//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSearchVisible, setIsSearchVisible] = useState(false);

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };



//   return (
//     <AppBar sx={{ background: "#b2eab8", height: '80px', paddingTop: 1, paddingBottom: 10, justifyItems: 'center', justifyContent: 'start' }}>
//       <Toolbar>
//         <div className="flex">
//           <img src="/logo2.webp" className="logo" />
//         </div>
//         <Box flex={1} />
//         <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' }, fontWeight: '300', mr: 2 }}
//           className='fadeIn'>
//           <Link>
//             <Button className='from-neutral-950'>
//               <Typography variant='subtitle2'>Home
//               </Typography>
//             </Button>
//           </Link>
//         </Box>

//         <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' }, fontWeight: '300', mr: 2 }}
//           className='fadeIn'>
//           <Link>
//             <Button className='from-neutral-950'>
//               <Typography variant='subtitle2' >Áreas
//               </Typography>
//             </Button>
//           </Link>
//         </Box>

//         <Box flex={1} />

//         {/* PANTALLAS GRANDES */}

//         {
//           isSearchVisible
//             ? (
//               <Input
//                 sx={{ display: { xs: 'none', sm: 'flex' }, fontWeight: '300' }}
//                 className='fadeIn'
//                 autoFocus
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 // onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
//                 type='text'
//                 placeholder="Buscar..."
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setIsSearchVisible(false)}
//                       className='fadeIn'
//                     >
//                       <ClearOutlined />
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//             )
//             :
//             (
//               <IconButton
//                 onClick={() => setIsSearchVisible(true)}
//                 sx={{ display: { xs: 'none', sm: 'flex' } }}
//               >
//                 <SearchOutlined />
//               </IconButton>
//             )
//         }

//         {/* PANTALLAS DE CELULAR */}
//         <IconButton
//           sx={{ display: { xs: 'flex', sm: 'none' } }}
//           // onClick={toggleSideMenu}
//         >
//           <SearchOutlined />
//         </IconButton>

//         <Button sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' }, fontWeight: '300' }}
//           className='fadeIn'
//           onClick={toggleMenu} 
//           // onClick={toggleSideMenu}
//           >
//         <Typography variant='subtitle2' 
//         // sx={{
//         //         color: asPath === '/equipos/categorias' ? 'black' : 'black',
//         //         '&:hover': {
//         //           color: asPath === '/equipos/categorias' ? 'white' : 'black',
//         //         },
//         //       }}
//               >Menú</Typography>
//         </Button>

//         {/* Menú Lateral */}
//         {isMenuOpen && (
//           <div className="menu-lateral">
//             <ul>
//               <li>
//                 <IconButton>
//                   <AccountCircle />
//                 </IconButton>
//                 <Typography variant='subtitle2'>Perfil</Typography>
//               </li>
//               <li>
//                 <IconButton>
//                   <Layers />
//                 </IconButton>
//                 <Typography variant='subtitle2'>Áreas</Typography>
//               </li>
//               <li>
//                 <IconButton>
//                   <ExitToApp />
//                 </IconButton>
//                 <Typography variant='subtitle2'>Salir</Typography>
//               </li>
//             </ul>
//           </div>
//         )}

//       </Toolbar>
//     </AppBar>

//   );
// };

// export default Navbar;
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  ListItem,
  ListItemIcon,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  ClearOutlined, SearchOutlined,
  AccountCircleOutlined, Layers, ExitToApp,
  DashboardOutlined, ComputerOutlined, PeopleOutlineOutlined
} from '@mui/icons-material';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/client';
import { useUsers } from '../context/UserContext';
import { useLogin } from '../context/LoginContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { userData, getUser } = useUsers();
  const navigate = useNavigate();
  const { user, setUser } = useLogin();

  useEffect(() => {
    if (user) {
      navigate({ replace: true });
      getUser(user.id);
    }
    else {
      // navigate("/login");
    }
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      getUser(null)
      navigate("/login", { replace: true })
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <div className={`container ${isMenuOpen ? 'menu-open' : ''}`}>
      <AppBar
        sx={{
          background: "#b2eab8",
          height: '80px',
          paddingTop: 1,
          paddingBottom: 10,
          justifyItems: 'center',
          justifyContent: 'start',
          zIndex: 1
        }}
      >
        <Toolbar>
          <div className="flex">
            <Link to="/home">
              <img src="/logo2.webp" alt="Logo" className="logo" />
            </Link>
          </div>
          <Box flex={1} />

          <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' }, fontWeight: '300', mr: 2 }}
            className='fadeIn'>
            <Link to="/home" >
              <Button className='from-neutral-950'>
                <Typography variant='subtitle2'>Home
                </Typography>
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' }, fontWeight: '300', mr: 2 }}
            className='fadeIn'>
            <Link to="/areas">
              <Button className='from-neutral-950'>
                <Typography variant='subtitle2' >Áreas
                </Typography>
              </Button>
            </Link>
          </Box>

          <Box flex={1} />

          {/* PANTALLAS GRANDES */}
          {isSearchVisible
            ? (
              <Input
                sx={{ display: { xs: 'none', sm: 'flex' }, fontWeight: '300' }}
                className='fadeIn'
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type='text'
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsSearchVisible(false)}
                      className='fadeIn'
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            : (
              <IconButton
                onClick={() => setIsSearchVisible(true)}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <SearchOutlined />
              </IconButton>
            )
          }

          {/* PANTALLAS DE CELULAR */}
          <IconButton
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <SearchOutlined />
          </IconButton>

          {userData === null ? (

            <Link to="/login">
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <Typography className='mt-2' variant='subtitle1' color="#000000">Ingresar</Typography>
              </ListItem>
            </Link>
          ) : (
            <Button
              sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' }, fontWeight: '300' }}
              className='fadeIn'
              onClick={toggleMenu}
            >
              <Typography variant='subtitle2'>Menú</Typography>
            </Button>

          )}
        </Toolbar>
      </AppBar>

      {/* Menú Lateral */}
      {isMenuOpen && (
        <>
          <div className="menu-lateral fadeIn" onClick={closeMenu}>
            <div className='close-menu'>
              <ClearOutlined />
            </div>

            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type='text'
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsSearchVisible(false)}
                    className='fadeIn'
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />

            <div className="opt-menu-lateral">
              <div>
                <>
                  <Link to="/perfil">
                    <ListItem button>
                      <ListItemIcon>
                        <AccountCircleOutlined />
                      </ListItemIcon>
                      <Typography className='mt-2' variant='subtitle1' color="#000000">Perfil</Typography>
                    </ListItem>
                  </Link>

                  <Link to="/areas">
                    <ListItem button>
                      <ListItemIcon>
                        <Layers />
                      </ListItemIcon>
                      <Typography className='mt-2' variant='subtitle1' color="#000000">Áreas</Typography>
                    </ListItem>
                  </Link>

                  {userData.role === 'admin' && (
                    <>
                      <Link to="/dashboard">
                        <ListItem button>
                          <ListItemIcon>
                            <DashboardOutlined />
                          </ListItemIcon>
                          <Typography className='mt-2' variant='subtitle1' color="#000000">Dashboard</Typography>
                        </ListItem>
                      </Link>

                      <Link to="/equipos">
                        <ListItem button>
                          <ListItemIcon>
                            <ComputerOutlined />
                          </ListItemIcon>
                          <Typography className='mt-2' variant='subtitle1' color="#000000">Equipos</Typography>
                        </ListItem>
                      </Link>

                      <Link to="/usuarios">
                        <ListItem button>
                          <ListItemIcon>
                            <PeopleOutlineOutlined />
                          </ListItemIcon>
                          <Typography className='mt-2' variant='subtitle1' color="#000000">Usuarios</Typography>
                        </ListItem>
                      </Link>
                    </>
                  )}

                  <ListItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <Typography className='mt-2' variant='subtitle1' color="#000000">Salir</Typography>
                  </ListItem>
                </>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
