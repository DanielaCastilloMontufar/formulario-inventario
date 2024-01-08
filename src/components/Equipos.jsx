import { useEffect, useState } from "react";
import { AddOutlined, DownloadOutlined } from "@mui/icons-material";
import { Button, CardMedia, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
// import { saveAs } from 'file-saver';
import { supabase } from "../utils/client"; // Asegúrate de importar tu configuración de Supabase
import jsPDF from "jspdf";
import "jspdf-autotable"; // Si estás utilizando la función autoTable de jsPDF
import JsBarcode from "jsbarcode";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import Layout from "./Layout";
import Loading from "./Loading";

const columns = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }) => {
      return (
        <CardMedia
          component="img"
          className="fadeIn"
          image={`/products/${row.img}`}
          alt={row.title}
        />
      );
    },
  },
  {
    field: "title",
    headerName: "Nombre",
    width: 280,
    renderCell: ({ row }) => {
      return (
        <Link href={`/informacion/${row.id}`} underline="always">
          {row.title}
        </Link>
      );
    },
  },
  { field: "area", headerName: "Área", width: 200 },
  { field: "brand", headerName: "Marca", width: 250 },
  { field: "state", headerName: "Estado", width: 150 },
  { field: "attendant", headerName: "Encargado", width: 250 },
];

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { getSessionAuth } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionAuth = async () => {
      const session = await getSessionAuth();
      if (session) {
        await fetchData();
        setLoading(false);
      } else {
        navigate("/", { replace: true });
      }
    };
    sessionAuth();
  }, []);

  const handleDownloadExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Productos");
    XLSX.writeFile(workbook, "productos.xlsx");
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

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("equipos").select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <Layout>
      {loading && <Loading />}
      <Grid>
        <div className="flex items-center justify-between">
          <h1 className="text-[#058237] font-semibold text-3xl">
            LISTADO DE EQUIPOS
          </h1>
          <div>
            <Button
              startIcon={<AddOutlined />}
              color="secondary"
              href="/formulario-equipo"
              className="hover:text-white"
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
          </div>
        </div>
        <p className="mt-5">
          Haz click en la imagen para ver el producto y haz click en el nombre
          para poder editarlo{" "}
        </p>
        <Grid container className="fadeIn">
          <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
            <DataGrid rows={data} columns={columns} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductsPage;
