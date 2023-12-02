import Express from "express";
import User from "../schemas/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Express.Request, res: Express.Response) => {
    const {name, email, password} = req.body;

    //validate email if it exists or not
    const userExists = await User.findOne({email});


    //if exists, return error
    if(userExists) {
        return res.status(400).json({message: "User already exists"})
    }

    //encrypt password
    const hashedPassword = bcrypt.hashSync(password, 10);

    //save user to database
    const newUser = new User({
        name,
        email,
        authentication: {
            password: hashedPassword
        }
    })

    await newUser.save();

    //return success message
    res.status(201).json({message: "User created successfully", user: newUser})
}

export const loginUser = async (req: Express.Request, res: Express.Response) => {
    const {email, password} = req.body;

    //validate email if it exists or not
    const emailExist = await User.findOne({email}).select("+authentication.password"); 

    if(!emailExist) {
        return res.status(400).json({message: "User does not exist"})
    }

    //validate password
    const passwordMatch = bcrypt.compareSync(password, emailExist?.authentication?.password as string);

    if(!passwordMatch) {
        return res.status(400).json({message: "Invalid password"})
    }

    //generate access token
    const token = jwt.sign(
        String(emailExist._id), 
        process.env.APP_SECRET as string
    ); 

    //set access token to cookie
    res.cookie("AUTH_COOKIE", token, {
        httpOnly: true,
    })

    //save token in database
    if(emailExist.authentication) {
        emailExist.authentication.accessToken = token;
    }

    await emailExist.save();

    //return success message and access token
    return res.status(200).json({message: "User logged in successfully", accessToken: token})
}

export const logoutUser = async (req: Express.Request, res: Express.Response) => {
    //clear access token from cookie
    res.cookie("AUTH_COOKIE", "")
    res.status(200).send({message: "User logged out successfully"})

    //return success message
}

export const getAllUsers = async (req: Express.Request, res: Express.Response) => {
    //get all users from database
    const users = await User.find({});

    //return all users
    res.status(200).json({users})
}
