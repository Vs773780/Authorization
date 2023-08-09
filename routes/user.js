const express = require("express");
const router = express.Router();

const {login , signup} = require("../controllers/Auth");
const {auth , isStudent, isAdmin} = require("../middlewares/auth");

router.post("/login" , login);
router.post("/signup",signup);

router.get("/test" , auth,(req, res) => {
    res.json( {
        success:true,
        message:'welcome to the protected route for the test',


    });
});

//protected Route
router.get("/stuents" , auth, isStudents, (req , res) => {
    res.json({
        success:true,
        message:'Welcome to the protected routes for the students',

    });
});

//protected routes
router.get("/admin",auth, isAdmin , (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the protected routes for Admin',

    });
});

module.exports = router;