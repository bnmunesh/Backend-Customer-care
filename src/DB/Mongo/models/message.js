const {Schema, model} = require("mongoose");

const messageSchema = new Schema({
    text: {
        type:String,
        required: true,
    },
    sentBy:{
        type:String,
        required: true,
    }
})

const MessageModel = model("message", messageSchema);
module.exports = {MessageModel}