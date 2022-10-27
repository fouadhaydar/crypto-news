import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { Avatar, Typography, Menu, Button } from 'antd'
import {
    HomeOutlined,
    FundOutlined,
    MenuOutlined
} from '@ant-design/icons'
import icon from '../images/cryptocurrency.png'


function Navbar() {
    const [activeMenu,setActiveMenu] = useState(true)
    const [screenSize,setScreenSize] = useState(null)

    useEffect(() => {
        function resizeScreen () {
            setScreenSize(window.innerWidth)
        }
        window.addEventListener('resize',resizeScreen)
        resizeScreen()
        return ()=> window.removeEventListener('resize',resizeScreen)
    }, [])
    
    useEffect(()=>{
        if (screenSize<768) {
            setActiveMenu(false)
        }else {
            setActiveMenu(true)
        }
    },[screenSize])
    return (
        <div className='navbar-container'>
            <div className='logo-container'>
                <Avatar src={icon} size='large' />
                <Typography.Title level={2} className='logo' >
                    <Link to='/'>Cryptoverse</Link>
                </Typography.Title>
            </div>
            <div className='menu-container'>
            {screenSize < 768 && <Button className='menu-controll' onClick={()=> setActiveMenu(!activeMenu)}>
                <MenuOutlined/>
            </Button>}
            {activeMenu && (<div className='menu-items'>
                <Menu theme='dark'>
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                    </Menu.Item>
                </Menu>
            </div>)}
        </div>
    </div>
    )
}

export default Navbar