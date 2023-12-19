import { useState } from 'react';
import { supabase } from '../utils/supabase';
import './EquipmentForm.css'; // Agrega un archivo CSS para estilos

const EquipmentForm = () => {
    const [formData, setFormData] = useState({
        active_type: '',
        images: [],
        area: '',
        brand: '',
        slug: '',
        model: '',
        serial: '',
        measures: '',
        color: '',
        state: '',
        tags: [],
        title: '',
        condition_use: '',
        quantity: 0,
        attendant: '',
    });

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date().toISOString();

        const { data, error } = await supabase.from('equipos').upsert([
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAccept = () => {
        // Ocultar el cuadro de diálogo de éxito
        setShowSuccessDialog(false);
        // Recargar la página
        window.location.reload();
    };

    return (
        <form className="equipment-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="field">
                    <label>
                        Tipo de Activo:
                        <input
                            type="text"
                            name="active_type"
                            value={formData.active_type}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="field">
                    <label>
                        Nombre del Equipo:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>

            <div className="form-row">
                <div className="field">
                    <label>
                        Cantidad:
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="field">
                    <label>
                        Marca:
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>

            <div className="form-row">
                <div className="field">
                    <label>
                        Modelo:
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="field">
                    <label>
                        Número de Serie:
                        <input
                            type="text"
                            name="serial"
                            value={formData.serial}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>

            <div className="form-row">
                <div className="field">
                    <label>
                        Medidas:
                        <input
                            type="text"
                            name="measures"
                            value={formData.measures}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="field">
                    <label>
                        Color:
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>

            <div className="form-row">
                <div className="field">
                    <label>
                        Estado:
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="field">
                    <label>
                        Condición de Uso:
                        <input
                            type="text"
                            name="condition_use"
                            value={formData.condition_use}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>

            <div className="form-row">
                <div className="field">
                    <label>
                        Etiquetas:
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="field">
                    <label>
                        Encargado del Equipo:
                        <input
                            type="text"
                            name="attendant"
                            value={formData.attendant}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>

            <div className="form-row">
                <div className="field">
                    <label>
                        Área:
                        <input
                            type="text"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="field">
                    <label>
                        Slug:
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>

            <div className="form-row">
                <button type="submit">Guardar</button>
            </div>

            {/* Cuadro de diálogo de éxito */}
            {showSuccessDialog && (
                <div className="success-dialog">
                    <p>Se ha guardado exitosamente</p>
                    <button onClick={handleAccept}>Aceptar</button>
                </div>
            )}
        </form>
    );
};

export default EquipmentForm;
