// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './TCell.css';

// Prop types
const propTypes = {
    className: PropTypes.string,
    colSpan: PropTypes.number,
    align: PropTypes.oneOf(['left', 'center', 'right']),
};

const defaultProps = {
    className: '',
    colSpan: 1,
    align: 'left',
};

const TCell = (props) => {
    const className = 'tcell' + (props.className ? ' ' + props.className : '') + ' align-' + props.align;

    // Render
    return (
        <td className={className} colSpan={props.colSpan}>
            {props.children}
        </td>
    );
}

TCell.propTypes = propTypes;
TCell.defaultProps = defaultProps;

export default TCell;
