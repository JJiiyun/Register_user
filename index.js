// import express from 'express';
const express = require('express');
const app = express()
const port = 5000
const { User } = require('./models/User');
// import User from './models/User.js';

const config = require('./config/key')

//body-parser 은 이제 express에 포함이 됨
//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
//for json request
app.use(express.json());


// import mongoose from 'mongoose';

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
    // 회원 가입할 때 필요한 정보들을 client 에서 가져오면 그것들을 db 에 넣어준다.
    const user = new User(req.body);
    //mongoDB 의 함수
    user.save()
        .then((userInfo) => res.status(200).json({ success: true }))
        .catch((err) => res.json({ success: false, err }));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

