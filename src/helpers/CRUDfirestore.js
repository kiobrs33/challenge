import { addDoc, collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import db from "../firebase/config";
import { ConvertDocuments } from "./ConvertDocuments";

//Referencia a LA BASE DE DATOS Y COLLECION
const empresasRef = collection(db, 'empresas');

export const addItem = async (dataItem) => {
    const docRef = await addDoc(
        empresasRef,
        dataItem
    );

    return docRef.id;
}

let lastDocument = null;

export const reiniciarPag = () => {
    lastDocument = null;
}

export const getItems = async (numeroData, searchValue = '') => {

    let q = null;

    if (searchValue.trim().length > 0) {
        q = query(
            empresasRef,
            where('nombre', '>=', searchValue),
            orderBy("nombre", 'asc'),
            limit(numeroData),
            startAfter(lastDocument),
        );
    } else {
        // Query para la consulta
        q = query(
            empresasRef,
            orderBy("nombre", 'asc'),
            limit(numeroData),
            startAfter(lastDocument),
        );
    }


    //Esperamos los datos de Firebase
    const querySnapshot = await getDocs(q);
    //Obtenemos en ultimo dato de LOTE de ITEMS
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    //Almacenando el ultimo documento de lote de datos
    lastDocument = lastDoc;

    //Tranformamos los datos en array de objetos simpple de leer
    const data = ConvertDocuments(querySnapshot);


    return data;
}

