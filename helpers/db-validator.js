const { Categoria, Usuario, Producto } = require('../models');
const Role = require('../models/role');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async ( correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if ( existeEmail ) {
        throw new Error(`El email ${correo} ya esta registrado en la base de datos`)
    }
}

const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById(id)
    if ( !existeUsuario ) {
        throw new Error(`El id: ${id} no existe en la base de datos`)
    }
}

const existeCategoriaPorID = async ( id ) => {
    const existeCategoria = await Categoria.findById(id)
    if ( !existeCategoria ) {
        throw new Error(`El id: ${id} no existe en la base de datos`)
    }
}

const existeProductoPorID = async ( id ) => {
    const existeProducto = await Producto.findById(id)
    if ( !existeProducto ) {
        throw new Error(`El id: ${id} no existe en la base de datos`)
    }
}

const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion )
    if ( !incluida ) {
        throw new Error( `La coleccion ${ coleccion } no es permitida, ${ colecciones }` )
    }

    return true
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorID,
    existeProductoPorID,
    coleccionesPermitidas
};
