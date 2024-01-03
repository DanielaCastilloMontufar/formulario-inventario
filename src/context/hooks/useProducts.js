import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase'; // Asegúrate de importar el cliente de Supabase

export const useProducts = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        setIsLoading(true);

       
        const { data, error } = await supabase.from('equipos').select('*');
        if (error) {
          throw error;
        }

        setData(data);
        setIsError(false);
      } catch (error) {
        console.error('Error fetching equipos:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipos();
  }, [url]);

  return {
    equipos: data,
    isLoading,
    isError,
  };
};
