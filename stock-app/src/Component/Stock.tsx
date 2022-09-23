import { useState, useEffect} from 'react'
import axios from 'axios'

const getAllStocks = () => {
    return axios.get(`http://webtask.future-processing.com:8068/stocks`)
    // console.log()
}

// interface StocksData



export function Stock() {
// useStaty

// useEffect z mapowaniem po elementach api

  return (
    <div>
        <div>Stock</div> 
    </div>
    
  )
}
