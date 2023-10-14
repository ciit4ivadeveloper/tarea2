const model = require('./model')

function get_representantelegal( filtro_representantelegal ) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (filtro_representantelegal) {
            filtro = { ruc: filtro_representantelegal }
        }
        model.find( filtro ) 
            .populate({
                path:'empresa',
            })

            .exec()
            .then(data => { 
                lista = []
                for (let elemento of data) {
                    objeto = { 
                        ruc:elemento.ruc,
                        nombre:elemento.nombre,
                        apellido:elemento.apellido,
                        email:elemento.email,
                        domicilio:elemento.domicilio,
                        telefono:elemento.telefono, 
                    }
                    objeto.detalles = []
                    for (let detalle of elemento.empresa) {
                        registro = { 
                            rucEmpresa: detalle.ruc,
                            nombreEmpresa:detalle.nombre,
                            domicilioEmpresa:detalle.domicilio,
                            telefonoEmpresa:detalle.telefono, 
                        }
                        objeto.detalles.push( registro )
                    }
                    lista.push( objeto )
                }
                resolve(lista)
                }) 
                .catch(error => {
                    reject(error)
                  });   
    }) 
}

function add_representantelegal( representantelegal ) { 

    const objeto = new model( representantelegal )
    objeto.save()
}

async function update_representantelegal( representantelegal ) {
    const objeto = await model.findOne( {ruc: representantelegal.ruc} )

    if ( objeto ) {
        objeto.estado = False
        return resultado = await objeto.save()
    } else {
        return null
    }
}

async function delete_representantelegal( representantelegal ) {
    return await model.deleteOne({ruc: representantelegal.ruc})
}

module.exports = {
    add: add_representantelegal,
    get: get_representantelegal,
    update: update_representantelegal,
    delete: delete_representantelegal
}