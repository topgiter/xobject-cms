// Libraies
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Components
import SideBar from  './Sidebar/Sidebar';
import OptionsView from './OptionsView/OptionsView';
import { Grid, Row, Col } from 'react-bootstrap';

// Styles
import './ConfigView.css';

export const MENU_TYPE = {
    ORACLE_SALE_CLOUD: 'ORACLE_SALE_CLOUD',
    CORE_BANKING_SYSTEM: 'CORE_BANKING_SYSTEM',
    BACK_OFFICE_SYSTEM: 'BACK_OFFICE_SYSTEM',
};

// Prop types
const propTypes = {};

const defaultProps = {};

class ConfigView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMenu: MENU_TYPE.ORACLE_SALE_CLOUD,
            options: {
                ORACLE_SALE_CLOUD: {
                    global: {
                        label: 'Search in Oracle Sales Cloud Results',
                        value: true,
                    },
                    fields: [
                        {
                            label: 'Account Name',
                            value: true,
                        },
                        {
                            label: 'City',
                            value: true,
                        },
                        {
                            label: 'State',
                            value: true,
                        },
                        {
                            label: 'Country',
                            value: true,
                        },
                        {
                            label: 'Email',
                            value: true,
                        },
                        {
                            label: 'Phone',
                            value: true,
                        },
                        {
                            label: 'Title',
                            value: true,
                        },
                    ],
                    objects: [
                        {
                            label: 'All',
                            value: true,
                        },
                        {
                            label: 'Accounts',
                            value: true,
                        },
                        {
                            label: 'Contacts',
                            value: true,
                        },
                        {
                            label: 'Leads',
                            value: true,
                        },
                        {
                            label: 'Activities',
                            value: true,
                        },
                        {
                            label: 'Opportunities',
                            value: true,
                        },
                    ],
                },
                CORE_BANKING_SYSTEM: {
                    global: {
                        label: 'Search in Core Banking Results',
                        value: true,
                    },
                    fields: [
                        {
                            label: 'Member Name',
                            value: true,
                        },
                        {
                            label: 'Member Id',
                            value: true,
                        },
                        {
                            label: 'Investment Account',
                            value: true,
                        },
                        {
                            label: 'Investment Account Desc',
                            value: true,
                        },
                        {
                            label: 'Investment Account Balance',
                            value: true,
                        },
                        {
                            label: 'Next Maturity Date',
                            value: true,
                        },
                        {
                            label: 'Banking Account',
                            value: true,
                        },
                        {
                            label: 'Banking Account Balance',
                            value: true,
                        },
                    ],
                },
                BACK_OFFICE_SYSTEM: {
                    global: {
                        label: 'Search in Back Office System Results',
                        value: true,
                    },
                    fields: [
                        {
                            label: 'Inventory #',
                            value: true,
                        },
                        {
                            label: 'Product Id',
                            value: true,
                        },
                        {
                            label: 'Product Name',
                            value: true,
                        },
                        {
                            label: 'Product Owner',
                            value: true,
                        },
                    ],
                }
            }
        };

        this.handleChangeOptions = this.handleChangeOptions.bind(this);
    }

    handleChangeOptions(value, field, idx) {
        const { selectedMenu } = this.state;

        if (field === 'global') {
            this.setState({
                options: {
                    ...this.state.options,
                    [selectedMenu]: {
                        ...this.state.options[selectedMenu],
                        global: {
                            ...this.state.options[selectedMenu].global,
                            value
                        }
                    }
                }
            });
        } else {
            this.setState({
                options: {
                    ...this.state.options,
                    [selectedMenu]: {
                        ...this.state.options[selectedMenu],
                        [field]: this.state.options[selectedMenu][field].map((f, index) => {
                            if (idx === index) {
                                return {
                                    label: f.label,
                                    value,
                                };
                            }

                            return f;
                        })
                    }
                }
            });
        }
    }

    render() {
        const { selectedMenu, options } = this.state;

        return (
            <ReactCSSTransitionGroup
                transitionName="config-view-trans"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className="config-view">
                    <h3>Personal Configuration</h3>

                    <Grid fluid>
                        <Row>
                            <Col className="title" xs={2}>Available Systems</Col>
                            <Col className="title" xs={10}>System Options</Col>
                        </Row>
                        <Row>
                            <Col className="col-no-padding" xs={2}>
                                <SideBar
                                    selectedMenu={selectedMenu}
                                    onClick={(menu) => this.setState({ selectedMenu: menu })}
                                />
                            </Col>
                            <Col xs={10}>
                                <OptionsView
                                    options={options[selectedMenu]}
                                    onChange={(v, field, idx) => this.handleChangeOptions(v, field, idx)}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

ConfigView.propTypes = propTypes;
ConfigView.defaultProps = defaultProps;

export default ConfigView;
