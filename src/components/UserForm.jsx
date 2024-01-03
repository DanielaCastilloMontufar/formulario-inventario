import { useState } from 'react';
import { supabase } from '../utils/client';
import './EquipmentForm.css';
import { Typography } from '@mui/material';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const roleOptions = [
        'client',
        'admin',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date().toISOString();

        const { data, error } = await supabase.from('users').upsert([
            {
                updated_at: now,
                ...formData,
            },
        ]);

        if (error) {
            console.error('Error al guardar en la base de datos:', error);
        } else {
            console.log('Datos guardados exitosamente:', data);
            // Mostrar el cuadro de diálogo de éxito
            setShowSuccessDialog(true);
        }
    };

    const handleAccept = () => {
        setShowSuccessDialog(false);
        window.location.reload();
    };

    const sortedAttendantOptions = roleOptions.slice().sort();

    return (
        <form className="equipment-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="field">
                    <Typography variant='subtitle1' component='subtitle1'>
                        Nombre:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Typography>
                </div>
                <div className="field">
                    <Typography variant='subtitle1' component='subtitle1'>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Typography>
                </div>
                <div className="field">
                    <Typography variant='subtitle1' component='subtitle1'>
                        Contraseña:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Typography>
                </div>

                <div className="field">
                    <Typography variant='subtitle1' component='subtitle1'>
                        Rol:
                        <div className="styled-select">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="styled-select"
                            >
                                <option value="">Selecciona una opción</option>
                                {sortedAttendantOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Typography>
                </div>

                </div>



            <div className="form-row">
                    <button type="submit">Guardar</button>
                </div>
                <div className="field"></div>
                <div className="field"></div>

            


            {showSuccessDialog && (
                <div className="success-dialog">
                    <p>Se ha guardado exitosamente</p>
                    <button onClick={handleAccept}>Aceptar</button>
                </div>
            )}
        </form>
    );
};

export default UserForm;
