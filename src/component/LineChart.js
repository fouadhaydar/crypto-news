import React from 'react'
import {Row,Col,Typography} from 'antd'
import './line.css'
import {Line,} from 'react-chartjs-2'
import { Chart as chartJs, CategoryScale,LineElement, PointElement, LinearScale} from "chart.js";

chartJs.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
)
const {Title}= Typography
function LineChart({coinsHistory, currentPrice, coinName}) {
    const coinsPrice = []
    const coinTimestamp = []

    for (let i = 0 ; i < coinsHistory?.data?.history?.length; i+=1  ) {
        // console.log(coinsHistory.data.history[i].timestamp)
        coinsPrice.push(coinsHistory?.data?.history[i].price)
        coinTimestamp.push(new Date(coinsHistory?.data?.history[i].timestamp).toLocaleDateString())
    }
    console.log(Date.now())
    
    const data = {
        labels : coinTimestamp,
        datasets: [ 
            {
                labale:'Price in usd',
                data:coinsPrice,
                fill:false,
                backgroundColor:'#0071bd', 
                borderColor:'#0071bd'
            }
        ]
    }
    // const options={}
    const options = {
        scales: {
            y:[
                {
                    ticks:{
                        beginAtZero:true
                    }
                }
            ]
        }
    }
    return (
        <>
        <Row className='chart-header'>
            <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
            <Col className='price-container'>
                <Title level={5} className='price-change'>{coinsHistory?.data?.change}% </Title>
                <Title level={5} className='current-price'> current {coinName} Price: {currentPrice}</Title>
            </Col>
        </Row>
        <Line data={data} options={options}></Line>
        </>
    )
}
// options={options && options}
export default LineChart