const validator = require("validator")

const validateSignUpData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not Valid")

    }else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("first name should be 4 to 50 char")
    }else if(!validator.isEmail(emailId)){
        throw new error("Email is not valid")

    }else if(!validator.isStrongPassword(password)){
         throw new error("Please enter a strong Password")
    }
}

module.exports = {validateSignUpData}