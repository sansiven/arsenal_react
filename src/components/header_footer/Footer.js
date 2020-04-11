import React from 'react';
import { ArsenalLogo } from '../ui/Icons';


const Footer = () => {
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
                <ArsenalLogo
                    width='70px'
                    height="70px"
                    link={true}
                    linkTo="/"
                />
            </div>

            <div className="footer_discl">
                Arsenal, All rights reserved.
            </div>
            
        </footer>
    );
};

export default Footer;