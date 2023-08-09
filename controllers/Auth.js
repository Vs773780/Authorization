const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {options} = require("../routes/user");
require("dotenv").config();

//signup  route handler
exports.signup = async(req, res) => {
    try{
        const {name , email , password, role} = req.body;
        const extinguisher = await User.findOne({email});
        if(extinguisher){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

        // secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);

        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:'Error inn hashing Password',

            });
        }

        // create entry for user
        const user = await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:'User Created Successful',
        });
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be register,p;ease try later',
        });
    }

}

//login
exports.login = async(req, res) => {
    try{
        const {email , password } = req.body;
        //validation on email and password
        if(!email || password){
            return res.status(400).json({
                success:false,
                message:'Please fill all the details',

            });
        }

        //check for registered user
        let user = await User.findOne({email});
        //if not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };
        //varify password & generator a jwt token
        if(await bcrypt.compare(password,user.password)){
            //password match
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expirESiN : "2h",
                });

                user = user.toObect();
                user.token = token;
                user.password = undefined;

                const option = {
                    expire : new Date(Date.now() + 3*24*60*1000),
                    httpOnly: true,

                }
                res.cookies("babbarCookies", token, options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:'User Logged in successfully',
                });
        }
        else{
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }
    }
    catch(eroor){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });
    }
}
