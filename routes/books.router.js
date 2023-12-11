const { Router } = require('express');
const { obtenerLibros, registrarLibro, borrarLibro, obtenerLibrosPorNombre } = require('../controllers/books.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', obtenerLibros);

router.post('/', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('sinopsis', 'La sinopsis es obligatoria').not().isEmpty(),
    check('urlFoto', 'La url de la fotografia es obligatoria').not().isEmpty(),
    check('urlDescarga', 'El link de descarga es obligatorio').not().isEmpty(),
    validarCampos
], registrarLibro);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], borrarLibro);


router.get('/search', obtenerLibrosPorNombre);

module.exports = router;