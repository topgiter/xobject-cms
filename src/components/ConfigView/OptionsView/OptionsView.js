// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Checkbox, Tooltip, OverlayTrigger } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/fontawesome-free-solid';

// Styles
import './OptionsView.css';

// Prop types
const propTypes = {
    options: PropTypes.shape({
        global: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.bool,
        }),
        fields: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.bool
            })
        ),
        objects: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.bool
            })
        ),
    }),
    onChange: PropTypes.func,
};
const defaultProps = {
    options: null,
    onChange: (val, field, index) => {}
};

const OptionsView = ({
    options,
    onChange,
}) => {
    const { global, fields, objects } = options;

    return (
        <div className="config-options-view">
            {(global) && (
                <Checkbox
                    checked={global.value}
                    onChange={(e) => onChange(e.target.checked, 'global', 0)}
                >
                    {global.label}
                </Checkbox>
            )}

            {(fields && fields.length) && [
                <h4
                    key="fields-title"
                    className="options-title"
                >
                    Available Fileds
                    <OverlayTrigger
                        overlay={<Tooltip id="field-tooltip">This most prestigious title was granted by Capt. Adam G Oates on november 23, in the year of our Lord 2017</Tooltip>}
                        placement="top"
                        delayShow={300}
                        delayHide={150}
                    >
                        <span className="question-icon"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                    </OverlayTrigger>
                </h4>,

                fields.map((field, idx) => {
                    return (
                        <Checkbox
                            key={`field-${idx}`}
                            checked={field.value}
                            onChange={(e) => onChange(e.target.checked, 'fields', idx)}
                        >
                            {field.label}
                        </Checkbox>
                    );
                })
            ]}

            {(objects && objects.length) && [
                <h4
                    key="fields-title"
                    className="options-title"
                >
                    Available Objects
                    <OverlayTrigger
                        overlay={<Tooltip id="field-tooltip">This most prestigious title was granted by Capt. Adam G Oates on november 23, in the year of our Lord 2017</Tooltip>}
                        placement="top"
                        delayShow={300}
                        delayHide={150}
                    >
                        <span className="question-icon"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                    </OverlayTrigger>
                </h4>,

                objects.map((object, idx) => {
                    return (
                        <Checkbox
                            key={`object-${idx}`}
                            checked={object.value}
                            onChange={(e) => onChange(e.target.checked, 'objects', idx)}
                        >
                            {object.label}
                        </Checkbox>
                    );
                })
            ]}
        </div>
    );
}

OptionsView.propTypes = propTypes;
OptionsView.defaultProps = defaultProps;

export default OptionsView;
