const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const registrarUsuario = async (req, res) => {
    const { nombre, apellido, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, apellido, correo, password, rol });
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //grabar el usuario
    await usuario.save()
    res.status(200).json({
        usuario
    });
}

const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const obtenerUsuarios = async (req, res) => {

    const { limit = 5, desde = 0 } = req.query;

    const usuarios = await Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limit));

    const total = await Usuario.countDocuments({ estado: true });
    res.status(200).json({
        total,
        usuarios
    });
}

const borrarUsuario = async (req, res) => {
    const { id } = req.params;


    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        usuario

    });
}

const obtenerPerfil = async (req, res) => {
   

    const { usuario } = req

    res.json({
        usuario
    })
}

module.exports = {
    registrarUsuario,
    actualizarUsuario,
    obtenerUsuarios,
    borrarUsuario,
    obtenerPerfil
}
