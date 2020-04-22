const express = require('express');
const todoRouter = express.Router();
let todoDemoInfo = [
    {
        "todo":"computer",
        "complete": false
    }
]


todoRouter.get('/',function(req,res){
    res.send(todoDemoInfo)
})

todoRouter.post('/',function(req,res){
    
    let {todo,complete} = req.body;
    complete = (complete == 'true');

    todoDemoInfo.push({"todo":todo,"complete":complete})
    res.json({"msg":"Created!"})
})

todoRouter.post('/update-status/:id',function(req,res){
    let id = req.params.id;
    
    todoDemoInfo[id].complete = !todoDemoInfo[id].complete;
    res.json({"msg":"Updated!"})
})


module.exports = todoRouter;