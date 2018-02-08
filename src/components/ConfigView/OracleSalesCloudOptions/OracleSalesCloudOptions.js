// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Components
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/fontawesome-free-solid';
import { Checkbox, Tooltip, OverlayTrigger, Grid, Row, Col } from 'react-bootstrap';
import { MENU_TYPE } from '../../SearchResults/SearchResults';

// Styles
import './OracleSalesCloudOptions.css';

const propTypes = {
    options: PropTypes.object,
    handleChangeOptions: PropTypes.func
};
const defaultProps = {};

class OracleSalesCloudOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedObject: 'Accounts'
        };
    }

    render() {
        const { selectedObject } = this.state;
        const { options, handleChangeOptions } = this.props;
        const { objects } = options;

        const selectedObjectName = selectedObject.toLowerCase() + 'Fields';
        const fields = selectedObject === 'All' ? [] : options[selectedObjectName];

        return (
            <ReactCSSTransitionGroup
                transitionName="options-trans"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <Grid fluid className="oracle-sales-cloud-options">
                    <Row>
                        <Col>
                            <Checkbox
                                checked={options.global.value}
                                onChange={(e) => handleChangeOptions(MENU_TYPE.ORACLE_SALE_CLOUD, 'global', e.target.checked)}
                            >
                                Search in Oracle Sales Cloud Results
                            </Checkbox>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={3}>
                            <h4 className="options-title">
                                Available Objects
                                <OverlayTrigger
                                    overlay={<Tooltip id="field-tooltip">This most prestigious title was granted by Capt. Adam G Oates on november 23, in the year of our Lord 2017</Tooltip>}
                                    placement="top"
                                    delayShow={300}
                                    delayHide={150}
                                >
                                    <span className="question-icon"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                                </OverlayTrigger>
                            </h4>

                            {/* <Checkbox
                                checked={objects[0].value}
                                onChange={(e) => handleChangeOptions(MENU_TYPE.ORACLE_SALE_CLOUD, 'objects', e.target.checked, 0)}
                            >
                                All
                            </Checkbox> */}

                            <ul className="objects-list">
                                {objects.filter(object => object.label !== 'All').map((object, index) => {
                                    return (
                                        <li
                                            key={`object-${index}`}
                                            onClick={(e) => this.setState({ selectedObject: object.label })}
                                            className={selectedObject === object.label ? 'active' : ''}
                                        >
                                            <Checkbox
                                                checked={object.value}
                                                onChange={(e) => handleChangeOptions(MENU_TYPE.ORACLE_SALE_CLOUD, 'objects', e.target.checked, index + 1)}
                                            /> <span>{object.label}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Col>
                        <Col xs={8} xsOffset={1}>
                            <h4 className="options-title">
                                {`Available Fields for ${selectedObject}`}
                                <OverlayTrigger
                                    overlay={<Tooltip id="field-tooltip">This most prestigious title was granted by Capt. Adam G Oates on november 23, in the year of our Lord 2017</Tooltip>}
                                    placement="top"
                                    delayShow={300}
                                    delayHide={150}
                                >
                                    <span className="question-icon"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                                </OverlayTrigger>
                            </h4>

                            <div className="fields-content">
                                {fields.map((field, index) => {
                                    return (
                                        <Checkbox
                                            key={`field-${index}`}
                                            checked={field.value}
                                            onChange={(e) => handleChangeOptions(MENU_TYPE.ORACLE_SALE_CLOUD, selectedObjectName, e.target.checked, index)}
                                        >
                                            {field.label}
                                        </Checkbox>
                                    );
                                })}
                            </div>
                        </Col>
                    </Row>

                </Grid>
            </ReactCSSTransitionGroup>
        );
    }
}

OracleSalesCloudOptions.propTypes = propTypes;
OracleSalesCloudOptions.defaultProps = defaultProps;

export default OracleSalesCloudOptions;
