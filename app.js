import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import User from './models/User';

const PORT = process.env.PORT || 5001;
const app = express();
require('dotenv').config();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log('Mongoose connected');
});

app.get('/', (req, res) => {
    res.send('server is running');
});

app.get('/kullanicikaydet', (req, res) => {
    const username = 'ahmet',
        password = '123';
    const letData = new User({
        username,
        password,
        notes: { title: 'Sample', body: 'This note is a sample.' },
    });
    letData.save((err) => {
        if (err) throw err;
        console.log('Saved successfully');
    });
    res.send('a');
});

app.get('/notekle', (req, res) => {
    const userID = '5e88a31c15f9f74aa690106d';
    const noteTitle = 'Türkçe',
        noteBody = 'Şey ayrı yazılır.';
    User.findById(userID).then(doc => {
        doc.notes.push({
            title: noteTitle,
            body: noteBody
        });

        doc.save();
    })
    res.send();
})

app.get('/notsil', (req, res) => {
    const userID = '5e88a31c15f9f74aa690106d'; // bugra kullanicisinin ID bilgisi
    const noteIDtoDelete = '5e88b9e32f08f15e860028f1'; //bugra kullanicisinin silinecek note ID bilgisi
    User.findById(userID).then(doc => {

        doc.notes.map(note => {
            if (note._id == noteIDtoDelete) {
                console.log(note)
                    //note.remove();
            }
        })

        doc.save();
    })
})

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${PORT} port`);
});

/*


{ "_id" : ObjectId("5e88a31c15f9f74aa690106d"),
 "username" : "bugra",
  "password" : "333",
   "notes" : [ 
       { "_id" : ObjectId("5e88a31c15f9f74aa690106e"), "title" : "Matematik", "body" : "13 asal sayıdır." },
        { "_id" : ObjectId("5e88b9e32f08f15e860028f1"), "title" : "Türkçe", "body" : "Şey ayrı yazılır." }
   ]


*/