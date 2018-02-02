import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';
import { Button, ButtonToolbar } from 'react-bootstrap';

import './Header.css';
import logo from '../../../assets/images/activeprime_logo.png';

const propTypes = {
    term: PropTypes.string,
    onSubmit: PropTypes.func,
    onClickConfig: PropTypes.func,
    onClickGotoSearch: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onLogoClick: PropTypes.func.isRequired,
    isSearch: PropTypes.bool,
};

const defaultProps = {
    term: '',
    onClickConfig: () => {},
    onClickGotoSearch: () => {},
    onSubmit: () => {},
    isSearch: true,
}

const Header = ({
    term,
    onSubmit,
    onClickConfig,
    onClickGotoSearch,
    onClose,
    onLogoClick,
    isSearch,
}) => {
    return (
        <div className="search-results-header">
            <img src={logo} alt="company logo" onClick={onLogoClick} />

            <SearchBar
                term={term}
                isSearch={isSearch}
                className="search-bar results-search-bar"
                cogIcon={false}
                onSubmit={(term) => onSubmit(term)}
            />

            <ButtonToolbar className="pull-right">
                {(isSearch) && (
                    <Button
                        bsSize="small"
                        onClick={(e) => onClickConfig()}
                    >
                        Config
                    </Button>
                )}
                {(!isSearch) && (
                    <Button
                        bsSize="small"
                        onClick={(e) => onClickGotoSearch()}
                    >
                        Go to Search
                    </Button>
                )}
                <Button
                    bsSize="small"
                    onClick={(e) => onClose()}
                >
                    Close
                </Button>
            </ButtonToolbar>

            {(isSearch) && (
                <div className="search-time">
                    Search time: 2.0000s
                </div>
            )}
        </div>
    );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
