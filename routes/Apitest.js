const error = require('restify-errors');
const Apitest = require('../models/apitest');

module.exports = server =>{
    //get data
    server.get('/apitest', async (req,res,next) =>{
        try{
            const Apitests = await Apitest.find({});
            res.send(Apitests);
            next();
        }catch(err){
            return next(new errors.InvalidContendError(err));
        }
    });
    //get data by id
        server.get('/apitest/:id', async (req,res,next) =>{
            try{
                const Apitests = await Apitest.findById(req.params.id);
                res.send(Apitests);
                next();
            }catch(err){
                return next("apitest not found ${req.params.id}");
            }
        });
    //create
    server.post('/apitest', async (req,res,next) =>{
        
            //check for json
            if(!req.is("application/json")){
                return next(new errors.InvalidContendError("Expects application/json"));
            }
            const {name,email,balance} = req.body;
            const apitest = new Apitest({
                name,
                email,
                balance
            });
        try{
            const newApitest = await apitest.save();
            res.send(201);
            next();
        }catch(err){
            return next(err.message);
        }
    });
        //update
        server.put('/apitest/:id', async (req,res,next) =>{
        
            //check for json
            if(!req.is("application/json")){
                return next(new errors.InvalidContendError("Expects application/json"));
            }
        try{
            const newApitest = await Apitest.findOneAndUpdate({_id:req.params.id},req.body);
            res.send(200);
            next();
        }catch(err){
            return next(err.message);
        }
    });
            //delete
            server.del('/apitest/:id', async (req,res,next) =>{
            try{
                const newApitest = await Apitest.findOneAndRemove({_id:req.params.id});
                res.send(204);
                next();
            }catch(err){
                return next(err.message);
            }
        });
};