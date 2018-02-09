// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Componets
import TTitle from '../../Table/TTitle';
import Table from '../../Table/Table';
import TRow from '../../Table/TRow';
import TCell from '../../Table/TCell';

// Styles
import './OpportunitiesTable.css';

// Prop types
const propTypes = {
    opportunities: PropTypes.array,
    options: PropTypes.array,
};

const defaultProps = {
    opportunities: []
};

class OpportunitiesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTable: true
        };
    }

    render() {
        const { showTable } = this.state;
        const { opportunities, options } = this.props;

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
                header.push({ title: option.label });
                columnsWidths.push('');
            }
        });

        return (
            <div className="opportunities-table">
                <TTitle
                    title="Oracle Sales Cloud Opportunities"
                    open={showTable}
                    counts={opportunities.length}
                    onToggle={() => this.setState({ showTable: !showTable })}
                />

                {(showTable) && (
                    <Table
                        header={header}
                        columnsWidths={columnsWidths}
                    >
                        {opportunities.length > 0 && opportunities.map((opportunity, idx) => (
                            <TRow key={`opportunities-${idx}`}>
                                <TCell>
                                    <input type="checkbox" />
                                </TCell>
                                <TCell><span className="action">View</span></TCell>
                                <TCell><span className="action">Go</span></TCell>
                                {(configs.Owner) && (
                                    <TCell>{opportunity.owner}</TCell>
                                )}
                                {(configs['Opportunity Name']) && (
                                    <TCell>{opportunity.opportunityName}</TCell>
                                )}
                                {(configs['Account Name']) && (
                                    <TCell>{opportunity.accountName}</TCell>
                                )}
                                {(configs['Primary Contract']) && (
                                    <TCell>{opportunity.primaryContract}</TCell>
                                )}
                            </TRow>
                        ))}

                        {opportunities.length === 0 && (
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

OpportunitiesTable.propTypes = propTypes;
OpportunitiesTable.defaultProps = defaultProps;

export default OpportunitiesTable;
