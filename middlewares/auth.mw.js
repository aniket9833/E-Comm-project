const user_model = require("../models/user.model")
//create a mw to check if the request body is proper and correct.

const verifySignUpBody = async(req, res, next) =>{

    try {
        //check for name
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed! name was not provided in the request body"
            })
        }

        //check for email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed! email was not provided in the request body"
            })
        }

        //check for userID
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed! userId was not provided in the request body"
            })
        }

        //check if the user with same userId is already present
        const user = await user_model.findOne({userId : req.body.userId})
        if(user){
            return res.status(400).send({
                message : "Failed! user with same userId is already present"
            })
            next()
        }
        


    } catch (error) {
        console.log("Error while validating the request object", error);
        res.status(500).send({
            message : "Error while validating the request body"
        })
    }
}

const verifySignInBody = async(req, res, next)=>{
    if(!req.body.userId){
        res.status(400).send({
            message : "UserId is not provided"
        })
    }
    if(!req.body.password){
        res.status(400).send({
            message : "Password is not provided"
        })
    }
    next();
}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody
}