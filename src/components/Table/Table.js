// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Components
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/fontawesome-free-solid';

// Style
require('./Table.css');

// Prop types
const propTypes = {
    header: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            className: PropTypes.string,
            align: PropTypes.oneOf(['left', 'center', 'right']),
            sorting: PropTypes.oneOf(['sort', 'asc', 'desc'])
        })
    ),
    columnsWidths: PropTypes.arrayOf(PropTypes.string),
    onHeaderClick: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    header: [],
    columnsWidths: [],
    onHeaderClick: (col) => {},
    className: '',
};

// Component
const Table = (props) => {
    const {
        header,
        columnsWidths,
        onHeaderClick,
        className,
    } = props;

    return (
        <div className="table-wrapper">
            <table className={className}>
                {(() => {
                    if (columnsWidths && columnsWidths.length > 0) {
                        return (
                            <colgroup>
                                {columnsWidths.map((colWidth, colIndex) => {
                                    return (
                                        <col key={colIndex} width={colWidth}></col>
                                    );
                                })}
                            </colgroup>
                        );
                    }
                })()}
                {(() => {
                    if (header && header.length > 0) {
                        return (
                            <thead>
                                <tr>
                                    {header.map((theadCol, index) => {
                                        const isSorting = theadCol.sorting === 'sort' || theadCol.sorting === 'asc' || theadCol.sorting === 'desc';
                                        const theadColClassName = (theadCol.className || '') + (theadCol.align ? ' align-' + theadCol.align : 'align-left') +
                                            (isSorting ? ' sorting' : '');

                                        return (
                                            <th
                                                key={index}
                                                className={theadColClassName}
                                                onClick={(e) => isSorting ? onHeaderClick(theadCol) : {}}
                                            >
                                                <span>{theadCol.title}</span>

                                                {theadCol.sorting === 'sort' && <FontAwesomeIcon icon={faSort} />}
                                                {theadCol.sorting === 'asc' && <FontAwesomeIcon icon={faSortUp} size='lg' />}
                                                {theadCol.sorting === 'desc' && <FontAwesomeIcon icon={faSortDown} size='lg' />}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                        );
                    }
                })()}

                <tbody>
                    {props.children}
                </tbody>

            </table>
        </div>
    );
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
