import React from 'react';
import { FacebookFilled,GithubOutlined  } from '@ant-design/icons';
import './footer.scss'
const Footer = () =>{
    return (
        <div className='footer container'>
            <div className='footer__disb'>
            Copyright ThangYuu © 2022
            </div>
            <div className='social'>
            <a href='https://www.facebook.com/03668382xx'><FacebookFilled /></a>
            <a href='https://github.com/yukithang13'><GithubOutlined /></a>
            </div>
        </div>
    );
}

export default Footer;