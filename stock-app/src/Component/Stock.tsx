import React, { useState, useEffect} from 'react'
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap'

interface ItemData {
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
const [singleStockData, setSingleStockData] = useState<StockData>();
const [stockAmount0, setStockAmount0] = useState<number>(0);
const [stockAmount1, setStockAmount1] = useState<number>(0);
const [stockAmount2, setStockAmount2] = useState<number>(0);
const [stockAmount3, setStockAmount3] = useState<number>(0);
const [stockAmount4, setStockAmount4] = useState<number>(0);
const [stockAmount5, setStockAmount5] = useState<number>(0);
const [stockAmountOwned0, setStockAmountOwned0] = useState<number>(0);
const [stockAmountOwned1, setStockAmountOwned1] = useState<number>(0);
const [stockAmountOwned2, setStockAmountOwned2] = useState<number>(0);
const [stockAmountOwned3, setStockAmountOwned3] = useState<number>(0);
const [stockAmountOwned4, setStockAmountOwned4] = useState<number>(0);
const [stockAmountOwned5, setStockAmountOwned5] = useState<number>(0);
const [wallet, setWallet] = useState<number>(1500);
const fixedWallet = wallet.toFixed(2);

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

const handlePurchase = (e: React.FormEvent<HTMLFormElement>, stockName: string): void => {
  e.preventDefault();
  buyAction(stockName);
}

const handleSale = (e: React.MouseEvent, stockName: string): void => {
  e.preventDefault();
  sellAction(stockName);
}



const buyAction = (stockName: string): void => {
  if( stockName === 'Future Processing') {
    setStockAmountOwned0(stockAmountOwned0 + stockAmount0);
    const price: number = singleStockData?.items[0].price as number
    setWallet(wallet - (stockAmount0 * price))
    setStockAmount0(0);
  } else if( stockName === 'FP Lab') {
    setStockAmountOwned1(stockAmountOwned1 + stockAmount1);
    const price: number = singleStockData?.items[1].price as number
    setWallet(wallet - (stockAmount1 * price))
    setStockAmount1(0);
  } else if( stockName === 'Progress Bar') {
    setStockAmountOwned2(stockAmountOwned2 + stockAmount2);
    const price: number = singleStockData?.items[2].price as number
    setWallet(wallet - (stockAmount2 * price))
    setStockAmount2(0);
  } else if( stockName === 'FP Coin') {
    setStockAmountOwned3(stockAmountOwned3 + stockAmount3);
    const price: number = singleStockData?.items[3].price as number
    setWallet(wallet - (stockAmount3 * price))
    setStockAmount3(0);
  } else if( stockName === 'FP Adventure') {
    setStockAmountOwned4(stockAmountOwned4 + stockAmount4);
    const price: number = singleStockData?.items[4].price as number
    setWallet(wallet - (stockAmount4 * price))
    setStockAmount4(0);
  } else if( stockName === 'Deadline 24') {
    setStockAmountOwned5(stockAmountOwned5 + stockAmount5);
    const price: number = singleStockData?.items[5].price as number
    setWallet(wallet - (stockAmount5 * price))
    setStockAmount5(0);
  }
}

const sellAction = (stockName: string): void => {
  if( stockName === 'Future Processing') {
    const price: number = singleStockData?.items[0].price as number
    setWallet(wallet + (stockAmountOwned0 * price))
    setStockAmountOwned0(0);
  } else if( stockName === 'FP Lab') {
    const price: number = singleStockData?.items[1].price as number
    setWallet(wallet + (stockAmountOwned1 * price))
    setStockAmountOwned1(0);
  } else if( stockName === 'Progress Bar') {
    const price: number = singleStockData?.items[2].price as number
    setWallet(wallet + (stockAmountOwned2 * price))
    setStockAmountOwned2(0);
  } else if( stockName === 'FP Coin') {
    const price: number = singleStockData?.items[3].price as number
    setWallet(wallet + (stockAmountOwned3 * price))
    setStockAmountOwned3(0);
  } else if( stockName === 'FP Adventure') {
    const price: number = singleStockData?.items[4].price as number
    setWallet(wallet + (stockAmountOwned4 * price))
    setStockAmountOwned4(0);
  } else if( stockName === 'Deadline 24') {
    const price: number = singleStockData?.items[5].price as number
    setWallet(wallet + (stockAmountOwned5 * price))
    setStockAmountOwned5(0);
  }
}

const getStockAmountOwned = (stockName: string): number => {
  if( stockName === 'Future Processing') {
    return stockAmountOwned0;
  } else if( stockName === 'FP Lab') {
    return stockAmountOwned1;
  } else if( stockName === 'Progress Bar') {
    return stockAmountOwned2;
  } else if( stockName === 'FP Coin') {
    return stockAmountOwned3;
  } else if( stockName === 'FP Adventure') {
    return stockAmountOwned4;
  } else if( stockName === 'Deadline 24') {
    return stockAmountOwned5;
  } else return 0
}

const getStockAmount = (stockName: string): number => {
  if( stockName === 'Future Processing') {
    return stockAmount0;
  } else if( stockName === 'FP Lab') {
    return stockAmount1;
  } else if( stockName === 'Progress Bar') {
    return stockAmount2;
  } else if( stockName === 'FP Coin') {
    return stockAmount3;
  } else if( stockName === 'FP Adventure') {
    return stockAmount4;
  } else if( stockName === 'Deadline 24') {
    return stockAmount5;
  } else return 0
}

const setStockAmount = (stockName: string, stockAmount: number): void => {
  if( stockName === 'Future Processing') {
    setStockAmount0(stockAmount)
  } else if( stockName === 'FP Lab') {
    setStockAmount1(stockAmount)
  } else if( stockName === 'Progress Bar') {
    setStockAmount2(stockAmount)
  } else if( stockName === 'FP Coin') {
    setStockAmount3(stockAmount)
  } else if( stockName === 'FP Adventure') {
    setStockAmount4(stockAmount)
  } else if( stockName === 'Deadline 24') {
    setStockAmount5(stockAmount)
  }
}

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <h3>Stock prices</h3>
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
                    <td>
                      <Form onSubmit={e => handlePurchase(e, stock.name)}>
                        <Form.Group>
                          <Form.Control key={index} type='number' autoComplete="off" 
                            required value={getStockAmount(stock.name)} 
                            onChange={e => {setStockAmount(stock.name, Number(e.target.value))}} 
                            min="0"
                            max={Math.floor(wallet / stock.price)}
                          />
                        </Form.Group>
                        <Button className='w-100' type='submit' size='sm'>
                          BUY
                        </Button>
                      </Form>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
        <Col xs={6}>
          <h3>My wallet</h3>
          <Table size='sm'>
            <thead>  
              <tr>
                <th>Company</th>
                <th>Code</th>
                <th>Value</th>
                <th>Units</th>
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
                    <td>{getStockAmountOwned(stock.name)}</td>
                    <td><Button size='sm' onClick={e => handleSale(e, stock.name)}>SELL</Button></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>   
          <h4>Available money:
            <p>{fixedWallet}</p>
          </h4>
        </Col>     
      </Row> 
    </Container>
  )
}
