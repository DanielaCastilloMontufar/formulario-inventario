// import React from 'react'
// const columns = [

import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import { useLogin } from "../context/LoginContext";
import { useEffect, useState } from "react";
import { supabase } from "../utils/client";
import { Box, Button, Grid } from "@mui/material";
import { AddOutlined, DownloadOutlined } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from 'xlsx';

const columns = [

  {
      field: 'name',
      headerName: 'Nombre',
      width: 280,
      renderCell: ({ row }) => {
        return (
            <div>
                {row.name}
            </div>
        );
    },
  },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Rol', width: 250 },
];

const Usuarios = () => {
  const [data, setData] = useState([]);
  const { userData, getUser } = useUsers();
  // const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate();
  const { user } = useLogin();

  console.log(user)

  useEffect(() => {
    if (user) {
      navigate("/usuarios", { replace: true });
      getUser(user.id);
    }
    else {
        navigate("/login");
      }
  }, [user])

  const handleDownloadExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Usuarios');
    XLSX.writeFile(workbook, 'usuarios.xlsx');
};

  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*');

            if (error) {
                console.error("Error fetching data:", error);
            } else {
                setData(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    fetchData();
}, []);

  return (
    <Grid marginTop={15}>
            <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
                <Button
                    startIcon={<AddOutlined />}
                    color="secondary"
                    href="/formulario-usuarios"
                >
                    Crear usuario
                </Button>
                <Button
                    startIcon={<DownloadOutlined />}
                    color="secondary"
                    onClick={handleDownloadExcel}
                    sx={{ ml: 1 }}
                >
                    Descargar Excel
                </Button>
            </Box>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                    />
                </Grid>
            </Grid>
        </Grid>
  );
};

export default Usuarios