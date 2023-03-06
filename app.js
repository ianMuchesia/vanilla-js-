const express = require('express');
require('dotenv').config()
require('express-async-errors')
const connectDB = require('./database/connectDB');
const router = require('./routes/route');

const app = express();


//routers
const authRouter = require('./routes/auth')
const booksRouter = require('./routes/route')


//error handler
const notFoundMiddleWare = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')



//middleware
app.use(express.static('./public'))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1', booksRouter)
app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 3000
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