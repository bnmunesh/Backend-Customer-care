const express = require("express");
const app = express();
const cors = require("cors")
//For socketIO
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

// APIs
const {UserAPI} = require('./API/user')
// App Repos
const {UserRepo} = require("./DB/Mongo/Repositories/users")
const UR = new UserRepo()
const {ChatRepo} = require("./DB/Mongo/Repositories/Chat")
const CR = new ChatRepo();
// App services
const {UserService} = require('./services/user')
const US = new UserService(UR);

// Chat Service
const {ChatService} = require("./services/Chat")
const CS = new ChatService(CR);

const {OpenAI} = require("./services/OpenAI")


//Web Socket APP
const {WebSocket} = require("./WebSocket/webSocket") 

//Mongo
const {makeConnection} = require("./DB/Mongo/connection")
makeConnection()


const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const OpenAIKey = "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";
const OAI = new OpenAI(OpenAIKey, "asst_gxFC1B7pDtcX2V6E9RDYf44b");
const ws = new WebSocket(io, {chat:CS, openAI: OAI}, OpenAIKey, "asst_gxFC1B7pDtcX2V6E9RDYf44b");
ws.startConnection()



app.use(cors({
      origin: "*",
      credentials: true,
      methods: ["GET", "POST"],
    })
);



UserAPI(app, US);

function sendWSMessage(convoID, response, from, threadID){
  const ws = new WebSocket(io, {chat: CS});
  ws.sendMessage(convoID, response, from), threadID;
}
server.listen(3000, ()=>console.log("Server is listening at port 3000!"))
module.exports = {sendWSMessage}