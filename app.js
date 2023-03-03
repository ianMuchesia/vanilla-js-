const express = require('express');
const app = express();





const PORT = process.env.PORT || 3000
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



const start =()=>{
    try {
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}


start()