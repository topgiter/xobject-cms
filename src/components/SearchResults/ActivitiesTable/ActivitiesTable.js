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
    activities: PropTypes.array
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
        const { activities } = this.props;

        const header = [
            { title: '' },
            { title: '' },
            { title: '' },
            { title: 'Owner' },
            { title: 'Match' },
            { title: 'Subject' },
            { title: 'Priority' },
            { title: 'Assigned To' },
            { title: 'Due Date' },
            { title: 'Status' },
        ];
        const columnsWidths = ['40px', '40px', '40px', '', '', '', '', ''];

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
                                <TCell>{activity.owner}</TCell>
                                <TCell>{activity.match}</TCell>
                                <TCell>{activity.subject}</TCell>
                                <TCell>{activity.priority}</TCell>
                                <TCell>{activity.assignedTo}</TCell>
                                <TCell>{activity.dueDate}</TCell>
                                <TCell>{activity.status}</TCell>
                            </TRow>
                        ))}

                        {activities.length === 0 && (
                            <TRow>
                                <TCell colSpan={10} align="center">No Results</TCell>
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
