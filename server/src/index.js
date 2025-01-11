const  express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

//middle warse
app.use(express.json());
app.use(cors());

//All Currency
app.get("/getAllCurrencies", async(req, res) => {
    const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=e305486dc653438da26ba298d052c176`;


    try {
        const namesResponse= await axios.get(nameURL);
        const nameData = namesResponse.data;

        return res.json({nameData});
    }catch(error) {
        console.log('Error fetching currencies', error);
        res.status(5000).json({ message: 'Error fetching currencies' });
    }
});

//listen to  a port
app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
});
//API routes