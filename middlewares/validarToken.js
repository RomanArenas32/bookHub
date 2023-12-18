const jwt = require('jsonwebtoken');

const validarToken = (req, res, next)=>{
    const token = req.header('token');

    if(!token){
        return res.status(401).json({
            msg: 'No posee permisos para dicha accion. Inicie sesion como administrador'
        })
    }
    try {

        //verifica que el token sea valido con la variable de entorno que se usa para firmar el mismo
        const {uid} = jwt.verify(token, process.env.SECRET);
        req.uid = uid;
        
        next();
    } catch (error) {
         res.status(401).json({
            msg: 'Token no valido'
        })
    }
    next();
}


module.exports = validarToken;