
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import Users from '../Schema/Users.js';

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const generateUserName = async (email) => {
    let baseUsername = email.split('@')[0];
    let username = baseUsername;
    let counter = 0;
    
    // Check if the base username already exists
    let isUsernameExist = await Users.exists({ "profile_details.username": baseUsername });

    // If the base username exists, append a counter to it until a unique username is found
    while (isUsernameExist) {
        counter++;
        username = `${baseUsername}_${counter}`;
        isUsernameExist = await Users.exists({ "profile_details.username": username });
    }

    return username;
};
const formatDatatoSend = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
    return {
        access_token: access_token,
        profile_img: user.profile_details.profile_img,
        username: user.profile_details.username,
        fullname: user.profile_details.fullname,
    }
};

export const signup = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    let fullname = `${firstname} ${lastname}`;
    if (fullname.length < 3) {
        return res.status(403).json({ "error": "Name should be atleast of 3 letters" });
    }
    if (!email.length) {
        return res.status(403).json({ "error": "Enter the email" })
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Invalid email" })
    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Password should contain atleast 1 capital letter, 1 special character and 1 number..." })
    }

    bcrypt.hash(password, 10, async (err, hash_password) => {
        if (err) {
            return res.status(500).json({ "error": "Error in hashing password" });
        }

        let username = await generateUserName(email);
        let user = new Users({
            profile_details: {
                fullname,
                email,
                password: hash_password,
                username
            }
        });

        user.save()
            .then((user) => {
                return res.status(200).json(formatDatatoSend(user))
            })
            .catch((err) => {
                if (err.code == 11000) {
                    return res.status(403).json({ "error": "Email already exists" + err })
                }
                return res.status(500).json({ "error": err })
            })
    })
}

export const signin = (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ "profile_details.email": email })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ "error": "User does not exist" })
            } else {
                bcrypt.compare(password, user.profile_details.password, (err, result) => {
                    if (err) {
                        return res.status(403).json({ "error": "Error occurred while login, please try again" })
                    }
                    if (!result) {
                        return res.status(403).json({ "error": "Email and password do not match" })
                    } else {
                        return res.status(200).json(formatDatatoSend(user))
                    }
                })
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ "error": error.message })
        })
}
