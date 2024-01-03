

// import React from 'react'

import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import { useLogin } from "../context/LoginContext";
import { useEffect, useState } from 'react';
import { supabase } from '../utils/client';
import SummaryTile from './SummaryTile';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import {
  VerifiedUserOutlined,
  PhoneAndroidOutlined,
  LaptopOutlined,
  MouseOutlined,
  KeyboardOutlined,
  TimerOutlined,
  SupervisedUserCircle,
} from '@mui/icons-material';

const Dashboard = () => {

  const { userData, getUser } = useUsers();
  const navigate = useNavigate();
  const { user } = useLogin();


  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [numberOfLaptops, setNumberOfLaptops] = useState(0);
  const [numberOfMouses, setNumberOfMouses] = useState(0);
  const [numberOfKeyboards, setNumberOfKeyboards] = useState(0);
  const [numberOfPrinters, setNumberOfPrinters] = useState(0);
  const [refreshIn, setRefreshIn] = useState(30);

  console.log(user)

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
      getUser(user.id);
    }
  }, [user])

  const fetchData = async () => {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id');

    const { data: products, error: productsError } = await supabase
      .from('equipos')
      .select('id');

    const { data: laptops, error: laptopsError } = await supabase
      .from('equipos')
      .select('id')
      .ilike('title', '%LAPTOP%');
      console.log("LAPTOPS", laptops);

    const { data: mouses, error: mousesError } = await supabase
      .from('equipos')
      .select('id')
      .ilike('title', 'MOUSE');

    const { data: keyboards, error: keyboardsError } = await supabase
      .from('equipos')
      .select('id')
      .ilike('title', 'TECLADO');

    const { data: printers, error: printersError } = await supabase
      .from('equipos')
      .select('id')
      .ilike('title', 'IMPRESORA');

    if (!usersError) setNumberOfUsers(users.length || 0);
    if (!productsError) setNumberOfProducts(products.length || 0);
    if (!laptopsError) setNumberOfLaptops(laptops.length || 0);
    if (!mousesError) setNumberOfMouses(mouses.length || 0);
    if (!keyboardsError) setNumberOfKeyboards(keyboards.length || 0);
    if (!printersError) setNumberOfPrinters(printers.length || 0);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <Grid container spacing={2}>
      <SummaryTile
        title={numberOfUsers}
        subTitle="Usuarios"
        icon={<SupervisedUserCircle color="success" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={numberOfProducts}
        subTitle="Cantidad de equipos"
        icon={<PhoneAndroidOutlined color="primary" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={numberOfLaptops}
        subTitle="Cantidad de laptops"
        icon={<LaptopOutlined color="warning" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={numberOfMouses}
        subTitle="Cantidad de mouses"
        icon={<MouseOutlined color="secondary" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={numberOfPrinters}
        subTitle="Cantidad de impresoras"
        icon={<KeyboardOutlined color="warning" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={numberOfKeyboards}
        subTitle="Cantidad de teclados"
        icon={<KeyboardOutlined color="warning" sx={{ fontSize: 40 }} />}
      />

      <SummaryTile
        title={refreshIn}
        subTitle="Actualización en: "
        icon={<TimerOutlined color="secondary" sx={{ fontSize: 40 }} />}
      />
    </Grid>
  );
};

export default Dashboard;