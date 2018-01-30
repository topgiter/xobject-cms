// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Prop types
const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

const defaultProps = {
    className: ''
};

const TRow = (props) => {
    const className = 'trow ' + props.className;

    return (
        <tr className={className}>
            {props.children }
        </tr>
    );
}

TRow.propTypes = propTypes;
TRow.defaultProps = defaultProps;

export default TRow;
