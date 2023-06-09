const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Obtener la cadena de conexión desde las variables de entorno
    const dbURI = process.env.DB_URI;

    // Conectar a la base de datos
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
//mucho ruido abajo, por eso le dije a paola jajaja de lo que hago la mitad o mas es por q estan ahy la otra por q me divierto
/** con ustedes entonces me dejan en paz y se acaba todo y vos ps si quieres subi seguimos aumentamos el nivel subimos mas */
module.exports = connectDB;
