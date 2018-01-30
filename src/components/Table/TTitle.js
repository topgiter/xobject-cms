// Libraies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid';

// Styles
import './TTitle.css';

// Prop types
const propTypes = {
    showOpenStatus: PropTypes.bool,
    showCounts: PropTypes.bool,
    open: PropTypes.bool,
    title: PropTypes.string,
    counts: PropTypes.number,
    onToggle: PropTypes.func,
};

const defaultProps = {
    showOpenStatus: true,
    showCounts: true,
    open: true,
    title: '',
    counts: 0,
};

// Component
const TTitle = ({
    showOpenStatus,
    showCounts,
    title,
    open,
    counts,
    onToggle,
}) => {
    const icon = open ? faAngleDown : faAngleUp;
    const countsText = 'Found ' + (counts ? counts : 'No') + ' Record' + (counts > 1 ? 's' : '');

    return (
        <div className="table-title">
            {(showOpenStatus) && (
                <FontAwesomeIcon icon={icon} size='lg' onClick={() => onToggle()} />
            )}
            <span className="title">
                {title}
            </span>
            {(showCounts) && (
                <span className="counts">
                    {countsText}
                </span>
            )}
        </div>
    );
}

TTitle.propTypes = propTypes;
TTitle.defaultProps = defaultProps;

export default TTitle;
