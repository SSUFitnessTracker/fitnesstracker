require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/user', require('./routes/UserRouter'))

const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useNewUrlParser: true, 

    useUnifiedTopology: true 
                    },
    err => {
        if(err){
            console.log(err);
        };
        console.log("Connected to MongoDB")
    })

app.use('/', (req, res, next) => {
    res.json({msg: "Listening!"});
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("LISTENING ON", PORT);
})