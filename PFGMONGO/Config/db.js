const mongoose = require("mongoose");

//DB_MONGO = "mongodb+srv://ernesto:5pxxRajieMqw2RYw@cluster0.evjggq7.mongodb.net/PowerFitGym?retryWrites=true&w=majority";
DB_MONGO = "mongodb://localhost:27017/PowerFitGym"
const connectDb = async () => {
  try {
    await mongoose.connect(DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de Datos Conectada");
  } catch (error) {
    console.log(error);
    console.log("BackEnd detenido");
    process.exit(1);
  }
};

module.exports = connectDb;