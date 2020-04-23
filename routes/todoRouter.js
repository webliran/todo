const express = require('express');
const todoRouter = express.Router();
const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.Secret | "1234";
console.log(accessTokenSecret);
let todoDemoInfo = [
    {
        todo:"computer",
        complete: false
    }
]

const authJwt = (req,res,next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).json(err);
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({error:true});
    }
}


todoRouter.get('/',authJwt,function(req,res){
    res.send(todoDemoInfo)
})

todoRouter.post('/',authJwt,function(req,res){
    
    let {todo,complete} = req.body;

    todoDemoInfo.push({"todo":todo,"complete":false})
    res.json({"msg":"Created!"})
})

todoRouter.put('/:id',function(req,res){
    let id = req.params.id;
    
    todoDemoInfo[id].complete = !todoDemoInfo[id].complete;
    res.json({"msg":"Updated!"})
})

todoRouter.delete("/:id",function(req,res){
    let id = req.params.id;

    todoDemoInfo = todoDemoInfo.filter((elem,key) => {
        return key != id;
    })
    res.json({"msg":"Deleted!"})
})



module.exports = todoRouter;