
//Validacion de campos
export const Validate = (values) => {

    const errors = {};

    if(!values.nombre){
        errors.nombre = 'Este campo es obligatorio'
    }
    if(!values.razon_social){
        errors.razon_social = 'Este campo es obligatorio'
    }
    if(!values.nit){
        errors.nit = 'Este campo es obligatorio'
    }
    if(!values.telefono){
        errors.telefono = 'Este campo es obligatorio'
    }
    if(!values.codigo){
        errors.codigo = 'Este campo es obligatorio'
    }

    return errors;
}