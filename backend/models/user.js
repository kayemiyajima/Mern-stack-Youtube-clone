import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlegth: 5
    },
    avatarImage: {
        type: String
    },
    token: {
        type: String
    }
    
});

userSchema.pre('save', function(next) {
    const user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        //this = the db(userSchema)
        if(err)
            return cb(err);
            cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save((err, user) => {
        if(err)
            return cb(err);
        cb(null, user);
    });
}

userSchema.statics.findByToken = function(token, cb) {
    const user = this;

    jwt.verify(token, 'secret', function(err, decode) {
        user.findOne({'_id': decode, 'token': token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        });
    });
}

export const User = mongoose.model('User', userSchema);