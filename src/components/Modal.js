import React, { useContext, useState } from 'react'
import { ChallengeContext } from '../context/ChallengeContext';
import { addItem } from '../helpers/CRUDfirestore';
import { useForm } from '../hooks/useForm';
import { Validate } from '../helpers/Validate';
import { types } from '../types/types';

export const Modal = ({ modal, setModal }) => {

    const { store, dispatch } = useContext(ChallengeContext);
    const { reasonsSocial } = store;

    const [errorsForm, setErrorsForm] = useState({});

    const initialValues = {
        nombre: '',
        razon_social: 'S.A.C',
        nit: 0,
        telefono: 0,
        codigo: 0,
    }
    const [formValues, handleInputChange, handleReset] = useForm(initialValues);
    const { nombre, razon_social, nit, telefono, codigo } = formValues;

    const handleAdd = async () => {
        const item = await addItem(formValues);
        console.log("Document written with ID: ", item);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const result = Validate(formValues);
        setErrorsForm(result)

        if (!Object.keys(result).length) {
            handleAdd()
            handleReset();
            dispatch({ type: types.initial });
            setModal(!modal);
        }
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <h3 className='modal__title'>Nuevo registro</h3>
                <form className='form' onSubmit={handleOnSubmit}>

                    <div className='form__camp'>
                        <label className='form__name'>Nombre</label>
                        <div className='form__value'>
                            <input
                                name='nombre'
                                value={nombre}
                                onChange={handleInputChange}
                                type='text'
                                placeholder='Nombre'
                                className='form__input'
                                autoComplete='off'
                            />
                            {errorsForm.nombre && <span className='form__error'>{errorsForm.nombre}</span>}
                        </div>
                    </div>

                    <div className='form__camp'>
                        <label className='form__name'>Razon Social</label>
                        <div className='form__value'>
                            <select
                                name='razon_social'
                                value={razon_social}
                                onChange={handleInputChange}
                                className='form__input'
                            >
                                {
                                    reasonsSocial.map((item, index) => <option key={index} value={item}>{item}</option>)
                                }
                            </select>
                            {errorsForm.razon_social && <span className='form__error'>{errorsForm.razon_social}</span>}
                        </div>
                    </div>

                    <div className='form__camp'>
                        <label className='form__name'>Nit</label>
                        <div className='form__value'>
                            <input
                                name='nit'
                                value={nit}
                                onChange={handleInputChange}
                                type='number'
                                placeholder='Nit'
                                className='form__input'
                                autoComplete='off'
                            />
                            {errorsForm.nit && <span className='form__error'>{errorsForm.nit}</span>}
                        </div>
                    </div>

                    <div className='form__camp'>
                        <label className='form__name'>Telefono</label>
                        <div className='form__value'>
                            <input
                                name='telefono'
                                value={telefono}
                                onChange={handleInputChange}
                                type='number'
                                placeholder='Telefono'
                                className='form__input'
                                autoComplete='off'
                            />
                            {errorsForm.telefono && <span className='form__error'>{errorsForm.telefono}</span>}
                        </div>
                    </div>

                    <div className='form__camp'>
                        <label className='form__name'>Codigo</label>
                        <div className='form__value'>
                            <input
                                name='codigo'
                                value={codigo}
                                onChange={handleInputChange}
                                type='number'
                                placeholder='Codigo'
                                className='form__input'
                                autoComplete='off'
                            />
                            {errorsForm.codigo && <span className='form__error'>{errorsForm.codigo}</span>}
                        </div>
                    </div>

                    <div className='form__buttons'>
                        <button
                            type='button'
                            onClick={() => setModal(!modal)}
                            className='button'
                        >
                            Cancelar
                        </button>
                        <button
                            className='button'
                            type='submit'
                        >
                            Aceptar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
