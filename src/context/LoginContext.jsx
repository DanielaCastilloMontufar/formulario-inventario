import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/client";
import PropTypes from "prop-types";

export const LoginContext = createContext();

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin debe estar dentro del proveedor LoginContext");
  }
  return context;
};

export const LoginContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // if (user === null) {
    //   getSessionAuth();
    // }
    // console.log("CONTEX", user);
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session == null) {
        navigate("/", { replace: true });
      } else {
        setUser(session?.user);
      }
    });
  }, []);

  const signInMail = async ({ email, password }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error?.message);
      navigate("/home");
      // setUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const getSessionAuth = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      console.log("SESSION", data);
      return data.session.user;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        user,
        error,
        signInMail,
        getSessionAuth,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

LoginContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
