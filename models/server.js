const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        //variables
        this.PORT = process.env.PORT
        this.pathUsuarios = '/api/usuarios'

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    middlewares() {
        //cors
        this.app.use(cors());
        //leer json
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
       this.app.use(this.pathUsuarios, require('../routes/usuarios.router'))
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Corriendo`, this.PORT)
        })
    }
}
module.exports = Server;