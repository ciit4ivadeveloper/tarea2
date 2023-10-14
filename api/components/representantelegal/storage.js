const Model = require('./model')

async function agregarRepresentante( dato ) {
    const resultado = await new Model( dato )
    return resultado.save()
}

async function obtenerRepresentante( filtro_ruc ) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (filtro_ruc) {
            filtro = { ruc: filtro_ruc }
        }
        Model.find( filtro )            
            .populate({
                path:'empresas',
                populate:{
                    path: 'empresa',
                    model:'empresa'
                }
            })
            .exec()
            .then( data => {
                lista = []
                for (let elemento of data) { 
                    objeto = {                   
                        id:elemento._id,
                        ruc: elemento.ruc,
                        cedula: elemento.cedula,
                        nombre: elemento.nombre,
                        apellido: elemento.apellido,
                        email: elemento.email,
                        domicilio: elemento.domicilio,
                        telefono: elemento.telefono                        
                    }
                    objeto.empresas = []
                    for (let detalle of elemento.empresas) {
                        registro = { 
                            nombre: detalle.empresa.nombre,
                            ruc: detalle.empresa.ruc                            
                        }
                        objeto.empresas.push( registro )
                    }
                    lista.push( objeto )
                }                
                    resolve(lista)
            } )
            .catch (error => {
                reject(error)
            });         
    }) 
}


async function actualizarRepresentante(dato) {
    const nuevo_objeto = await Model.findOne( { cedula: dato.cedula } )

    nuevo_objeto.nombre = dato.nombre 
    nuevo_objeto.apellido = dato.apellido
    nuevo_objeto.email = dato.email 
    nuevo_objeto.domicilio = dato.domicilio 
    nuevo_objeto.telefono = dato.telefono 

    const resultado = await nuevo_objeto.save()
    return resultado
}

async function eliminarRepresentante(dato) {
    const resultado = await Model.deleteOne( {ruc: dato.ruc} )
    return resultado
}

module.exports = {
    agregar:agregarRepresentante,
    obtener:obtenerRepresentante,
    actualizar:actualizarRepresentante,
    eliminar:eliminarRepresentante
}