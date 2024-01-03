// import { createContext, useContext, useState } from 'react'
// import { supabase } from '../supabase/client';
// import PropTypes from 'prop-types';

// export const UserContext = createContext();

// export const useUsers = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error('useUsers debe estar dentro del proveedor UserContext')
//     }
//     return context;
// };

// export const UserContextProvider = ({ children }) => {

//     const [users, setUsers] = useState([])
//     const [roles, setRoles] = useState([])
//     const [modal, setModal] = useState(false)

//     const getUsers = async () => {
//         const { error, data } = await supabase.from('users').select()
//         if (error) throw (error.message)
//         setUsers(data)
//         // setModal(true)
//     }

//     const getUser = async (id) => {
//         const { error, data } = await supabase.from('users')
//             .select()
//             .eq('id', id)
//             .single()
//         if (error) throw (error.message)
//         // setUserData(data)
//         return data
//     }

//     const getRoles = async () => {
//         const { error, data } = await supabase.from('rol').select()
//         if (error) throw (error.message)
//         setRoles(data)
//     }

//     const getModal = () => {
//         setModal(false)
//     }

//     return (
//         <UserContext.Provider value={{
//             modal,
//             users,
//             getUsers,
//             getUser,
//             roles,
//             getRoles,
//             getModal
//         }}>
//             {children}
//         </UserContext.Provider>
//     )
// };

// UserContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/client";
import PropTypes from 'prop-types';


export const LoginContext = createContext();

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("useLogin debe estar dentro del proveedor LoginContext");
    }
    return context;
}

export const LoginContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange(
          async (event, session) => {
            // console.log("supabase event: ", event);
            if (session === null) {
              console.log(error)
              setUser(null);
              // console.log(session)
              // navigate("/", { replace: true });
            } else {
              // console.log("HHH",session)
              setUser(session?.user);
            //   const { user } = session;
              // console.log("data del usuario", session?.user.email);
            //   insertarUsuarios(user.id, user.user_metadata);
              // navigate("/home", { replace: true });
            }
          }
        );
      }, [navigate]);

    const signInMail = async ({ email, password }) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) setError(error?.message);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <LoginContext.Provider value={{ user, error, signInMail }}>
            {children}
        </LoginContext.Provider>
    );
}



LoginContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };