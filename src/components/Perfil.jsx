import { Box, Grid, Typography } from '@mui/material';
import { supabase } from '../utils/client';
import { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';
import ProductList from './ProductList';
import ProductCard from './ProductCard';
// import { useProducts } from '../context/hooks';

function PerfilPage() {
    // const { products, isLoading } = useProducts('/equipos');
    const [processData, setProcessData] = useState([]);
    const [processArea, setProcessArea] = useState([]);

    const { userData, getUser } = useUsers();
    // const [usuario, setUsuario] = useState(null)
    const navigate = useNavigate();
    const { user } = useLogin();

    useEffect(() => {
        if (user) {
            navigate("/perfil", { replace: true });
            getUser(user.id);
            console.log("USER",user)
        }
        else {
            navigate("/login");
          }
    }, [user]);

    console.log("antes", userData);
    // async function fetchProcess() {
    //     try {
    //         const { data, error } = await supabase
    //             .from('area_users')
    //             .select(`*,areas(name)`)
    //             .eq('id_area', userData.id);

    //         if (error) {
    //             console.error('Error fetching data:', error.message, error.details);
    //             return;
    //         }
    //         console.log("DESPUES", userData);
    //         setProcessData(data);
    //         console.log("DESPUES", userData);
    //     } catch (error) {
    //         console.error('Unexpected error:', error);
    //     }
    // }

    async function fetchProcess() {
        try {
            const { data, error } = await supabase
                .from('area_users')
                .select(`id_area, areas(name)`)
                .eq('id_user', userData.id)
                console.log("INFORMACION",data);
    
            if (error) {
                console.error('Error fetching data:', error.message, error.details);
                return;
            }
    
    
            if (data.length === 0) {
                console.warn('No areas found for the user with ID:', userData.id);
                return;
            }
    
            const areaNames = data.map((item) => item.areas.name);    
            setProcessArea(areaNames);
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    }


    useEffect(() => {
        fetchProcess()
    }, []);

    return (
        <>
            <Typography variant='h1' component='h1' color="#058237" sx={{ pt: 5 }}>
                {userData.name}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box display='flex' justifyContent='center'>
                        <Typography variant='h2' component='h2' color="#058237" sx={{ pt: 5 }}>
                            EMAIL:
                        </Typography>
                        <Typography variant='h3' component='h3' sx={{ pt: 5, pl: 2 }}>
                            {userData.email}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box display='flex' justifyContent='center'>
                        <Typography variant='h2' component='h2' color="#058237" sx={{ pt: 5, fontWeight: 800 }}>
                            ÁREA:
                        </Typography>
                        <Typography variant='h3' component='h3' sx={{ pt: 5, pl: 2, fontWeight: 500 }}>
                            {processArea.join(', ')}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Typography variant='h2' component='h2' color="#058237" sx={{ pt: 5, fontWeight: 600, mb: 5 }}>
                Productos a su cargo:
            </Typography>
            {/* <ProductList key={fetchProcess()} /> */}
            {<ProductCard/>}

        </>
    );
}

export default PerfilPage;
