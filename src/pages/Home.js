import React from 'react'
import { Typography, Row, Col, Statistic } from 'antd'
import millify from 'millify'
import { useGetCryptosQuery } from '../services/Cryptoapi'
import { Link } from 'react-router-dom'
import { Crypto } from './index'
import './home.css'

const { Title } = Typography

function Home() {

    const { data, isFetching } = useGetCryptosQuery({ point: '/coins?limit=', count: 10 })
    const globalStats = data?.data?.stats

    if (isFetching) return 'Loding...'
    return (
        <>
            <Title level={2}>
                Global Crypto Stats
            </Title>
            <Row>
                <Col span={12}><Statistic title='Total Cryptocurrencies' value={millify(globalStats.total)} /></Col>
                <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title='Total Cryptocurrencies' value={millify(globalStats.totalCoins)} /></Col>
                <Col span={12}><Statistic title='Total Markets' value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
            <div className='header-sec2'>
                <Title level={2} className='title-hearder'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className='show-more'><Link to='/cryptocurrencies'> Show More </Link></Title>
            </div>
            <Crypto simplified />
        </>
    )
}

export default Home