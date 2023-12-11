const {model, Schema} = require('mongoose');


const BooksShema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
    },
    sinopsis: {
        type: String,
        required: [true, 'La sinopsis del libre es obligatoria']
    },
    urlFoto: {
        type: String,
        required: [true, 'La url de la fotografia es obligatoria']
    },
    urlDescarga: {
        type: String,
        required: [true, 'El link de descarga es obligatorio']
    },
});

module.exports = model('books', BooksShema);
