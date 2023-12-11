const Book = require('../models/book');

const obtenerLibros = async (req, res) => {

    const { limit = 5, desde = 0 } = req.query;

    const books = await Book.find()
        .skip(Number(desde))
        .limit(Number(limit));

    const total = await Book.countDocuments();
    console.log(total)
    res.status(200).json({
        total,
        books
    });
}

const registrarLibro = async (req, res) => {
    const { titulo, sinopsis, urlFoto, urlDescarga } = req.body;
    const book = new Book({ titulo, sinopsis, urlFoto, urlDescarga });
    //grabar el libro
    await book.save()

    res.status(200).json({
        book
    });
}

const borrarLibro = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        res.status(200).json({
            book,
        });
    } catch (error) {
        res.json({
            msg: "Libro no encontrado. Intentelo mas tarde!"
        })
    }
}

const obtenerLibrosPorNombre = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const results = await Book.find({ titulo: { $regex: keyword, $options: 'i' } });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar libros.' });
    }
};
module.exports = {
    obtenerLibros,
    registrarLibro,
    borrarLibro,
    obtenerLibrosPorNombre
}