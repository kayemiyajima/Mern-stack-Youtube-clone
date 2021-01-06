import { User } from '../models/user.js';

export const addUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        await newUser.save();

        res.status(201).json({
            registerSuccess: true,
        })
    } catch (error) {
        res.status(409).json({
            registerSuccess: false,
            message: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    const email = req.body.email

    try {
        // find the email
        User.findOne({email: email}, (err, user) => {
            if(!user) {
                return res.status(404).json({
                    loginSuccess: false,
                    message: 'Authentication failed, email not found'
                });
        // compare password by using bcrypt
            } else if(user) {
                user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch)
                    return res.status(400).json ({
                        loginSuccess: false,
                        message: 'Wrong password'
                });
            });
        //generate token
                user.generateToken((err, user) => {
                    if(err) {
                        return res.status(400).send(err);
                    } else {
                        res.cookie("x_auth", user.token, { httpOnly: false, secure: false }).status(200).json({
                            loginSuccess: true,
                            user: user
                        });
                    }
                });
            }
        });
    } catch (error) {
        res.statu(409).json({
            loginSuccess: false,
            message: error.message
        })
    }
}

export const authUser = (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({
            _id: req.user._id,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role
        });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

export const logoutUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id}, { token: '' }, (err, doc) => {
        try {
            res.status(200).send({
                logoutSuccess: true
            });
        } catch (error) {
            res.status(404).json({ 
                logoutSuccess: false, 
                message: error.message
            });
        }
    });
}