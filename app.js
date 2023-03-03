const express = require('express');
require('dotenv').config()
const connectDB = require('./database/connectDB');
const router = require('./routes/route');
const app = express();



const PORT = process.env.PORT || 3000

//middleware
app.use(express.static('./public'))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router)



const start =async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}


start()