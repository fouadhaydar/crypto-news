import './App.css';
import { Home, Crypto, News } from './pages/index';
import { Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar';
import { Layout, Space, Typography } from 'antd';
import { Link } from 'react-router-dom'
import CryptoDetail from './component/CryptoDetail';
import React from 'react';


function App() {

  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cryptocurrencies' element={<Crypto />} />
              <Route path='/crypto/:id' element={<CryptoDetail />} />
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Cryptovers <br />
            All rights resserverd
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            <Link to='/exchanges'>Exchanges</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
