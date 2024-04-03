const category_model = require("../models/category.model")

exports.createNewCategory = async(req, res)=>{
    //read the request body
    //create a category object
    const cat_data = {
        name : req.body.name,
        descritpion : req.body.descritpion
    }
    //insert into mongodb
    try {

        const category = await category_model.create(cat_data)
        return res.status(201).send(category)

    } catch (error) {

        console.log("Error while creating a category", error);
        return res.status(500).send({
            message : "Error while creating a category"
        })
    }
    //return the response of the created category
}