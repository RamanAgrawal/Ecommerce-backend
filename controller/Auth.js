const { User } = require("../model/User");

exports.createUser = async (req, res) => {
    try {
        // Create a new user instance from the request body
        const user = new User(req.body);
        
        // Save the user to the database and return the response
        const response = await user.save();
        
        // Respond with a 201 status code (Created) and the saved user
        res.status(201).json(response);
    } catch (error) {
        // Log the error for debugging purposes
        console.log(error);
        
        // Respond with a 400 status code (Bad Request) and the error message
        res.status(400).json(error.message);
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user=await User.findOne({email:req.body.email}).exec();
        if(!user){
            return res.status(401).json({message:'User not found'});
        }else if(user.password===req.body.password){
            return res.status(200).json({id:user._id,name:user.name,email:user.email,role:user.role});
        }else{
            return res.status(401).json({message:'Invalid credentials'});
        }
    } catch (err) {
        res.status(400).json({message:err.message});    
    }
}