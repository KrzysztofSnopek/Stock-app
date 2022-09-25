import { useState, useEffect} from 'react'
import { Table, Button } from 'react-bootstrap'

// var XMLParser = require('react-xml-parser');
// var xml = new XMLParser().parseFromString(xmlText);
// console.log(xml);
// console.log(xml.getElementsByTagName('Name'));

export interface ItemData {
  name: string;
  code: string;
  unit: number;
  price: number;
}

interface StockData {
  items: ItemData[];
  publicationDate: string;
}

export function Stock(): JSX.Element {
// useStaty
const [singleStockData, setSingleStockData] = useState<StockData>()

// useEffect z mapowaniem po elementach api
useEffect(() => {
    const fetchData = async () => {
		const res = await fetch('http://webtask.future-processing.com:8068/stocks')
        .then((response) => response.text())
        .then((xmlText) => JSON.parse(xmlText))
        .then((data) => data)
        .catch((error) => {
            console.log(error);
        });
  setSingleStockData(res)}
  fetchData();
  setInterval(() => {
    fetchData()
  }, 30000) 
}, []);

  return (
    <div>
      <h2>Stock prices</h2>
      <Table size='sm'>
        <thead>
          <tr>
            <th>Company</th>
            <th>Code</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {singleStockData?.items.map((stock, index) => {
            return(
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.code}</td>
                <td>{stock.price}</td>
                <td><Button>BUY</Button></td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <h2>My wallet</h2>
      <Table size='sm'>
        <thead>  
          <tr>
            <th>Company</th>
            <th>Code</th>
            <th>Value</th>
            <th>Number of units</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {singleStockData?.items.map((stock, index) => {
            return(
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.code}</td>
                <td>{stock.price}</td>
                <td>nr of bought</td>
                <td><Button>SELL</Button></td>
              </tr>
            )
          })}
        </tbody>
      </Table>         
    </div>
    
  )
}
