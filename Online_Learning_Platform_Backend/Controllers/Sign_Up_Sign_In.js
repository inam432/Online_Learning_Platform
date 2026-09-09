const Users_Info_Model=require("../Models/Users_Info.js");
const Users_Google_Info_Model=require("../Models/Users_Google_Info.js");    
require("dotenv").config();    
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
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
    const {name, email,phonenumber,password,role} = req.body;
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
    const signUpWithGoogle=async(req, res) => {
      try {
        const { credential,phonenumber,role} = req.body;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);    
        const ticket = await client.verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID
        });
    
        const payload = ticket.getPayload();
    
        const {
          sub,
          name,
          email} = payload;
        const existingUser = await Users_Google_Info_Model.findOne({ email });
        const existingUser2 = await Users_Info_Model.findOne({ email });
    
        if (existingUser||existingUser2) {
          return res.status(400).json({
            message: "User already exists. Please sign in."
          });
        }
        const user =new Users_Google_Info_Model({
          sub,
          name,
          email,
          phone_Number:phonenumber,
          role
        });
        await user.save(); 
        res.status(201).json({
          message: "Google signup successful",
          user
        });
    
      } catch (error) {
        console.error(error);
    
        res.status(500).json({
          message: "Google signup failed"
        });
      }
    };
    const signInWithGoogle=async(req, res) => {
      try {
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const {credential} = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google ID token is required"
      });
    }
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Account with this email does not exist. Please sign up first."
      });
    }
    const token = jwt.sign(
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
    res.status(200).json({
      message: "Google sign in successful",
      token,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Google sign in failed"
    });
  }
};
module.exports={signUp,signIn,signUpWithGoogle,signInWithGoogle};