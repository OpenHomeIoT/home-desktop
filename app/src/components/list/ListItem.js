import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    render() {
        const { children, style: compStyle } = this.props;
        const style = {
            listItem: {
                margin: "0 0 0 2rem"
            }
        };
        Object.assign(style.listItem, compStyle);
        return (
            <li style={style.listItem}>{children}</li>
        );
    }
}

ListItem.propTypes = {
    children: PropTypes.node
};
 
export default ListItem;