// // import React from 'react'
// import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
// import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
// import { GridColDef, GridValueGetterParams, DataGrid, GridCellParams } from '@mui/x-data-grid';
// import { useEffect, useState } from "react";
// import { supabase } from "../utils/client";

// const columns = [
//     // {
//     //     field: 'img',
//     //     headerName: 'Foto',
//     //     renderCell: ({ value, row }) => {
//     //         return (
//     //             <a href={`/equipos/${row.slug}`} target="_blank" rel="noreferrer">
//     //                 <CardMedia
//     //                     component='img'
//     //                     className="fadeIn"
//     //                     image={`/equipos/${row.img}`}
//     //                     alt={row.title}
//     //                 />
//     //             </a>
//     //         );
//     //     },
//     // },
//     {
//         field: 'title',
//         headerName: 'Nombre',
//         width: 280,
//         renderCell: ({ value, row }) => {
//             return (
//                 <Link to={`/equipos/${row.slug}`} underline='always'>
//                     {row.title}
//                 </Link>
//             );
//         },
//     },
//     { field: 'area', headerName: 'Área', width: 200 },
//     { field: 'brand', headerName: 'Marca', width: 250 },
//     { field: 'state', headerName: 'Estado', width: 150 },
//     { field: 'attendant', headerName: 'Encargado', width: 250 },
// ];

// const Equipos = () => {

//     const [processData, setProcessData] = useState([]);


//     async function fetchProcess() {
//         try {
//             const { data, error } = await supabase
//                 .from('equipos')
//                 .select('*');

//             if (error) {
//                 console.error('Error fetching data:', error.message, error.details);
//                 return;
//             }

//             setProcessData(data);
//             console.log(data);

//             const rows = data.map(product => ({
//                 id: product._id,
//                 img: product.images[0],
//                 title: product.title,
//                 area: product.area,
//                 brand: product.brand,
//                 state: product.state,
//                 attendant: product.attendant,
//                 slug: product.slug,
//             }));

//         } catch (error) {
//             console.error('Unexpected error:', error);
//         }

//         useEffect(() => {
//             fetchProcess();
//         }, []);

//         return (
//             <Grid marginTop={15}>
//                 <AdminLayout
//                     title={`Equipos (${data.length})`}
//                     subTitle={'Mantenimiento de equipos'}
//                 >
//                     <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
//                         <Button
//                             startIcon={<AddOutlined />}
//                             color="secondary"
//                             href="/admin/products/new"
//                         >
//                             Crear producto
//                         </Button>
//                         <Button
//                             startIcon={<CategoryOutlined />}
//                             color="secondary"
//                             onClick={handleDownloadExcel}
//                             sx={{ ml: 1 }}
//                         >
//                             Descargar Excel
//                         </Button>
//                     </Box>
//                     <p>Haz click en la imagen para ver el producto y haz click en el nombre para poder editarlo </p>
//                     <Grid container className='fadeIn'>
//                         <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
//                             <DataGrid
//                                 rows={rows}
//                                 columns={columns}
//                             />
//                         </Grid>
//                     </Grid>
//                 </AdminLayout>
//             </Grid>
//         );
//     };

//     export default Equipos;

import { useEffect, useState } from 'react';
import { AddOutlined, DownloadOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
import { supabase } from '../utils/client'; // Asegúrate de importar tu configuración de Supabase
import jsPDF from "jspdf";
import "jspdf-autotable"; // Si estás utilizando la función autoTable de jsPDF
import JsBarcode from "jsbarcode";
import { useUsers } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';

const columns = [
    {
        field: 'img',
        headerName: 'Foto',
        renderCell: ({ row }) => {
            return (
                <CardMedia
                    component='img'
                    className="fadeIn"
                    image={`/products/${row.img}`}
                    alt={row.title}
                />
            );
        },
    },
    {
        field: 'title',
        headerName: 'Nombre',
        width: 280,
        renderCell: ({ row }) => {
            return (
                <Link href={`/informacion/${row.slug}`} underline='always'>
                    {row.title}
                </Link>
            );
        },
    },
    { field: 'area', headerName: 'Área', width: 200 },
    { field: 'brand', headerName: 'Marca', width: 250 },
    { field: 'state', headerName: 'Estado', width: 150 },
    { field: 'attendant', headerName: 'Encargado', width: 250 },
];

const ProductsPage = () => {
    const [data, setData] = useState([]);
    const { userData, getUser } = useUsers();
    // const [usuario, setUsuario] = useState(null)
    const navigate = useNavigate();
    const { user } = useLogin();

    console.log(user)

    useEffect(() => {
        if (user) {
            navigate("/equipos", { replace: true });
            getUser(user.id);
        }
        else {
            navigate("/login");
          }
    }, [user])


    const handleDownloadExcel = () => {
        const sheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheet, 'Productos');
        XLSX.writeFile(workbook, 'productos.xlsx');
    };

    const handleDownloadPDF = () => {
        const pdf = new jsPDF();

        const rowsPerPage = 6; // Ajusta el número de filas por página 
        const columnsPerPage = 3; // Ajusta el número de columnas por página 

        data.forEach((product, index) => {
            if (index > 0 && index % (rowsPerPage * columnsPerPage) === 0) {
                pdf.addPage();
            }

            const colIndex = index % columnsPerPage;
            const rowIndex = Math.floor(index / columnsPerPage) % rowsPerPage;

            const startX = colIndex * 70 + 10; // Ajusta el espaciado y las coordenadas 
            const startY = rowIndex * 60 + 20; // Ajusta el espaciado y las coordenadas 

            // Usa JsBarcode para agregar el código de barras
            const canvas = document.createElement("canvas");
            JsBarcode(canvas, product.id, { format: "CODE128" });
            const barcodeDataURL = canvas.toDataURL("image/png");
            pdf.addImage(barcodeDataURL, "PNG", startX, startY, 58, 20); // Ajusta las coordenadas y el tamaño según diseño

            // Ajusta el tamaño y la posición del texto del nombre
            pdf.setFontSize(10);
            pdf.text(product.title, startX, startY + 30); // Ajusta las coordenadas según diseño
        });

        // Guarda o descarga el PDF
        pdf.save("equipos.pdf");
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('equipos')
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
                    href="/formulario-equipo"
                >
                    Crear producto
                </Button>
                <Button
                    startIcon={<DownloadOutlined />}
                    color="secondary"
                    onClick={handleDownloadPDF}
                    sx={{ ml: 1 }}
                >
                    Descargar Etiquetas
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
            <p>Haz click en la imagen para ver el producto y haz click en el nombre para poder editarlo </p>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                    />
                </Grid>
            </Grid>
        </Grid>
        //   </Grid >
    );
};

export default ProductsPage;
