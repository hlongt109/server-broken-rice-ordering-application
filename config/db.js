const mongooes = require('mongoose');
mongooes.set('strictQuery' , true)
const url_db = "mongodb+srv://devdeptrai102:devdeptrai102@cluster0.tsxssyz.mongodb.net/ComTam"
const connect = async () =>{
    try {
        await mongooes.connect(url_db)
        console.log('Connect success');
    } catch (error) {
        console.log("error :"+ error);
        console.log('Connect failed');
    }
}

module.exports = {connect}