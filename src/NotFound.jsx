import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/login");            
        }, 5000);
    }, [navigate])
  return (
    <div>Cargando...</div>
  )
}

export default NotFound