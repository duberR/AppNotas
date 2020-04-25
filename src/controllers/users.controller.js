const usersCtrl = {};

const passport= require('passport');

const user = require('../models/User')

usersCtrl.renderSignUpForm=(req,res)=>{
    res.render('users/signup');
};

usersCtrl.signup= async (req, res)=>{
    const errors=[];
    const{name,email,password,config_password}=req.body;
    if (password != config_password){
        errors.push({text:'passwords do not match'});
    }
    if( password.length <4){
        errors.push({text:'passwords must be at least 4 characters.'});
    }
    if(errors.length >0){
        res.render('/users/signup',{
            errors,
            name,
            email
        })
    }else{
        const emailUser =await user.findOne({email:email});
        if(emailUser){
            req.flash('error_msg', 'the email is use. ');
            res.redirect('/users/signup');
        }else{
            const newUser = new user({name,email,password});
            newUser.password=await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg', 'you are registered');
            res.redirect('/users/signin');
        }
    }
};
usersCtrl.renderSigninForm =(req, res)=>{
    res.render('users/signin');
}
usersCtrl.signin = passport.authenticate('local',{
    failureRedirect:'/user/signin',
    successRedirect:'/notes',
    failureFlash:true
})

usersCtrl.logout=(req,res)=>{
    req.logout();
    req.flash('success_msg', 'you are logged out now');
    req.redirect('/users/signin');
}
module.exports= usersCtrl;

