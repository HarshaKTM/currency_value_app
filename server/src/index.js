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
//get the targer amount
app.get("/convert" , async (req,res)=>{
    const {
        date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency
    } =req.query;
    try {
        const dataUrl= `https://openexchangerates.org/api/historical/${date}.json?app_id=e305486dc653438da26ba298d052c176`;

    const dataResponse = await axios.get(dataUrl);
    const rates= dataResponse.data.rates;

        //rate
        const sourseRate =rates[sourceCurrency]
        const targetRate = rates[targetCurrency];
        //target value
        const targetAmount =(targetRate / sourseRate)*amountInSourceCurrency;

        return res.json(targetAmount);

    }catch(err) {
        console.log('Error converting currency', err);
        res.status(5000).json({ message: 'Error converting currency' });
    }
})


// targetAmo = (targetRate/srcRare)*srcAmo