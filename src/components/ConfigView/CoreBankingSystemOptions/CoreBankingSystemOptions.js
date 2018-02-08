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
import './CoreBankingSystemOptions.css';

const propTypes = {
    options: PropTypes.object,
    handleChangeOptions: PropTypes.func
};
const defaultProps = {};

class CoreBankingSystemOptions extends React.Component {
    render() {
        const { options, handleChangeOptions } = this.props;

        return (
            <ReactCSSTransitionGroup
                transitionName="options-trans"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <Grid fluid className="core-banking-system-options">
                    <Row>
                        <Col>
                            <Checkbox
                                checked={options.global.value}
                                onChange={(e) => handleChangeOptions(MENU_TYPE.CORE_BANKING_SYSTEM, 'global', e.target.checked)}
                            >
                                Search in Core Banking Results
                            </Checkbox>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <h4 className="options-title">
                                {`Available Fields`}
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
                                {options.fields.map((field, index) => {
                                    return (
                                        <Checkbox
                                            key={`field-${index}`}
                                            checked={field.value}
                                            onChange={(e) => handleChangeOptions(MENU_TYPE.CORE_BANKING_SYSTEM, 'fields', e.target.checked, index)}
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

CoreBankingSystemOptions.propTypes = propTypes;
CoreBankingSystemOptions.defaultProps = defaultProps;

export default CoreBankingSystemOptions;
