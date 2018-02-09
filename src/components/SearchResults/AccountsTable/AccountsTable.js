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
import { config } from '@fortawesome/fontawesome';

// Prop types
const propTypes = {
    accounts: PropTypes.array,
    options: PropTypes.array,
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
        const { accounts, options } = this.props;

        let configs = {};
        let header = [
            { title: '' },
            { title: '' },
            { title: '' },
        ];
        let columnsWidths = ['40px', '40px', '40px'];

        options.forEach(option => {
            configs[option.label] = option.value;
            if (option.value) {
                columnsWidths.push('');
                header.push({ title: option.label });
            }
        });


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
                                {(config.Name) && (
                                    <TCell>{account.name}</TCell>
                                )}
                                {(config.City) && (
                                    <TCell>{account.city}</TCell>
                                )}
                                {(config.State) && (
                                    <TCell>{account.state}</TCell>
                                )}
                                {(config.Country) && (
                                    <TCell>{account.country}</TCell>
                                )}
                                {(config.Owner) && (
                                    <TCell>{account.owner}</TCell>
                                )}
                            </TRow>
                        ))}

                        {accounts.length === 0 && (
                            <TRow>
                                <TCell colSpan={header.length} align="center">No Results</TCell>
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
