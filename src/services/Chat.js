class ChatService {
    constructor(ChatRepo){
        this.CR = ChatRepo;
    }


    async CreateConvo({ socketID}){
        return this.CR.CreateConvo({ socketID});
    }


    async GetConvo({convoID}){
        return this.CR.GetConvo({convoID});
    }

    async addMessageToConvo({msg, convoID, sentBy}){
        return this.CR.addMessageToConvo({msg, convoID, sentBy})
    }
    async addMessageAndSocketId({convoID, socketID, messageText}){
        return this.CR.addMessageAndSocketId({convoID, socketID, messageText})
    }
}

module.exports = {ChatService};