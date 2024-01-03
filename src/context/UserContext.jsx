import { createContext, useContext, useState } from 'react'
import { supabase } from '../utils/client';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers debe estar dentro del proveedor UserContext')
    }
    return context;
};

export const UserContextProvider = ({ children }) => {

    const [users, setUsers] = useState([])
    const [userData, setUserData] = useState([])
    const [roles, setRoles] = useState([])
    const [modal, setModal] = useState(false)

    const getUsers = async () => {
        const { error, data } = await supabase.from('users').select()
        if (error) throw (error.message)
        setUsers(data)
    }

    const getUser = async (id) => {
        const { error, data } = await supabase.from('users')
            .select()
            .eq(`id`, id)
            .single()
        if (error) throw (error.message) // este error
        // setUserData(data)
    // console.log("DATA",data)
        // return data
        setUserData(data)
    }

    // const getAreas = async (id) => {
    //     const { error, data } = await supabase.from('area_users').select().like()
    //     if (error) throw (error.message)
    //     setUsers(data)
    // }


    // const createUsers = async (formData) => {
    //     try {
    //         const { data, error } = await supabase.auth.signUp({
    //             email: formData.email,
    //             password: formData.password,
    //         })
    //         if (error) return {title:"Error" ,msg: error.message+" Code:[000101]", icon: 'error'}
    //         updateUsers(formData, data.user.id)
    //         return ({title:"Exito" ,msg: 'Usuario creado correctamente', icon: 'success'})
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

    // const updateUsers = async (formData, id) => {
    //     try {
    //         const { error } = await supabase.from('users')
    //             .update({
    //                 last_name: formData.last_name,
    //                 first_name: formData.first_name,
    //                 email: formData.email,
    //                 rol_id: formData.rol,
    //                 // status: formData.status,
    //                 // image: formData.image
    //             })
    //             .eq('id', id)
    //         if (error) return {title:"Error" ,msg: error.message+" Code:[000101]", icon: 'error'}
    //         getUsers()
    //         setModal(true)
    //         return ({title:"Exito" ,msg: 'Usuario actualizado correctamente', icon: 'success'})
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

    const getRoles = async () => {
        const { error, data } = await supabase.from('rol').select()
        if (error) throw (error.message)
        setRoles(data)
    }

    const getModal = () => {
        setModal(false)
    }

    return (
        <UserContext.Provider value={{
            modal,
            users,
            userData,
            getUsers,
            getUser,
            // createUsers,
            // updateUsers,
            roles,
            getRoles,
            getModal
        }}>
            {children}
        </UserContext.Provider>
    )
}

// Añade validación prop-types para children
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// import { createContext, useContext, useState } from 'react';
// import PropTypes from 'prop-types';

// const UserContext = createContext();

// export const UserContextProvider  = ({ children }) => {
//   const [users, setUsers] = useState(null);

//   return (
//     <UserContext.Provider value={{ users }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// UserContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useUsers = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUsers must be used within a UserProvider');
//   }
//   return context;
// };
