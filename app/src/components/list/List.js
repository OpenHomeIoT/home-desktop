import React from 'react';
import PropTypes from 'prop-types';

import ListItem from "./ListItem";

const List = ({ children, style: listStyle, type = "ul" }) => {
    const style = {
        list: {
            fontSize: ".8rem"
        }
    };
    Object.assign(style.list, listStyle);
    return (
        <div style={style.list}>
            { type === "ol"  &&
                <ol>
                    {children}
                </ol>
            }

            { type === "ul"  &&
                <ul>
                    {children}
                </ul>
            }
        </div>
    );
}

List.propTypes = {
    children: PropTypes.arrayOf(PropTypes.objectOf(ListItem)),
    type: PropTypes.oneOf([
        "ul",
        "ol"
    ])
};

export default List;