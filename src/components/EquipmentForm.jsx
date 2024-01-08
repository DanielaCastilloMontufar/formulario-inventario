
import { useState } from 'react';
import { supabase } from '../utils/client';
import './EquipmentForm.css';
import Layout from './Layout';

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

    const stateOptions = ['NUEVO', 'OBSOLETO', 'EN USO'];
    const yesNoOptions = ['SI', 'NO'];

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convertir a mayúsculas
        const formattedValue = name !== 'slug' ? value.toUpperCase() : value;

        // Actualizar el valor del campo "slug" según "title" y "serial"
        if (name === 'title' || name === 'serial') {
            const formattedTitle = formData.title.toLowerCase().replace(/\s+/g, '_');
            const formattedSerial = formData.serial.toLowerCase().replace(/\s+/g, '_');
            setFormData((prevData) => ({
                ...prevData,
                [name]: formattedValue,
                slug: `${formattedTitle}_${formattedSerial}`,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: formattedValue,
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
    const sortedStateOptions = stateOptions.slice().sort();

    return (
        <Layout>
            <form className="equipment-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="field">
                        <label className='text-xs font-semibold'>
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
                        <label className='text-xs font-semibold'>
                            Nombre del Equipo:
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="field">
                        <label className='text-xs font-semibold'>
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
                        <label className='text-xs font-semibold'>
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
                        <label className='text-xs font-semibold'>
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
                        <label className='text-xs font-semibold'>
                            Número de Serie:
                            <input
                                type="text"
                                name="serial"
                                value={formData.serial}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="field">
                        <label className='text-xs font-semibold'>
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
                        <label className='text-xs font-semibold'>
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
                        <label className='text-xs font-semibold'>
                            Estado:
                            <div className="styled-select">
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="styled-select"
                                >
                                    <option value="">Selecciona una opción</option>
                                    {sortedStateOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </label>
                    </div>
                    <div className="field">
                        <label className='text-xs font-semibold'>
                            Condición de Uso:
                            <div className="styled-select">
                                <select
                                    name="condition_use"
                                    value={formData.condition_use}
                                    onChange={handleChange}
                                    className="styled-select"
                                >
                                    <option value="">Selecciona una opción</option>
                                    {yesNoOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </label>
                    </div>

                    <div className="field">
                        <label className='text-xs font-semibold'>
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

                    <div className="field">
                        <label className='text-xs font-semibold'>
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


                </div>

                <div className="form-row">
                    <div className="field">
                        <label className='text-xs font-semibold'>
                            Slug:
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                readOnly
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <button type="submit">Guardar</button>
                    </div>
                    <div className="field"></div>
                    <div className="field"></div>
                </div>



                {showSuccessDialog && (
                    <div className="success-dialog">
                        <p>Se ha guardado exitosamente</p>
                        <button onClick={handleAccept}>Aceptar</button>
                    </div>
                )}
            </form>
        </Layout>
    );
};

export default EquipmentForm;
