const { User } = require('../model/User');


// Get a user by their ID
exports.getUserbyId = async (req, res) => {
    const { id } = req.user;
    try {
        // Find a user by their ID, selecting only 'name', 'email', and 'id' fields
        const user = await User.findById(id, "name email id addresses role").exec();
        
        // Respond with a 200 status code (OK) and the user data
        res.status(200).json(user);
    } catch (error) {
        // Log the error for debugging purposes
        console.log(error);
        
        // Respond with a 400 status code (Bad Request) and the error message
        res.status(400).json(error.message);
    }
}

exports.updateUser=async(req,res)=>{
    const {id}=req.user;
    try{
        const user=await User.findByIdAndUpdate(id,req.body,{new:true}).exec();
        res.status(200).json(user);
    }catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}
