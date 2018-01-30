// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Componets
import TTitle from '../../Table/TTitle';
import Table from '../../Table/Table';
import TRow from '../../Table/TRow';
import TCell from '../../Table/TCell';

// Styles
import './AccountsTable.css';

// Prop types
const propTypes = {
    accounts: PropTypes.array
};

const defaultProps = {
    accounts: []
};

class AccountsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTable: true
        };
    }

    render() {
        const { showTable } = this.state;
        const { accounts } = this.props;

        const header = [
            { title: '' },
            { title: '' },
            { title: '' },
            { title: 'Name' },
            { title: 'City' },
            { title: 'State' },
            { title: 'Country' },
            { title: 'Owner' },
        ];
        const columnsWidths = ['40px', '40px', '40px', '', '', '', '', ''];

        return (
            <div className="accounts-table">
                <TTitle
                    title="Oracle Sales Cloud Accounts"
                    open={showTable}
                    counts={accounts.length}
                    onToggle={() => this.setState({ showTable: !showTable })}
                />

                {(showTable) && (
                    <Table
                        header={header}
                        columnsWidths={columnsWidths}
                    >
                        {accounts.length > 0 && accounts.map((account, idx) => (
                            <TRow key={`accounts-${idx}`}>
                                <TCell>
                                    <input type="checkbox" />
                                </TCell>
                                <TCell><span className="action">View</span></TCell>
                                <TCell><span className="action">Go</span></TCell>
                                <TCell>{account.name}</TCell>
                                <TCell>{account.city}</TCell>
                                <TCell>{account.state}</TCell>
                                <TCell>{account.country}</TCell>
                                <TCell>{account.owner}</TCell>
                            </TRow>
                        ))}

                        {accounts.length === 0 && (
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

AccountsTable.propTypes = propTypes;
AccountsTable.defaultProps = defaultProps;

export default AccountsTable;
