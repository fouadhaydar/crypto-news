import React, { useEffect, useState } from 'react'
import { millify } from 'millify'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'antd'
import { useGetCryptosQuery } from '../services/Cryptoapi'
import './crypto.css'


// const {Title} = Typography

function Crypto({ simplified }) {

    const count = simplified ? 10 : 100
    const { data, isFetching } = useGetCryptosQuery({ point: '/coins?limit=', count })
    const [cryptos, setCryptos] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {

        setCryptos(data?.data?.coins.filter(Element => Element.name.toLowerCase().includes(search.toLowerCase())))

    }, [data, search])


    if (isFetching) return 'Loding...'
    return (
        <>
            {!simplified && <div className='input-filed'>
                <input type="text" placeholder='Shearch Cryptocurrency' value={search} onChange={e => setSearch(e.target.value)} />
            </div>}
            <Row gutter={[32, 32]} className='card-container'>
                {cryptos?.map(crypto => {
                    return (
                        <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid} >
                            <Link to={`/crypto/${crypto.uuid}`} state={{
                                price: crypto.price,
                                marketCap: crypto.marketCap,
                                dailyChange: crypto.change
                            }}>
                                <Card
                                    title={`${crypto.rank}.${crypto.name}`}
                                    bordered={false}
                                    extra={<img src={crypto.iconUrl} className='crypto-image' alt='logo' />}
                                    hoverable
                                // style={{ backgroundColor: `${crypto.color}` }}
                                >
                                    <p>Price: {millify(crypto.price)}</p>
                                    <p>Market Cap: {millify(crypto.marketCap)}</p>
                                    <p>Daily change: {millify(crypto.change)}</p>
                                </Card>
                            </Link>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default Crypto