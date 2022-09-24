import { useState, useEffect} from 'react'
import axios from 'axios'

const getAllStocks = () => {
    return axios.get(`http://webtask.future-processing.com:8068/stocks`)
}

// interface StocksData



export function Stock(): JSX.Element {
// useStaty

// useEffect z mapowaniem po elementach api
    useEffect(() => {
        getAllStocks().then((response) => {
            const stocks = response.data.Stocks;
            console.log(stocks)
        })
        
    })

  return (
    <div>
        <div>Stock</div> 
    </div>
    
  )
}
