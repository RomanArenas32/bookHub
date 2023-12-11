const { Router } = require('express');
const autenticarUsuario = require('../controllers/auth.controllers');


const router = Router();


router.post('/login', autenticarUsuario);



module.exports = router;