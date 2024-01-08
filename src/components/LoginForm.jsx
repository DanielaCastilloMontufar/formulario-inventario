import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chip, TextField } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useLogin } from "../context/LoginContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInMail, error, user } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate("/home");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInMail({ email, password });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form className="bg-white">
        <div className="max-w-[450px] p-10">
          <h1 className="text-3xl mb-5 font-semibold">Iniciar Sesión</h1>
          {error && (
            <Chip
              label="No reconocemos ese usuario / contraseña"
              color="error"
              icon={<ErrorOutline />}
              className="fadeIn pt-10"
              sx={{ display: error ? "flex" : "none" }}
            />
          )}
          <div className="space-y-4">
            <TextField
              className="block text-gray-700 text-sm mb-2"
              htmlFor="email"
              type="email"
              label="Correo"
              variant="filled"
              fullWidth
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            >
              Usuario
            </TextField>
            <TextField
              className="block text-gray-700 text-sm mb-2"
              htmlFor="password"
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            >
              Contraseña
            </TextField>
          </div>
          <button
            className="bg-green-600 hover:bg-green-800 transition-colors duration-300 text-base cursor-pointer"
            type="button"
            onClick={handleSubmit}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
