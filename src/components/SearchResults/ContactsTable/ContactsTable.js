// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Componets
import TTitle from '../../Table/TTitle';
import Table from '../../Table/Table';
import TRow from '../../Table/TRow';
import TCell from '../../Table/TCell';

// constants
import { ACTIVE_WIN_TYPE } from '../../App';

// Styles
import './ContactsTable.css';

// Prop types
const propTypes = {
    contacts: PropTypes.array,
    handleActiveWindow: PropTypes.func,
};

const defaultProps = {
    contacts: [],
    handleActiveWindow: (win) => {},
};

class ContactsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTable: true
        };
    }

    render() {
        const { contacts, handleActiveWindow } = this.props;
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
                        {contacts.length > 0 && contacts.map((contact, idx) => (
                            <TRow key={`contact-${idx}`}>
                                <TCell>
                                    <input type="checkbox" />
                                </TCell>
                                <TCell>
                                    <span className="action" onClick={() => handleActiveWindow(ACTIVE_WIN_TYPE.DETAILS_VIEW)}>View</span>
                                </TCell>
                                <TCell><span className="action">Go</span></TCell>
                                <TCell>{contact.match}</TCell>
                                <TCell>{contact.name}</TCell>
                                <TCell>{contact.city}</TCell>
                                <TCell>{contact.state}</TCell>
                                <TCell>{contact.title}</TCell>
                            </TRow>
                        ))}

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
