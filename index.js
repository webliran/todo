const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const todoRouter = require('./routes/todoRouter.js')

const accessTokenSecret =  process.env.Secret || "1234";

let users = [
    {
        name:"liran",
        email:"liranhecht@gmail.com",
        password:"123456",
        role:"admin"
    }
]


app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use("/todo", todoRouter);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/login', (req, res) => {
    // Read username and password from request body
    const { name, password } = req.body;

    // Filter user from the users array by username and password
    const user = users.find(u => { return u.name === name && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ name: user.name,  role: user.role }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});

app.listen(process.env.PORT || 5000);
