const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(bodyParser.json());
let usersData=[];
const port = process.env.PORT || 5000;
app
.post('/api/user', async(req,res)=>{
    try {
        const randomImage = await axios.get('https://dog.ceo/api/breeds/image/random')
        console.log('randomImage',randomImage?.data)
        usersData.push({...req.body,profilePhoto:randomImage?.data?.message})
        res.status(200).send({success:true, message: 'user added'})
    } catch (error) {
        res.status(500).send({success:false, message:'user data not stored'})
    }
})
.get('/api/user', async(req,res)=>{
    res.json(usersData)
})

app.listen(port, console.log(`listining at port ${port}`));
