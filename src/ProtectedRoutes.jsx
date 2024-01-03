// // import { Outlet, Navigate } from "react-router-dom";
// import SignIn from "./components/SignIn";
// import { useUsers } from "./context/UserContext";
// import HomePage from "./components/Home";

import { Navigate } from "react-router-dom";
import HomePage from "./components/Home";
import { useUsers } from "./context/UserContext";

// const ProtectedRoutes = () => {
//   const { user } = useUsers();

//   return user ? <HomePage /> : <SignIn />;
// };

// export default ProtectedRoutes;
const ProtectedRoutes = () => {
  const { user } = useUsers();

  // Verifica si el usuario tiene la información necesaria
  if (!user || !user.id) {
    // Redirecciona o muestra un mensaje de error
    return <Navigate to="/login" />;
  }

  return <HomePage />;
};
export default ProtectedRoutes