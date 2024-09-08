import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'

export const loginUser = async (request, response) => {
    const { username, password } = request.body;
    try {
        //CHECK IF THE USER IS EXIST
        const user = prisma.user.findUnique({
            where: { username }
        })

        //prisma user returns promise 
        const data = await user;
        //To elimate the password for sending the user datails in the response 
        const { password: userPassword, ...userInfo} = data
        if (!data) {
            return response.status(401).json({
                message: "User not found"
            })
        }
        //CHECK THE ENTERED PASSWORD IS RIGHT OR WHAT
        const isPasswordValid = await bcrypt.compare(password, data.password);
        const age = 1000 * 603;
        console.log("isPasswordValid", isPasswordValid, data);
        if (!isPasswordValid) {
            return response.status(401).json({
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({
            id: data.id,
            isAdmin: true
        }, process.env.JWT_SECRET_KEY, { expiresIn: age });

        console.log("token", token);

        //GENERATE COOKIE TOKEN AND SEND TO THE USER
        //response.setHeader("Set-Cookie","test=" + "testHeader").json("success");
        response.cookie("token", token, {
            httpOnly: true,
            //secure: true
            maxAge: age
        }).status(200).json({
            message: "Login successfully!!!",
            data: userInfo
        })

    } catch (err) {
        console.log(err);
        response.status(500).json({
            message: "Failed to login"
        })
    }
}


export const logoutUser = (request, response) => {
    response.clearCookie("token").status(200).json({
        message: "Logout successfully!!!"
    })
}
//CREATE new users
export const registerUser = async (request, response) => {

    const { username, password, email } = request.body;

    try {
        //Hashing password by using bcrypt library
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,

            }
        });

        console.log("newUser", newUser);
        response.status(200).send("New user registered succesfully!!!");
    } catch (err) {
        console.log("error", err);
        response.status(500).json({
            message: "Failed to create user"
        })
    }
}

// module.exports = {
//     loginUser, logoutUser, registerUser
// }