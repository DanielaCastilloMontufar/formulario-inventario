// import { createContext } from 'react';

// export const AuthContext = createContext({
//   isLoggedIn: false,
//   user: undefined,
//   userArea: undefined,
//   loginUser: async (email, password) => {
//     // Lógica para iniciar sesión
//     // Devuelve true si el inicio de sesión es exitoso, de lo contrario, false
//     return true;
//   },
//   logout: () => {
//     // Lógica para cerrar sesión
//   },
// });

// // import { createContext, useContext, useState } from 'react';
// // import PropTypes from 'prop-types';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);

// //   const login = (userData) => {
// //     setUser(userData);
// //   };

// //   const logout = () => {
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // AuthProvider.propTypes = {
// //   children: PropTypes.node.isRequired,
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };
