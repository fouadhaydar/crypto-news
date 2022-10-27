import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'
import { Col, Row, Typography, Select } from 'antd'
import { useGetCryptosQuery, useGetCryptoHistoryQuery } from '../services/Cryptoapi'
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined

} from '@ant-design/icons';
import './cryptoDetail.css'
import LineChart from './LineChart'


function CryptoDetail() {

    const [timePeriod, setTimePeriod] = useState('24h')
    let { id } = useParams()
    const { state } = useLocation()
    const { price } = state
    const { data:coinHistory, isFetching:fetch} =  useGetCryptoHistoryQuery({uuid:id,}) 
    const { data, isFetching} = useGetCryptosQuery({ point: `/coin/${id}`, count: '' })
    const cryptoDetails = data?.data?.coin
    const { Title, Text } = Typography
    

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']
    // console.log('cryptoHistory',coinHistory, fetch)


    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.['marketCap'] && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];
    const { Option } = Select;
    if (isFetching) return 'Loding...'
    return (
        <Col className='detail-container'>
            <Col className='header-container'>
                <Title level={2}>
                    {cryptoDetails?.name}
                </Title>
                <p>
                    {/* {cryptoDetails?.description} */}
                </p>
            </Col>
            {/* <Select
                defaultValue='7d'
                className='select-timePeriod'
                placeholder='select time period'
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((date, i) => {
                    return (
                        <Option value={date} key={i} >{date}</Option>
                    )
                })}
            </Select> */}
            {/* <LineChart 
            coinsHistory={coinHistory}
            currentPrice={millify(cryptoDetails?.price)}
            coinName={cryptoDetails?.name}
            /> */}
            <Col className='stats-container'>
                <Row gutter={[12, 12]} className="main-row" >
                    <Col className='coin-value-statistic' lg={10} md={8} sm={12}>
                        <Col className='coin-value-statistic-right'>
                            <Title level={3} className='title-header'>
                                {`${cryptoDetails?.name} Value Statistics`}
                            </Title>
                            <p>
                                {`An overview showing the stats of ${cryptoDetails?.name}`}
                            </p>
                            {stats.map(({ icon, title, value }) => (
                                <Col className='coin-stats'>
                                    <Col className='coin-stats-name'>
                                        <Text> {icon} </Text>
                                        <Text> {title} </Text>
                                    </Col>
                                    <Text className='value'> {value} </Text>
                                </Col>))}
                        </Col>
                    </Col>
                    <Col className='other-statistics' lg={10} md={8} sm={12}>
                        <Title level={3} className='title-header'>
                            {`Other Statistics`}
                        </Title>
                        <p>
                            {`An overview showing the stats of all cryptocurrencies`}
                        </p>
                        {genericStats.map(({ title, value, icon }) => (
                            <Col className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text> {icon} </Text>
                                    <Text> {title} </Text>
                                </Col>
                                <Text className='value'> {value} </Text>
                            </Col>
                        ))}
                    </Col>
                </Row>
            </Col>
            <Col className='desc-andlinks'>
                <Col className='coin-desc-link'>
                    <Row className='coin-desc' lg={32}>
                        <Title level={3} className='coins-detail-header'>
                            What is {cryptoDetails?.name}
                        </Title>
                        {cryptoDetails && HTMLReactParser(cryptoDetails?.description)}
                    </Row>
                    <Col className='coins-link' lg={32}>
                        <Title level={3} className='coin-details-heading'>
                            {cryptoDetails?.name} Links
                        </Title>
                        {cryptoDetails?.links?.map((link, i) => (
                            <Row className='coin-link' key={i}>
                                <Title level={5} className='link-name'>
                                    {link.type}
                                </Title>
                                <a href={link.url} target='_blank' rel='noreferrer'>
                                    {link.name}
                                </a>
                            </Row>
                        ))}
                        </Col>
                    </Col>
                </Col>
        </Col>
    )
}

export default CryptoDetail