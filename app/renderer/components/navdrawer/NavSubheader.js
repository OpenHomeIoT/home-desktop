import React from 'react';
import PropTypes from 'prop-types';

import Heading from "../Heading";

const NavSubheader = (props) => {
    const style = {
        navSubheader: {
            width: "100%",
            padding: ".25rem 1rem"
        },
        span: {
            
        }
    };
    return (
        <div style={style.navSubheader}>
            <Heading h={6} style={{margin: 0, padding: 0}}>{props.children}</Heading>
        </div>
    );
}
 
export default NavSubheader;