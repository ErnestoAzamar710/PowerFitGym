const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true 
    },
    nombre:{
        type: String,
        required: true
    },
    foto:{
        type:String,
        default: ""
    },
    email:{
        type: String,
        required: true
    },
    telefono:{
        type: Number,
        required: true
    },
    plan:{
        type: String,
        default:"NINGUNO"
    },
    estado:{
        type: String,
        default:"INACTIVO"
    },
    ulDia:{
        type: String,
        default:"00-00-00"
    },
    diaIn: {
        type: Date,
        default: Date.now()
    },
    ulPago:{
        type: String,
        default:"00-00-00"
    }
})
module.exports = mongoose.model('User', UserSchema);