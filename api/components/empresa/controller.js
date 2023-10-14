const storage = require('./storage')

function agregarEmpresa( dato ) {
    return new Promise((resolve, reject) => {
        resolve( storage.agregar( dato ) )
    })
}

function obtenerEmpresa( filtro ) {
    return new Promise((resolve, reject) => {
        resolve( storage.obtener( filtro ) )
    })
}

function actualizarEmpresa( dato ) {
    return new Promise((resolve, reject) => {      
        resolve( storage.actualizar( dato ) )
    })
}

function eliminarEmpresa( dato ) {
    return new Promise((resolve, reject) => {
        resolve( storage.eliminar( dato ) )
    })    
}

module.exports = {
    agregarEmpresa,
    obtenerEmpresa,
    actualizarEmpresa,
    eliminarEmpresa
}