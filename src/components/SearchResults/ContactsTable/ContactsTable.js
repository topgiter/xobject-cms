// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Componets
import TTitle from '../../Table/TTitle';
import Table from '../../Table/Table';
import TRow from '../../Table/TRow';
import TCell from '../../Table/TCell';

// constants
import { ACTIVE_WIN_TYPE } from '../SearchResults';

// Styles
import './ContactsTable.css';

// Prop types
const propTypes = {
    contacts: PropTypes.array,
    filters: PropTypes.array,
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
            showTable: true
        };
    }

    render() {
        const { contacts, filters, handleActiveWindow, onToggleFilter } = this.props;
        const { showTable } = this.state;
        const header = [
            { title: '' },
            { title: '' },
            { title: '' },
            { title: 'Match', sorting: 'sort' },
            { title: 'Name' },
            { title: 'City' },
            { title: 'State' },
            { title: 'Title' },
        ];
        const columnsWidths = ['40px', '40px', '40px', '80px', '', '', '', ''];

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
                    >
                        {contacts.length > 0 && contacts.map((contact, idx) => {
                            const checked = filters.filter(f => f.id === contact.id).length;

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
                                    <TCell>{contact.match}</TCell>
                                    <TCell>{contact.full_name}</TCell>
                                    <TCell>{contact.city}</TCell>
                                    <TCell>{contact.state}</TCell>
                                    <TCell>{contact.title}</TCell>
                                </TRow>
                            );
                        })}

                        {contacts.length === 0 && (
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
