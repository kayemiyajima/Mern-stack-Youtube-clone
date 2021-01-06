import { User } from '../models/user.js';

const auth = (req, res, next) => {
    let token = req.cookies.x_auth;

    User.findByToken(token, (err, user) => {
        if(err)
            return res.status(400).send(err);
        if(!user)
            return res.json({
                isAuth: false,
                error: true
            });

    req.token = token;
    req.user = user;
    next();
    })
};
export default auth;