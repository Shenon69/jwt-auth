import Express from "express";
import User from "../schemas/user";
import bcrypt from "bcrypt";

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
    const [email, password] = req.body;

    //validate email if it exists or not

    //validate password

    //generate access token

    //set access token to cookie

    //return success message and access token
}

export const logoutUser = async (req: Express.Request, res: Express.Response) => {
    //clear access token from cookie

    //return success message
}
