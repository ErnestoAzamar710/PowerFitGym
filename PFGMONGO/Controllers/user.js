const User = require('../Models/user');
const ObjectId = require('mongoose').Types.ObjectId;
exports.addUser = async (req,res) => {
    try {
        let user;
        user = new User(req.body);
        await user.save();
        res.send(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}   

exports.getUsers = async (req,res) => {
    try {
        const users = await User.find();
        return res.json(users);    
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

exports.getUid = async (req, res) => {
    try {
        const uid  = req.params.uid;
        let user = await User.findOne({uid:uid}); // Utilizamos findOne para buscar por el campo uid
        if (!user) {
            return res.status(404).json({ msg: "El usuario no existe" });
        }
        return res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}
exports.deleteUid = async (req, res) => {
    try {
        const uid  = req.params.uid;
        let user = await User.findOneAndDelete({uid:uid}); // Utilizamos findOne para buscar por el campo uid
        if (!user) {
            return res.status(404).json({ msg: "El usuario no existe" });
        }
        return res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}
exports.actUid = async (req,res)=>{
    try{
        const uid  = req.params.uid;
        const cambios = req.body;
        let user = await User.findOneAndUpdate({uid:uid},{$set:cambios});
        if(!user){
            return res.status(404).json({ msg: "El usuario no existe" });
        }
        let userC = await User.findOne({uid:uid});
        res.send(userC);
    }
    catch (error){
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}