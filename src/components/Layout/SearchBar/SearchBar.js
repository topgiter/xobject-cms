import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-free-solid'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './SearchBar.css';

const propTypes = {
    term: PropTypes.string,
    className: PropTypes.string,
    cogIcon: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    isSearch: PropTypes.bool,
};

const defaultProps = {
    term: '',
    className: 'search-bar',
    cogIcon: true,
    onSubmit: (val) => {},
    isSearch: true,
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: props.term
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.term !== this.props.term) {
            this.setState({ term: nextProps.term });
        }
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
                                value={this.state.term}
                                onChange={(e) => this.setState({ term: e.target.value })}
                            />
                        )}
                        {(isSearch) && (
                            <Button
                                className="btn-search"
                                bsStyle="danger"
                                onClick={() => onSubmit(this.state.term)}
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