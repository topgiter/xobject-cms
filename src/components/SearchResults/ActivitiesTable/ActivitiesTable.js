// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Componets
import TTitle from '../../Table/TTitle';
import Table from '../../Table/Table';
import TRow from '../../Table/TRow';
import TCell from '../../Table/TCell';

// Styles
import './ActivitiesTable.css';

// Prop types
const propTypes = {
    activities: PropTypes.array,
    options: PropTypes.array,
};

const defaultProps = {
    activities: []
};

class ActivitiesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTable: true
        };
    }

    render() {
        const { showTable } = this.state;
        const { activities, options } = this.props;

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
            <div className="activities-table">
                <TTitle
                    title="Oracle Sales Cloud Activities"
                    open={showTable}
                    counts={activities.length}
                    onToggle={() => this.setState({ showTable: !showTable })}
                />

                {(showTable) && (
                    <Table
                        header={header}
                        columnsWidths={columnsWidths}
                    >
                        {activities.length > 0 && activities.map((activity, idx) => (
                            <TRow key={`activities-${idx}`}>
                                <TCell>
                                    <input type="checkbox" />
                                </TCell>
                                <TCell><span className="action">View</span></TCell>
                                <TCell><span className="action">Go</span></TCell>
                                {(configs.Owner) && (
                                    <TCell>{activity.owner}</TCell>
                                )}
                                {(configs.Match) && (
                                    <TCell>{activity.match}</TCell>
                                )}
                                {(configs.Subject) && (
                                    <TCell>{activity.subject}</TCell>
                                )}
                                {(configs.Priority) && (
                                    <TCell>{activity.priority}</TCell>
                                )}
                                {(configs['Assigned To']) && (
                                    <TCell>{activity.assignedTo}</TCell>
                                )}
                                {(configs['Due Date']) && (
                                    <TCell>{activity.dueDate}</TCell>
                                )}
                                {(configs.Status) && (
                                    <TCell>{activity.status}</TCell>
                                )}
                            </TRow>
                        ))}

                        {activities.length === 0 && (
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

ActivitiesTable.propTypes = propTypes;
ActivitiesTable.defaultProps = defaultProps;

export default ActivitiesTable;
