class WebSocketServices {

    constructor(ws){
        this.ws = ws;
    }


    sendMessage(convoID, message, from){
        this.ws.sendMessage(convoID, message, from);
    }

}