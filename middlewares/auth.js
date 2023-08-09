const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res , next) => {
    try{
        const token = req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                messsage:'Token Missing',
            });
        }
        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            // why this?
            req.user = payload;

        } catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid'
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong,while veryfing the token',

        });
    }
}

    exports.isStudent = (req,res,next) => {
        try{
            if(req.user.role !=="Students"){
                return res.status(401).json({
                    success:false,
                    message:'This is a protected route for students',
                });
            }
            next();
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not mathching',
        })
    }
}

exports.isAdmin = (req,res,next) =>{
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route admin',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not found',

        })
    }
}