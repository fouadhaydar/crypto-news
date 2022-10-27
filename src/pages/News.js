import { Typography, Avatar, Card, Col, Row, Select } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
// import { useGetCryptoNewsQuery } from '../services/CryptoNewsApi'
import { useGetCryptosQuery } from '../services/Cryptoapi'
import './News.css'
// import moment from 'moment'

const { Title, Text } = Typography
// const demoImage = 'https://www.shutterstock.com/image-photo/gold-bitcoindigital-electronic-money-dyeing-ultra-1007768968'

function News({ simplifide }) {

    const { data } = useGetCryptosQuery({ point: '/search-suggestions', count: '' })
    // data && console.log(data)

    // const { data } = useGetCryptoNewsQuery()
    const Mydata = data?.data?.coins

    return (
        <>
            {/* <Select
        showSearch
        className='select-news'
        placeholder='select-crypto'
        optionFilterProp="children"
        filterOption={(input,option)=> }
        >
            <Option></Option>
            <Option></Option>
        </Select> */}
            <Row gutter={[32, 32]} className='first-container'>
                {Mydata?.map((item, i) => {
                    return (
                        <Col xs={24} sm={24} lg={6} key={i} className='second-container'>
                            <Link >
                                <Card
                                    bordered={false}
                                    hoverable
                                    className='card'
                                    title={item.symbol}
                                    extra={<img src={item.iconUrl} alt='icon' style={{
                                        width: '30px',
                                        height: '30px'
                                    }} />}
                                    key={item.uuid}
                                >
                                    <div className='news-img-container'>
                                        <Title level={4}>{`${item.name.substring(0, 50)}...`}</Title>
                                    </div>
                                    {/* <p>
                                        {item.description.length > 100
                                            ? `${item.description.substring(0, 100)}...`
                                            : item.description
                                        }
                                    </p>
                                    <div className='provider-container'>
                                        <div>
                                            <Avatar size={24}
                                                src={item.provider[0].image.thumbnail.contentUrl} />
                                            <Text>{item.provider[0]?.name}</Text>
                                        </div>
                                        <Text>{moment(item.datePublished).startOf('ss').fromNow()}</Text>
                                    </div> */}
                                </Card>
                            </Link>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default News