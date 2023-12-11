const generarJWT = require("../helpers/generarJWT");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');

const autenticarUsuario = async(req, res) => {

    const { correo, password } = req.body;

    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario y/o contraseña incorrecta'
            })
        }
        //verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(408).json({
                msg: 'Usuario restringido. Contacte al administrador'
            })
        }
        //verificar contraseña

        const verificarPassword = bcryptjs.compareSync(password, usuario.password);
        if(!verificarPassword){
            return res.status(400).json({
                msg: 'Usuario y/o contraseña incorrecta'
            })
        }
        //generar el jwt

        const token = await generarJWT(usuario.id)
        res.status(200).json({
           usuario,
           token
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Ups algo salio mal.! :('
        })
    }
}
module.exports = autenticarUsuario;