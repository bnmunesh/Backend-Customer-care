const {ChatModel} = require("../models/chat");
const {MessageModel} = require("../models/message")

class ChatRepo {
    async CreateConvo({message, socketID}){
        try {
            console.log("\n\n\n\n\n", "!!!!!!!!!!!!!!!!!!!!!");
            const convo = new ChatModel({socketID});
            await convo.save();
            
            return {success: true, data: convo, error: null};
        } catch (error) {
            console.log("error while creating convo in chat repo:", error);
            return {success: false, data: null, error};
        }
    }

    async GetConvo({convoID}){
        try {
            const convo = await ChatModel.findById(convoID);
            if(convo)return {success: convo ? true : false, data: convo, error: convo ? null : "invalid chatID"};
        } catch (error) {
            console.log("error while getting convo from chat repo:", error);
            return {success: false, data: null, error}
        }
    }

    async addMessageToConvo({msg, convoID, sentBy}){
        try {
            const message = new MessageModel({text:msg, sentBy})
            await message.save();
            const convo = await ChatModel.findById(convoID);
            console.log("chat and message from repo", {message, convo})
            if(convo){
                if(convo.messages){
                    convo.messages.push(message._id);
                    await convo.save();
                }else{
                    convo.message = [message._id]
                }
                return {success: true, data: convo, error: null}
            }
            return {success: false, data: null, error: "invalid-id"}
        } catch (error) {
            console.log("Error while adding a message to a conversation in chat repo:", error);
            return {success: false, data: null, error}
        }
    }

    async addMessageAndSocketId({convoID, socketID, messageText}){
        try {
            const chat = await ChatModel.findById(convoID)
            if(chat){
                const msg = new MessageModel({text: messageText, sentBy: "user"})
                await msg.save();
                chat.socketID = socketID;
                chat.messages.push(msg._id);
                await chat.save()
                return {success: true, data:chat, error: null};
            }
            return {success: false, data:null, error: "invalid chatID"};
        } catch (error) {
            console.log('error while adding messaeg to db', error);
            return {success: false, data: null, error: error}
        }
    }
}

module.exports = {ChatRepo}