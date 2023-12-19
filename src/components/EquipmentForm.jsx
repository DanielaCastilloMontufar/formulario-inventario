// EquipmentForm.jsx
import { useState } from 'react';
import { supabase } from '../utils/supabase';
import './EquipmentForm.css';

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

    const areaOptions = [
        'TECNOLOGIA DE INFORMACION',
        'CONTABILIDAD',
        'COMERCIAL',
        'CAJA',
        'PROTESTOS',
        'ORIGEN',
        'SECRETARIA',
        'SALON VITOR',
        'SALON CERVESUR',
        'LEGAL',
        'DIRECTORIO 3',
        'SALON 1',
        'SALON 2',
        'SALON 3',
        'AUDITORIO',
        'COCINA',
        'BAÑO PERSONAL',
        'BAÑO SALON CERVESUR',
        'BAÑO AUDITORIO',
        'HALL PRIMERA CASONA',
        'HALL SEGUNDA CASONA',
        'MENSAJERIA',
        'GERENCIA',
        'SUBGERENCIA',
        'ARBITRAJE',
        'ARBITRAJE 2',
        'SECRETARIA ARBITRAL',
    ];

    const attendantOptions = [
        'FABIOLA LÓPEZ CHIRINOS',
        'KATHERINE SUEROS',
        'RUTH VARGAS',
        'ALEJANDRA ALVARADO',
        'GONZALO ZAVALAGA',
        'TAMARA NUÑEZ',
        'DANIELA BENAVENTE',
        'ANTONIO ESCALANTE',
        'JOCELYN CARI',
        'GERALDINE MARQUÉZ',
        'MÓNICA TORRES',
        'GUSTAVO CHIRINOS',
        'BROSWI GALVEZ',
        'SALOMÉ GALDOS',
        'JUAN JAVIER',
        'LUCIANO YNCA',
        'LUDOVINA VILLANUEVA',
        'JIMENA HURTADO',
        'MILUSKA MANRIQUE',
        'JUAN JOSE TICONA',
        'DIEGO VALDIVIA',
        'GIORDANO ARIAS',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Actualizar el valor del campo "slug" según "title" y "serial"
        if (name === 'title' || name === 'serial') {
            const formattedTitle = formData.title.toLowerCase().replace(/\s+/g, '_');
            const formattedSerial = formData.serial.toLowerCase().replace(/\s+/g, '_');
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                slug: `${formattedTitle}_${formattedSerial}`,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

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

    const handleAccept = () => {
        setShowSuccessDialog(false);
        window.location.reload();
    };

    const sortedAttendantOptions = attendantOptions.slice().sort();
    const sortedAreaOptions = areaOptions.slice().sort();

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
                        <div className="styled-select">
                            <select
                                name="attendant"
                                value={formData.attendant}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona una opción</option>
                                {sortedAttendantOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>
                </div>
            </div>

            <div className="form-row">
                <div className="field">
                    <label>
                        Área:
                        <div className="styled-select">
                            <select
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                className="styled-select"
                            >
                                <option value="">Selecciona una opción</option>
                                {sortedAreaOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
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
                            readOnly // Para que el usuario no pueda modificar el slug directamente
                        />
                    </label>    
                </div>
            </div>

            <div className="form-row">
                <button type="submit">Guardar</button>
            </div>

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
