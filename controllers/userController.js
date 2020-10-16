const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validation = require("../validation/login_signupValidation")


exports.getUsers = (req, res, next)=>{
    User.find()
    .then(users =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users)
    }, err => next(err))
    .catch(err => next(err))
}



/**
 *      FOR /users/signup
 */
exports.singup = async(req, res, next)=>{

    //if signup username and password fail validation
    const {error} = await validation.validate(req.body);
    if(error){
        var err = new Error(error.details[0].message);
        err.status = 404;
        return next(err);
    }

    User.findOne({username: req.body.username})
    .then(async user =>{
        //If user already exists in database
        if(user){
            var err = new Error("Username already exists!")
            err.status = 404;
            return next(err);
        }

        var salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        var newUser = new User({
            username: req.body.username,
            password: hashPassword
        })

        newUser.save()
        .then(customer =>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(customer)
        }, err  => next(err))
    }, err => next(err))
    .catch(err => next(err))
}

/**
 *      FOR /users/signin
*/
exports.signin = async (req, res, next)=>{
    //if signup username and password fail validation
    const {error} = await validation.validate(req.body);
    if(error){
        var err = new Error(error.details[0].message);
        err.status = 404;
        return next(err);
    }

    User.findOne({username: req.body.username})
    .then(user =>{
        if(!user){
            var err = new Error("Username or password incorrect!");
            err.status = 404;
            return next(err);
        }

        var passwordCorrect = bcrypt.compare(req.body.password, user.password);
        //If passwords does not match
        if(!passwordCorrect){
            var err = new Error("Username or password incorrect!");
            err.status = 404;
            return next(err);
        }

        //Create and assign Token
        var token = jwt.sign( ordinaryUser, process.env.TOKEN_SECRET,{ expiresIn: '59m' });
        


    })
}