const axios = require('axios')
// const {sendWSMessage} = require('../index');
const OAI = require("openai");
const OpenAIKey = "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";
const openai = new OAI({
    apiKey: OpenAIKey,
});


class OpenAI {
    constructor(key, assistantID){
        this.key = key;
        this.baseURL = "https://api.openai.com/v1";
        this.axiosPrivate = axios.create({
            baseURL: this.baseURL,
            timeout: 1000,
            headers: {Authorization: `Bearer ${this.key}`,"OpenAI-Beta": "assistants=v1"}
        })
        this.assistantID = assistantID;
    }

    // Every Conversation will have thread
    
    /* 
        WorkFlow:
            1. Create a thread if it doesn't exists.
            2. Add the user's message to that thread.
            3. Run the assistant with the assistantID and threadID(This doesn't respond with the response, but just starts the process. There is another API to generate the response). 
            4. After running the assistant. Send another request for getting the response. You could add a setInterval with a api request to check the status, once the response is created send another request to fetch the response.
    */



    // AKA: Create a Thread 
    async CreateANewConversation(){
        let threadID = null;
        const thread = await openai.beta.threads.create();
        threadID = thread.id;
        // await this.axiosPrivate.post("/threads").then(res=>{
        //     console.log("Create Convos",res.data);
        //     threadID = res.data.id;
        // }).catch(e=>{
        //     console.log("error while creating a new thread",e);
        // })
        console.log("threadID:",threadID)
        return threadID;
    }


    // Adds a message to the given thread 
    async createMessage(threadID, userMessage){
        let success = false;
        let data = null;
        let error = null
        console.log("threadID", threadID, "message", userMessage)
        
        const message = await openai.beta.threads.messages.create(
            threadID,
            {
              role: "user",
              content: userMessage
            }
          );
        
        
        // await this.axiosPrivate.post(`/threads/${threadID}/messages`, {
        //     role: "user",
        //     content: userMessage
        // }).then(res=>{
        //     console.log("createMessage:", res.data);
        //     success = res.data.content.length > 0;
        //     data = res.data;
        // }).catch(e=>{
        //     console.log("error while creating a new message:", e);
        //     error = e;
        // })
        return {success:true, data:message, error:null};
    }


    async RunAssitant(threadID, convoID){
        let runID = null;
        console.log("run Assistant", {threadID, convoID, assistantID: this.assistantID})

        const run = await openai.beta.threads.runs.create(
            threadID,
            { 
              assistant_id: this.assistantID,
              instructions: "Please address the user's needs!",
            }
        );
        console.log("\n\n RUnID:", run.id)
        runID = run.id;


        // await this.axiosPrivate.post(`/threads/${threadID}/runs`, { 
        //     assistant_id: this.assistantID,
        //     instructions: "Help the user with his query"
        //   }).then(res=>{
        //     console.log("res.data", res.data);
        //     runID = res.data.id;
        // }).catch(e=>{
        //     console.log("error", e)
        //     // process.exit(0)
        // })
        return runID
        // let intervalID = setInterval(async()=>{
        //     await this.axiosPrivate.get(`/threads/${threadID}/runs/${runID}`).then(async (res)=>{
        //         console.log(res.data);
        //         if(res.data.status == "completed"){
        //             const response = await this.GetResponse(threadID)
        //             // a function call to send response back to the user;  
        //             // console.log("sendmessage:", sendWSMessage, response)
        //             cb(convoID, response, "bot", threadID)
        //             clearInterval(intervalID);

        //         }
        //     }).catch(e=>{
        //         console.log("error while checking for the status of response", e);
        //     })
        // }, 5000)      
    }



    async GetResponse(threadID){
        const messages = await openai.beta.threads.messages.list(
            threadID
          );

          if(messages){
            return messages.data[0]
          }else return null
          
        // let response = ""
        // await this.axiosPrivate(`/threads/${threadID}/messages`).then(res=>{
        //     console.log("\n\n\n!!@@@!!",res.data)
        //     response = res.data.data[0];
        // }).catch(e=>{
        //     console.log("error while fetching the messages from a thread");
        // })
        // return response;
    }
    
}



module.exports = {OpenAI};