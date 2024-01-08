import {
  AppBar,
  Box,
  IconButton,
  Input,
  InputAdornment,
  ListItem,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  AccountCircleOutlined,
  Layers,
  ExitToApp,
  DashboardOutlined,
  ComputerOutlined,
  PeopleOutlineOutlined,
} from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/client";
// import { useUsers } from "../context/UserContext";
import { useLogin } from "../context/LoginContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // const { userData, getUser } = useUsers();
  // const navigate = useNavigate();
  const { getSessionAuth } = useLogin();

  useEffect(() => {
    const sessionAuth = async () => {
      const session = await getSessionAuth();
      if (session) {
        await getUser(session.id);
      }
    };
    sessionAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  const getUser = async (id) => {
    const { error, data } = await supabase
      .from("users")
      .select()
      .eq(`id`, id)
      .single();
    if (error) throw error.message;
    setUserData(data);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <div className={`container mx-auto max-w-[1280px] ${isMenuOpen ? "menu-open" : ""}`}>
      <AppBar
        sx={{
          background: "#b2eab8",
          height: "80px",
          paddingTop: 1,
          paddingBottom: 10,
          justifyItems: "center",
          justifyContent: "start",
          zIndex: 1,
        }}
      >
        <Toolbar>
          <div className="flex">
            <Link to="/home">
              <img src="/logo2.webp" alt="Logo" className="logo" />
            </Link>
          </div>
          <Box flex={1} />

          {userData !== null && (
            <>
              <Box
                sx={{
                  display: isSearchVisible
                    ? "none"
                    : { xs: "none", sm: "block" },
                  fontWeight: "300",
                  mr: 2,
                }}
                className="fadeIn"
              >
                <Link to="/home">
                  <button className="bg-white text-xs text-center text-black rounded-lg hover:bg-[#058237] hover:text-white transition-colors duration-200">Inicio</button>
                </Link>
              </Box>

              <Box
                sx={{
                  display: isSearchVisible
                    ? "none"
                    : { xs: "none", sm: "block" },
                  fontWeight: "300",
                  mr: 2,
                }}
                className="fadeIn"
              >
                <Link to="/areas">
                  <button className="bg-white text-xs text-center text-black rounded-lg hover:bg-[#058237] hover:text-white transition-colors duration-200">Áreas</button>
                </Link>
              </Box>
            </>
          )}

          <Box flex={1} />

          {/* PANTALLAS GRANDES */}
          {isSearchVisible ? (
            <Input
              sx={{ display: { xs: "none", sm: "flex" }, fontWeight: "300" }}
              className="fadeIn"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsSearchVisible(false)}
                    className="fadeIn"
                  >
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              onClick={() => setIsSearchVisible(true)}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <SearchOutlined />
            </IconButton>
          )}

          {/* PANTALLAS DE CELULAR */}
          <IconButton sx={{ display: { xs: "flex", sm: "none" } }}>
            <SearchOutlined />
          </IconButton>

          {userData !== null && (
            <button className="bg-white text-xs text-center text-black rounded-lg hover:bg-[#058237] hover:text-white transition-colors duration-200" onClick={toggleMenu}>Menú</button>
          )}
        </Toolbar>
      </AppBar>

      {/* Menú Lateral */}
      {isMenuOpen && (
        <>
          <div className="menu-lateral fadeIn" onClick={closeMenu}>
            <div className="close-menu">
              <ClearOutlined />
            </div>

            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsSearchVisible(false)}
                    className="fadeIn"
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
                      <Typography
                        className="mt-2"
                        variant="subtitle1"
                        color="#000000"
                      >
                        Perfil
                      </Typography>
                    </ListItem>
                  </Link>

                  <Link to="/areas">
                    <ListItem button>
                      <ListItemIcon>
                        <Layers />
                      </ListItemIcon>
                      <Typography
                        className="mt-2"
                        variant="subtitle1"
                        color="#000000"
                      >
                        Áreas
                      </Typography>
                    </ListItem>
                  </Link>

                  {userData.role === "admin" && (
                    <>
                      <Link to="/dashboard">
                        <ListItem button>
                          <ListItemIcon>
                            <DashboardOutlined />
                          </ListItemIcon>
                          <Typography
                            className="mt-2"
                            variant="subtitle1"
                            color="#000000"
                          >
                            Dashboard
                          </Typography>
                        </ListItem>
                      </Link>

                      <Link to="/equipos">
                        <ListItem button>
                          <ListItemIcon>
                            <ComputerOutlined />
                          </ListItemIcon>
                          <Typography
                            className="mt-2"
                            variant="subtitle1"
                            color="#000000"
                          >
                            Equipos
                          </Typography>
                        </ListItem>
                      </Link>

                      <Link to="/usuarios">
                        <ListItem button>
                          <ListItemIcon>
                            <PeopleOutlineOutlined />
                          </ListItemIcon>
                          <Typography
                            className="mt-2"
                            variant="subtitle1"
                            color="#000000"
                          >
                            Usuarios
                          </Typography>
                        </ListItem>
                      </Link>
                    </>
                  )}

                  <ListItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <Typography
                      className="mt-2 cursor-pointer"
                      variant="subtitle1"
                      color="#000000"
                    >
                      Salir
                    </Typography>
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
