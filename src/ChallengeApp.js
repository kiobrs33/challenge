import React, { useReducer } from 'react';

import db from './firebase/config';
import { ChallengeContext } from './context/ChallengeContext';
import { ChallengeReducer } from './reducer/ChallengeReducer';
import { Home } from './pages/Home';
import { types } from './types/types';
import { getItems } from './helpers/CRUDfirestore';

const initialState = {
    loading: false,
    data: [],
    more: true,
    reasonsSocial: [
        'S.A',
        'S.A.C',
        'S.R.L',
        'E.I.R.L',
        'S.A.A',
    ],
    //PARA RECIBIR LA CANTIDAD DE DATOS DESDE FIREBASE
    numberData: 10,
}

export const ChallengeApp = () => {
    const [store, dispatch] = useReducer(ChallengeReducer, initialState);
    const { numberData } = store;

    const load = async (value) => {

        dispatch({ type: types.start });

        let newData = await getItems(numberData, value);

        dispatch({ type: types.loaded, payload: newData });

        
    };


    return (
        <ChallengeContext.Provider value={{
            store,
            dispatch,
            load,
            db
        }}>
            <Home />
        </ChallengeContext.Provider>
    )
}
