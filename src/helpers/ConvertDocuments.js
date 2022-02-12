export const ConvertDocuments = ( snapshot ) => {

    let documents = [];
    snapshot.forEach( snapHijo => {
        documents = [...documents, {
            id: snapHijo.id,
            ...snapHijo.data()
        }]
    });

    return documents;
}