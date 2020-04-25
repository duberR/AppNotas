const passport =require('passport');
const LocalStrategy=require(passport-local).Strategy;

const user =require('../models/User')
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
}, async (email,password,done)=>{
    //match email´s user
    const user =await user.findOne({email})
    if(!user){
        return done(null, false, {  message:'not user found'});
    }else{
        // match password´s user
        const  match = await user.matchPassword(password);
        if(match){
            return done(null,user);
        }else{
            return done(null,false, {message:'incorrect password'});
        }
    }
}));

passport.serializeUser((user, done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    user.findById(id, (err,user) =>{
        done(err,user);
    })
});