const usuariosGet = (req, res) => {
    res.status(200).json({
        msg: "Peticion get"
    });
}

const usuariosPost = (req, res) => {
    res.status(200).json({
        msg: "Peticion Post",
    });
}
const usuariosPut = (req, res) => {
    res.status(200).json({
        msg: "Peticion Put",
    });
}
const usuariosPatch = (req, res) => {
    res.status(200).json({
        msg: "Peticion Patch"
    });
}
const usuariosDelete = (req, res) => {
    res.status(200).json({
        msg: "Peticion Delete"
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}