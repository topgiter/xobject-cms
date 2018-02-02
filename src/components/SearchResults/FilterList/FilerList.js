// Libraries
import React from 'react';
import PropTypes from 'prop-types';

import iconContact from '../../../assets/images/contacts_16.png';

// Styles
import './FilterList.css';

const Filter = ({
    onClick,
    label,
}) => {
    return (
        <li>
            <span onClick={onClick}>X</span>
            <img src={iconContact} alt="contact-img" />
            <span>{label}</span>
        </li>
    );
}

const propTypes = {
    list: PropTypes.array,
    onRemoveFilter: PropTypes.func,
};
const defaultProps = {
    list: [],
    onRemoveFilter: () => {},
};

const FilterList = ({
    list,
    onRemoveFilter
}) => {
    return list.length ?
        (
            <div className="search-filter-list">
                <ul>
                    {list.map(item =>
                        <Filter
                            key={`filter-${item.id}`}
                            onClick={() => onRemoveFilter(item.id)}
                            label={item.label}
                        />
                    )}
                </ul>
            </div>
        ) :
        null;
}

FilterList.propTypes = propTypes;
FilterList.defaultProps = defaultProps;

export default FilterList;
