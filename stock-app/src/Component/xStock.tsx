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
const [stockAmount, setStockAmount] = useState<number>(0);
const [stockAmountOwned, setStockAmountOwned] = useState<number>(0);

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

const handlePurchase = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  setStockAmountOwned(stockAmountOwned + stockAmount);
  setStockAmount(0);
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
                      <Form onSubmit={handlePurchase}>
                        <Form.Group>
                          <Form.Control key={index} type='number' autoComplete="off" required value={stockAmount} onChange={e => {setStockAmount(Number(e.target.value))}} />
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
                    <td>{stockAmountOwned}</td>
                    <td><Button size='sm'>SELL</Button></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>   
          <h4>Available money: </h4>
        </Col>     
      </Row> 
    </Container>
    
  )
}