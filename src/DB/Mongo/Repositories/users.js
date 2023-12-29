const {UserModel} = require("../models/user")

class UserRepo {
    async CreateUser({username, role}){
        try {
            const newUser = new UserModel({username, role});
            await newUser.save();
            return {success: true, data: newUser, error: null};
        } catch (e) {
            console.log('error while creating a user in the user repo layer:', e);
            return {success: false, data: null, error: e};
        }
    }
    

    async GetUserByUID({uid}){
        try {
            const user = await UserModel.findById(uid)
            return {success: true, data: user, error: null};
        } catch (e) {
            console.log('error while creating a user in the user repo layer:', e);
            return {success: false, data: null, error: e};
        }
    }

    async GetUserByName({name}){
        try {
            const user = await UserModel.find({username:name})
            return {success: true, data: user, error: null};
        } catch (e) {
            console.log('error while creating a user in the user repo layer:', e);
            return {success: false, data: null, error: e};
        }
    }


}


module.exports = {UserRepo};