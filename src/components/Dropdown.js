import React, { useContext, useEffect, useRef, useState } from 'react';

import { ChallengeContext } from '../context/ChallengeContext';
import { reiniciarPag } from '../helpers/CRUDfirestore';
import { useForm } from '../hooks/useForm';
import { types } from '../types/types';
import { Modal } from './Modal';


export const Dropdown = () => {
    //Importando datos del store
    const { store, load, dispatch } = useContext(ChallengeContext);
    const { data, more, loading } = store;

    //Input para el buscador
    const initialValues = { textSearch: '' };
    const [{ textSearch }, handleInputChange, handleReset] = useForm(initialValues);

    //Para controlar el DROPDOWN ABIERTO O CERRADO
    const [active, setActive] = useState(false);

    //Creando una Referencia de la funcion de Consulta a labase de datos
    const loader = useRef(load);

    //Para el input de busqueda
    const handleOnSubmit = (e) => {
        e.preventDefault();

        //Se hace la busqueda
        if (active == false) {
            load(textSearch)
        }

        //Cuando se oculta el dropdown
        if (active === true) {
            handleReset();
            reiniciarPag();
            dispatch({ type: types.initial })
        }

        //Cambio el estado de DROWDOWN
        setActive(!active)
    }

    // Creando el OBSERVADOR e instaciado solo una vez
    const observer = useRef(
        new IntersectionObserver(
            //Recibe una lista de objetos

            entries => {

                //Se obtiene el primer ITEM
                const first = entries[0];

                //Se obtiene el VALOR DE LOAD true o false
                if (first.isIntersecting) {
                    loader.current();
                }
            },
            //Solo se ejecutara el Callback cuando el item este al 100% dentro del ROOT
            {
                root: document.querySelector('#scrollArea'),
                threshold: 1
            }
        )
    );

    const [element, setElement] = useState(null);



    // useEffect(() => {
    //     loader.current = load;
    // }, [load]);


    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        //para el proximo render se eliminar el ELEMENTO OBSERVADO y no acumular objetos observados innsesarios
        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);


    //Para controlar el Modal
    const [modal, setModal] = useState(false);

    return (
        <>
            <div className='dropdown'>
                <form className='dropdown__header' onSubmit={handleOnSubmit}>
                    <input
                        name='textSearch'
                        value={textSearch}
                        placeholder='Nombre'
                        onChange={handleInputChange}
                        className='dropdown__input'
                        autoComplete='off'
                        disabled={active}
                    />
                    <button
                        type='submit'
                        className='dropdown__btn'
                    >
                        {active ? 'cerrar' : 'buscar'}
                    </button>
                </form>

                {
                    active && (
                        <div className={`dropdown__content`} id='scrollArea' >
                            <div className='dropdown__item pointer' onClick={() => setModal(!modal)} >
                                Insertar nuevo dato
                            </div>

                            {data.map(item => (
                                <div key={item.id} className='dropdown__item'>
                                    {`${item.codigo} - ${item.nombre}.${item.razon_social}`}
                                </div>
                            ))}

                            {loading && <div className='dropdown__item'>Cargando...</div>}

                            {!loading && more && (
                                <div className='dropdown__item transparent' ref={setElement}></div>
                            )}
                        </div>
                    )
                }

            </div>
            {
                modal && <Modal modal={modal} setModal={setModal} />
            }

        </>
    )
}
