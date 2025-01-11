// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// const CurrencyList = () => {
//     const [currencyNames, setCurrencyNames] = useState({});
//
//     useEffect(() => {
//         const getCurrencyNames = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/getAllCurrencies");
//                 console.log("Currency data:", response.data);
//                 setCurrencyNames(response.data.nameData); // Save nameData to state
//             } catch (error) {
//                 console.error("Error fetching currency names", error);
//             }
//         };
//         getCurrencyNames();
//     }, []);
//
//     return (
//         <div>
//             <h1>Currency Names</h1>
//             <ul>
//                 {/* Mapping over the currencyNames object */}
//                 {Object.entries(currencyNames).map(([code, name]) => (
//                     // Adding the key to the <li> to help React optimize rendering
//                     <li key={code}>
//                         <strong>{code}:</strong> {name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default CurrencyList;
