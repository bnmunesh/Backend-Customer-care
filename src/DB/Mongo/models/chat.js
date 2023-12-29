const {Schema, model} = require("mongoose");

const chatSchema = new Schema({
    users:[{
        type: Schema.Types.ObjectId,
        ref: "user",
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "message",
    }],
    threadID:{
        type: String,
    },
    socketID: {
        type: String,
        required: true,
    }, 
})

const ChatModel = model("chat", chatSchema);
module.exports = {ChatModel}