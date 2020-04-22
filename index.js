const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const todoRouter = require('./routes/todoRouter.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use("/todo", todoRouter);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000);