import { useState, useEffect} from 'react'
import axios from 'axios'



// var XMLParser = require('react-xml-parser');
// var xml = new XMLParser().parseFromString(xmlText);    // Assume xmlText contains the example XML
// console.log(xml);
// console.log(xml.getElementsByTagName('Name'));

// const getAllStocks = () => {
//     return axios.get(`http://webtask.future-processing.com:8068/stocks`)
// }

// interface StocksData



export function Stock(): JSX.Element {
// useStaty

// useEffect z mapowaniem po elementach api
useEffect(() => {
	let interval = setInterval(async () => {
		const res = await fetch('http://webtask.future-processing.com:8068/stocks')
        .then((response) => response.text())
        .then((xmlText) => console.log(xmlText))
        .catch((error) => {
            console.log(error);
        });
	}, 30000);
	return () => {
		clearInterval(interval);
	};
}, []);



  return (
    <div>
        <div>Stock</div> 
    </div>
    
  )
}
