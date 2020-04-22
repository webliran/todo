const express =  require('express');
const app = express();
const cors = require('cors');

const todoRouter = require('./routes/todoRouter.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use("/todo",todoRouter);


app.listen(5000);