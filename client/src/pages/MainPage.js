import React, {useEffect, useState} from 'react';
import axios from 'axios';
function MainPage(props) {
    //state for the form fild
    const [date,setDate]=useState(null);
    const [sourceCurrency,setSourceCurrency]=useState("");
    const [targetCurrency,setTargetCurrency]=useState("");
    const [amountInSourceCurrency,setAmountInSourceCurrency]=useState(0);
    const [amountInTargetCurrency,setAmountInTargetCurrency]=useState(0);
    const [currencyNames, setCurrencyNames] = useState({});
    const [loading,setLoading] = useState(true);

    //handleSubmint method
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            const response =await axios.get("http://localhost:5000/convert" , {
                params:{
                    date,
                    sourceCurrency,
                    targetCurrency,
                    amountInSourceCurrency
                },
            });
        setAmountInTargetCurrency(response.data)
            setLoading(false);

            console.log(amountInSourceCurrency,amountInTargetCurrency);
        }catch (err){
            console.error("Error converting currency", err);
        }
    };

    //get all currency name



    useEffect(() => {
        const getCurrencyNames = async () => {
            try {
                const response = await axios.get("http://localhost:5000/getAllCurrencies");
                console.log("Currency names:", response.data);
                setCurrencyNames(response.data.nameData);
            } catch (error) {
                console.error("Error fetching currency names", error);
            }
        };
        getCurrencyNames();
    }, []);


    return (
        <div>
            <h1 className="lg:mx-32 text-5xl  font-bold text-green-500">Convert Your Currencies Today</h1>
            <p className="text-green-50 lg:mx-32 opacity-40 py-6">Well come my web site</p>

        <div className="mt-5 flex items-center justify-center flex-col">
            <section className="w-full lg:w-1/2 ">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor={date}
                               className="block mb-2 text-sm font-medium
                                   text-gray-900 dark:text-white">Your
                           Date</label>
                        <input type="Date"
                               onChange={(event) =>setDate(event.target.value)}
                               id={date}
                               name={date}
                               className="bg-gray-50 border border-gray-300
                                   text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500
                                   focus:border-blue-500
                                   block w-full p-2.5 dark:bg-gray-700
                                   dark:border-gray-600 dark:placeholder-gray-400
                                   dark:text-white dark:focus:ring-green-500
                                   dark:focus:border-green-500"
                               placeholder="name@flowbite.com" required/>
                    </div>

                    <div className="mb-5">
                        <label htmlFor={sourceCurrency}
                               className="block mb-2 text-sm font-medium
                                   text-gray-900 dark:text-white">
                            Source Currency</label>
                        <select
                                onChange={(event)=>setSourceCurrency(event.target.value)}
                                id={sourceCurrency}
                                name={sourceCurrency}
                                value={sourceCurrency}
                                className="bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500
                            focus:border-blue-500
                            block w-full p-2.5 dark:bg-gray-700
                            dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-green-500
                            dark:focus:border-green-500"
                                placeholder="Source Currency" required>
                            <option value="">Select source currency</option>{
                                Object.keys(currencyNames).map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currencyNames[currency]}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor={targetCurrency}
                               className="block mb-2 text-sm font-medium
                                   text-gray-900 dark:text-white">
                            Target Currency</label>
                        <select type="text"
                                onChange={(event)=>setTargetCurrency(event.target.value)}
                                id={targetCurrency}
                                name={targetCurrency}
                                value={targetCurrency}
                                className="bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500
                            focus:border-blue-500
                            block w-full p-2.5 dark:bg-gray-700
                            dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-green-500
                            dark:focus:border-green-500"
                                placeholder="Source Currency" required>
                            <option>Select Target Currency</option>
                            {currencyNames && typeof currencyNames === "object" &&
                                Object.keys(currencyNames).map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currencyNames[currency]}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor={amountInSourceCurrency}
                               className="block mb-2 text-sm font-medium
                                   text-gray-900 dark:text-white">Amount in source Currency</label>
                        <input
                            type="text"
                            onChange={(event)=>setAmountInSourceCurrency(event.target.value)}
                            id={amountInSourceCurrency}
                            name={amountInSourceCurrency}
                            value={amountInSourceCurrency}
                               className="bg-gray-50 border border-gray-300
                                   text-gray-900 text-sm rounded-lg
                                   focus:ring-blue-500
                                   focus:border-blue-500
                                   block w-full p-2.5 dark:bg-gray-700
                                   dark:border-gray-600 dark:placeholder-gray-400
                                   dark:text-white dark:focus:ring-green-500
                                   dark:focus:border-green-500"
                               placeholder="Amount in source currency" required/>
                    </div>
                        <button className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-md">{""} Get Currency</button>
                </form>
            </section>
        </div>
            {!loading ?( <section className="mt-5 text-white font-bold">
                {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equivalent to {""}
                <span className="text-green-500 font-medium">
               {""}
                    {amountInTargetCurrency}
           </span> in {currencyNames[targetCurrency]}
            </section>): null}

        </div>
    );
}

export default MainPage;