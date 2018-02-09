// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Componets
import TTitle from '../../Table/TTitle';
import Table from '../../Table/Table';
import TRow from '../../Table/TRow';
import TCell from '../../Table/TCell';

// constants
import { ACTIVE_WIN_TYPE } from '../SearchResults';

// Styles
import './ContactsTable.css';


// Mock data
import mockData from '../../../mock/data.json';

// Prop types
const propTypes = {
    contacts: PropTypes.array,
    filters: PropTypes.array,
    options: PropTypes.array,
    handleActiveWindow: PropTypes.func,
    onToggleFilter: PropTypes.func,
};

const defaultProps = {
    contacts: [],
    filters: [],
    handleActiveWindow: (win) => {},
    onToggleFilter: (item, checked) => {},
};

class ContactsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTable: true,
            sortingColumn: null,
            sortedIndice: [...Array(props.contacts.length).keys()], // Generate [0..n]
        };

        this.handleClickTableHeader = this.handleClickTableHeader.bind(this);
        this.handleSortIndice = this.handleSortIndice.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.contacts, this.props.contacts)) {
            this.setState({
                sortingColumn: null,
                sortedIndice:[...Array(nextProps.contacts.length).keys()]
            });
        }
    }

    isRelated(id) {
        const { filters } = this.props;

        if (filters.length === 0) return true;

        const { relations } = mockData;

        for (let k = 0; k < filters.length; k++) {
            if (relations[parseInt(filters[k].id, 10)][parseInt(id, 10)]) {
                return true;
            }
        }
    
        return false;
    }

    handleSortIndice(field, direction) {
        const contacts = this.props.contacts;
        let indices = this.state.sortedIndice;
        field = field.toLowerCase();

        indices.sort((a, b) => contacts[a][field] < contacts[b][field]);

        if (direction === 'desc') {
            indices.reverse();
        }

        return indices;
    }

    handleClickTableHeader(column) {
        const { sortingColumn } = this.state;

        if (!sortingColumn || sortingColumn.field !== column.title) {
            this.setState({
                sortingColumn: {
                    field: column.title,
                    direction: 'asc',
                    sortedIndice: this.handleSortIndice(column.title, 'asc')
                }
            });
        } else {
            if (sortingColumn.direction === 'asc') {
                this.setState({
                    sortingColumn: {
                        field: column.title,
                        direction: 'desc',
                        sortedIndice: this.handleSortIndice(column.title, 'desc')
                    }
                });
            } else {
                this.setState({
                    sortingColumn: null,
                    sortedIndice: this.state.sortedIndice.sort()
                });
            }
        }
    }

    render() {
        const { contacts, filters, options, handleActiveWindow, onToggleFilter } = this.props;
        const { showTable, sortedIndice, sortingColumn } = this.state;


        let header = [
            { title: '' },
            { title: '' },
            { title: '' },
        ];
        let columnsWidths = ['40px', '40px', '40px'];
        let configs = {};

        options.forEach(option => {
            configs[option.label] = option.value;
            if (option.value) {
                if (option.label === 'Match') {
                    header.push({
                        title: option.label,
                        sorting: sortingColumn && sortingColumn.field === 'Match' ? sortingColumn.direction : 'sort'
                    });
                    columnsWidths.push('80px');
                } else {
                    header.push({ title: option.label });
                    columnsWidths.push('');
                }
            }
        });

        // const header = [
        //     { title: '' },
        //     { title: '' },
        //     { title: '' },
        //     {
        //         title: 'Match',
        //         sorting: sortingColumn && sortingColumn.field === 'Match' ? sortingColumn.direction : 'sort'
        //     },
        //     { title: 'Name' },
        //     { title: 'City' },
        //     { title: 'State' },
        //     { title: 'Title' },
        // ];
        // const columnsWidths = ['40px', '40px', '40px', '80px', '', '', '', ''];

        return (
            <div className="contacts-table">
                <TTitle
                    title="Oracle Sales Cloud Contacts"
                    open={showTable}
                    counts={contacts.length}
                    onToggle={() => this.setState({ showTable: !showTable })}
                />

                {(showTable) && (
                    <Table
                        header={header}
                        columnsWidths={columnsWidths}
                        onHeaderClick={this.handleClickTableHeader}
                    >
                        {sortedIndice.length > 0 && sortedIndice.map((sortedIndex, idx) => {
                            const contact = contacts[sortedIndex];
                            const checked = filters.filter(f => f.id === contact.id).length;

                            if (!this.isRelated(contact.id)) {
                                return null;
                            }

                            return (
                                <TRow key={`contact-${contact.id}`}>
                                    <TCell>
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={(e) => onToggleFilter(contact, e.target.checked)}
                                        />
                                    </TCell>
                                    <TCell>
                                        <span className="action" onClick={() => handleActiveWindow(ACTIVE_WIN_TYPE.DETAILS_VIEW)}>View</span>
                                    </TCell>
                                    <TCell><span className="action">Go</span></TCell>
                                    {(configs.Match) && (
                                        <TCell>{contact.match}</TCell>
                                    )}
                                    {(configs.Name) && (
                                        <TCell>{contact.full_name}</TCell>
                                    )}
                                    {(configs.City) && (
                                        <TCell>{contact.city}</TCell>
                                    )}
                                    {(configs.State) && (
                                        <TCell>{contact.state}</TCell>
                                    )}
                                    {(configs.Title) && (
                                        <TCell>{contact.title}</TCell>
                                    )}
                                </TRow>
                            );
                        })}

                        {sortedIndice.length === 0 && (
                            <TRow>
                                <TCell colSpan={8} align="center">No Results</TCell>
                            </TRow>
                        )}
                    </Table>
                )}
            </div>
        );
    }
}

ContactsTable.propTypes = propTypes;
ContactsTable.defaultProps = defaultProps;

export default ContactsTable;
