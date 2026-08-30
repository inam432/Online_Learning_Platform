const Users_Info_Model=require("../Models/Users_Info.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
            name:user.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};
const signUp=async(req, res) => {
    res.send(req.body);
    /*const {name, email,phonenumber,password,role} = req.body;
    const existingUser = await Users_Info_Model.findOne({ email });
    if (existingUser) {
        return res.status(409).json({
            message: "Email already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const signUpUser = new Users_Info_Model({
        name,
        email,phone_Number:phonenumber,
        password:hashedPassword,role
    });

     await signUpUser.save();

    res.status(201).json({
        message: "Signup Successful",
        signUpUser
    });
*/
};
const signIn=async(req, res) => {

    const {email2,password2} = req.body;

    const user =await Users_Info_Model.findOne({email:email2});
   

    if (user) {
        const passwordMatch = await bcrypt.compare(
            password2,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }
        const token = generateToken(user);
       
        res.json({
            message: "Login Successful",token,
            user
        });

    } else {
        
        res.status(404).json({
            message: "Invalid email"
        });

    }};

module.exports={signUp,signIn};