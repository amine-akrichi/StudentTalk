const mongoose = require('mongoose')
const db='mongodb://localhost:27017/StudentsTalk'

const dbconnect = async () =>{
    try {
        await mongoose.connect(db)
        console.log('connected to MongoDB');
    }
    catch(err){
        console.error(err);
        process.exit(1)
    }
}

module.exports = dbconnect