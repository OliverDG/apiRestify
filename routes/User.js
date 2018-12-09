const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth = require('./auth');
const jwt = require('jsonwebtoken');
const config = require('../config');



module.exports = server =>{
    //register User
    server.post('/register',(req,res,next)=>{
        const { email, password } = req.body;

        const user = new User({
            email,
            password
				});
				
				bcrypt.genSalt(10,(err,salt)=>{
					bcrypt.hash(user.password, salt, async(err,hash)=>{
						//encrypted password
						user.password = hash;
						//save user
						try{
							const newUser = await user.save();
							res.send(201);
							next();
						}catch(err){
							return next(new errors.InternalError(err.message+"hello"));
						}


					});
				});
		});

		//get data
    server.post('/auth', async (req,res,next) =>{
			const {email,password} = req.body;

			try{
					const user = await auth.authenticate(email,password);
					
					//Create token
					const token = jwt.sign(user.toJSON(), config.JWT_SECRET,{
						expiresIn: '15min'
					});

					const {iat,exp} = jwt.decode(token);
					//respon with token
					res.send({iat,exp,token});

					next();
			}catch(err){
					return next(new errors.UnauthorizedError(err));
			}
		});
};
