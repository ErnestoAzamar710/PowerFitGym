const express = require('express');
const connectDb = require('./Config/db');
const cors = require('cors');
const app = express();

connectDb();

app.use(cors());
app.use(express.json());    
app.use("/users", require('./Routes/users'))
app.listen(4000, () => {
    console.log("Servidor corriendo en el puerto 4000")
})
