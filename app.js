import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import User from './models/User';

const PORT = process.env.PORT || 5001;
const app = express();
require('dotenv').config()

mongoose.connect(
    process.env.DB_URI, { useNewUrlParser: true },
    (err) => {
        if (err) throw err;
        console.log('Mongoose connected');
    }
);

app.get('/', (req, res) => {
    res.send('server is running');
});

app.get('/kaydet', (req, res) => {
    console.log('istek')
    const letData = new User({
        username: 'bugra',
        password: '333',
        notes: { title: 'Matematik', body: '13 asal sayıdır.' }
    })
    letData.save(err => {
        if (err) throw err;
        console.log("Saved successfully");
    });
    res.send('a');
});



app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${PORT} port`);
});

/*


{ "_id" : ObjectId("5e88a14e734b1b48cc556588"), "username" : "mehmet",
 "password" : "321",
  "notes" : [
       { "_id" : ObjectId("5e88a14e734b1b48cc556589"), "note" : "express js icerisinde mongoose kullanilir" },
       { "_id" : ObjectId("5e813134b1b48cc556589"), "note" : "esdde kullanilir" } 
    ]

*/