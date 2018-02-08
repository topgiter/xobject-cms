// Libraies
import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Components
import SideBar from  './Sidebar/Sidebar';
import OracleSalesCloudOptions from './OracleSalesCloudOptions/OracleSalesCloudOptions';
import CoreBankingSystemOptions from './CoreBankingSystemOptions/CoreBankingSystemOptions';
import BackOfficeSystemOptions from './BackOfficeSystemOptions/BackOfficeSystemOptions';
import { Grid, Row, Col } from 'react-bootstrap';
import { MENU_TYPE } from '../SearchResults/SearchResults';

// Styles
import './ConfigView.css';

// Prop types
const propTypes = {
    options: PropTypes.object,
    handleChangeOptions: PropTypes.func,
};

const defaultProps = {};

class ConfigView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMenu: MENU_TYPE.ORACLE_SALE_CLOUD,
        };
    }

    render() {
        const { selectedMenu } = this.state;
        const { options, handleChangeOptions } = this.props;

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

                    <Grid fluid className="full-height">
                        <Row>
                            <Col className="title" xs={2}>Available Systems</Col>
                            <Col className="title" xs={10}>System Options</Col>
                        </Row>
                        <Row className="full-height">
                            <Col className="col-no-padding full-height bg-sidebar" xs={2}>
                                <SideBar
                                    selectedMenu={selectedMenu}
                                    onClick={(menu) => this.setState({ selectedMenu: menu })}
                                />
                            </Col>
                            <Col xs={10}>
                                {(selectedMenu === MENU_TYPE.ORACLE_SALE_CLOUD) && (
                                    <OracleSalesCloudOptions
                                        options={options.ORACLE_SALE_CLOUD}
                                        handleChangeOptions={handleChangeOptions}
                                    />
                                )}

                                {(selectedMenu === MENU_TYPE.CORE_BANKING_SYSTEM) && (
                                    <CoreBankingSystemOptions
                                        options={options.CORE_BANKING_SYSTEM}
                                        handleChangeOptions={handleChangeOptions}
                                    />
                                )}

                                {(selectedMenu === MENU_TYPE.BACK_OFFICE_SYSTEM) && (
                                    <BackOfficeSystemOptions
                                        options={options.BACK_OFFICE_SYSTEM}
                                        handleChangeOptions={handleChangeOptions}
                                    />
                                )}
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
