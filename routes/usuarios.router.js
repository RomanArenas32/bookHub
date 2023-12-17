const { Router } = require('express');
const { registrarUsuario, actualizarUsuario, obtenerUsuarios, borrarUsuario, obtenerPerfil } = require('../controllers/usuarios.controllers.js');
const router = Router();
const { check } = require('express-validator');
const validarToken = require('../middlewares/validarToken.js');
const { existeUsuarioPorId, esRoleValido, emailExiste } = require('../helpers/db-validators.js');
const { validarCampos } = require('../middlewares/validar-campos.js');
const checkAuth = require('../middlewares/checkAuth.js');



router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(emailExiste),
        check('rol').custom(esRoleValido),
        validarCampos
], registrarUsuario);


router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos
], actualizarUsuario);

router.get('/search', obtenerUsuarios);

router.delete('/:id', [
        validarToken,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], borrarUsuario);

router.get('/perfil', checkAuth, obtenerPerfil);

module.exports = router;

