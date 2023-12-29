const mongoose = require('mongoose')
const makeConnection = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/customerCare').then((data)=>console.log("mongo connected")).catch((e)=>console.log("couldn't make the mongo connection:",e))
}

module.exports ={ makeConnection}