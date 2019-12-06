import React from 'react';
import PropTypes from 'prop-types';

const NavGroup = ({ children, style: compStyle}) => {
    const style = {
        navGroup: {
            margin: "0.5rem 0 1rem 0"
        }
    };
    Object.assign(style.navGroup, compStyle);
    return <div style={style.navGroup}>{children}</div>;
};

NavGroup.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};
 
export default NavGroup;