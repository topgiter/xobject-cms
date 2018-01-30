// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Componets
import TTitle from '../../Table/TTitle';
import Table from '../../Table/Table';
import TRow from '../../Table/TRow';
import TCell from '../../Table/TCell';

// Styles
import './CoreBankSystemTable.css';

// Prop types
const propTypes = {
    coreBankSystems: PropTypes.array
};

const defaultProps = {
    coreBankSystems: []
};

class CoreBankSystemTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTable: true
        };
    }

    render() {
        const { showTable } = this.state;
        const { coreBankSystems } = this.props;

        const header = [
            { title: '' },
            { title: '' },
            { title: 'Match' },
            { title: 'Name' },
            { title: 'Invest Acct Desc' },
            { title: 'Invest Acct Balance' },
            { title: 'Next Maturity Date' },
            { title: 'Banking Acct' },
            { title: 'Banking Acct Balance' },
        ];
        const columnsWidths = ['40px', '40px', '', '', '', '', '', '', ''];

        return (
            <div className="core-bank-system-table">
                <TTitle
                    title="Core Banking System Results"
                    open={showTable}
                    counts={coreBankSystems.length}
                    onToggle={() => this.setState({ showTable: !showTable })}
                />

                {(showTable) && (
                    <Table
                        header={header}
                        columnsWidths={columnsWidths}
                        className="green-header"
                    >
                        {coreBankSystems.length > 0 && coreBankSystems.map((coreBankSystem, idx) => (
                            <TRow key={`coreBankSystems-${idx}`}>
                                <TCell><span className="action">Update</span></TCell>
                                <TCell><span className="action">Copy</span></TCell>
                                <TCell>{coreBankSystem.match}</TCell>
                                <TCell>{coreBankSystem.name}</TCell>
                                <TCell>{coreBankSystem.investAcctDesc}</TCell>
                                <TCell>{coreBankSystem.investAcctBalance}</TCell>
                                <TCell>{coreBankSystem.nextMaturityDate}</TCell>
                                <TCell>{coreBankSystem.bankingAcct}</TCell>
                                <TCell>{coreBankSystem.bankingAcctBalance}</TCell>
                            </TRow>
                        ))}

                        {coreBankSystems.length === 0 && (
                            <TRow>
                                <TCell colSpan={9} align="center">No Results</TCell>
                            </TRow>
                        )}
                    </Table>
                )}
            </div>
        );
    }
}

CoreBankSystemTable.propTypes = propTypes;
CoreBankSystemTable.defaultProps = defaultProps;

export default CoreBankSystemTable;
