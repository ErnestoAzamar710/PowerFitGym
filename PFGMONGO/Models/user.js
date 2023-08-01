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
    diaIn: {
        type: Date,
        default: Date.now()
    },
    ulDia:{
        type: String,
        default:"00-00-00"
    },
    plan:{
        type: String,
        default:"NINGUNO"
    },
    estado:{
        type: String,
        default:"INACTIVO"
    }
})
module.exports = mongoose.model('User', UserSchema);