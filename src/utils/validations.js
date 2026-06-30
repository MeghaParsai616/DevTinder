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

    console.log("validated successfully")
}

const validateEditProfileData = (req, resp) =>{
    try{
     const ALLOWEDUPDATES = ["firstName", "lastName", "emailId", "skills", "about", "gender", "age"]
     const isUpdateAllowed = Object.keys(req.body).every((key)=> ALLOWEDUPDATES.includes(key));
     return isUpdateAllowed;
    }catch(err){
       
    }
}

const validateUpdatePasswordData = async(req, resp, next) =>{
    try{
        if(req.password){
             const passwordHash = await bcrypt.hash(req.password, 10);
        }else{
            throw new Error("incorrect password")
        }
        req.passwordHash = passwordHash;
    next();
    }catch(err){
       resp.status(404).send("Error: "+err.message)
    }
}

module.exports = {validateEditProfileData, validateSignUpData ,validateUpdatePasswordData}