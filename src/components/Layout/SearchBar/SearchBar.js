import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-free-solid'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './SearchBar.css';

const propTypes = {
    className: PropTypes.string,
    cogIcon: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    isSearch: PropTypes.bool,
};

const defaultProps = {
    className: 'search-bar',
    cogIcon: true,
    onSubmit: (val) => {},
    isSearch: true,
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    render() {
        const { className, cogIcon, isSearch, onSubmit } = this.props;

        return (
            <div className={className}>
                <Form inline>
                    <FormGroup controlId="formInlineSearch">
                        <ControlLabel>
                            ActivePrime Search
                        </ControlLabel>

                        {(isSearch) && (
                            <FormControl
                                type="text"
                                placeholder="search..."
                                value={this.state.value}
                                onChange={(e) => this.setState({ value: e.target.value })}
                            />
                        )}
                        {(isSearch) && (
                            <Button
                                className="btn-search"
                                bsStyle="danger"
                                onClick={() => onSubmit(this.state.value)}
                            >
                                Search
                            </Button>
                        )}
                        {(isSearch && cogIcon) && (
                            <FontAwesomeIcon
                                className="icon-cog"
                                icon={faCog}
                                size="lg"
                            />
                        )}
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;