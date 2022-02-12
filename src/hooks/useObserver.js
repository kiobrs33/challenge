import { useEffect, useRef, useState } from "react"

export const useObserver = (options) => {

    //Elementos OBSERVADOS
    const [elements, setElements] = useState([]);

    //Elementos por OBSERVAR - ENTRAS NUEVAS que deseamos observar
    const [entries, setEntries] = useState([]);

    //UseRef te permite guardar una instancia y ser utilizada las veces que desees
    //Evitar crear varias instancias de INTERSECTION OBSERVER
    const observador = useRef(new IntersectionObserver(observedEntries => {
        console.log(observedEntries);
        setEntries(observedEntries);
    }, options));

    useEffect(() => {
        const currentObserver = observador.current;
        //Deconectar a los elementos ya observados
        currentObserver.disconnect();

        //Si hay nuevos elementos le agregamos un observador
        if (elements.length > 0) {
            elements.forEach(element => currentObserver.observe(element));
        }

        return () => {
            if( currentObserver ){
                currentObserver.disconnect();
            }
        }
    }, [elements])


    return [observador.current, setElements, entries]
}