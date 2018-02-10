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
    coreBankSystems: PropTypes.array,
    options: PropTypes.array,
};

const defaultProps = {
    coreBankSystems: []
};

function createMarkup(html) {
    return {__html: html};
}

class CoreBankSystemTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTable: true
        };
    }

    render() {
        const { showTable } = this.state;
        const { coreBankSystems, options } = this.props;

        let header = [
            { title: '' },
            { title: '' },
        ];
        let columnsWidths = ['40px', '40px'];
        let configs = {};

        options.forEach(option => {
            configs[option.label] = option.value;
            if (option.value) {
                header.push({ title: option.label });
                columnsWidths.push('');
            }
        });

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
                            <TRow key={`coreBankSystems-${coreBankSystem.id}`}>
                                <TCell><span className="action">Update</span></TCell>
                                <TCell><span className="action">Copy</span></TCell>
                                {(configs.Match) && (
                                    <TCell>{coreBankSystem.match}</TCell>
                                )}
                                {(configs.Name) && (
                                    <TCell>{coreBankSystem.full_name}</TCell>
                                )}
                                {(configs['Invest Acct Desc']) && (
                                    <TCell>
                                        <div dangerouslySetInnerHTML={createMarkup(coreBankSystem.investment_account_desc)} />
                                    </TCell>
                                )}
                                {(configs['Invest Acct Balance']) && (
                                    <TCell>
                                        <div dangerouslySetInnerHTML={createMarkup(coreBankSystem.investment_account_balance)} />
                                    </TCell>
                                )}
                                {(configs['Next Maturity Date']) && (
                                    <TCell>
                                        <div dangerouslySetInnerHTML={createMarkup(coreBankSystem.next_maturity_date)} />
                                    </TCell>
                                )}
                                {(configs['Banking Acct']) && (
                                    <TCell>
                                        <div dangerouslySetInnerHTML={createMarkup(coreBankSystem.banking_account)} />
                                    </TCell>
                                )}
                                {(configs['Banking Acct Balance']) && (
                                    <TCell>
                                        <div dangerouslySetInnerHTML={createMarkup(coreBankSystem.banking_account_balance)} />
                                    </TCell>
                                )}
                            </TRow>
                        ))}

                        {coreBankSystems.length === 0 && (
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

CoreBankSystemTable.propTypes = propTypes;
CoreBankSystemTable.defaultProps = defaultProps;

export default CoreBankSystemTable;
