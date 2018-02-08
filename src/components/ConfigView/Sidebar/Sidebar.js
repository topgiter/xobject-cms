// Libraries
import React from 'react';
import PropTypes from  'prop-types';

// Components
import { Nav, NavItem } from 'react-bootstrap';

// constants
import { MENU_TYPE } from '../../SearchResults/SearchResults';

// Styles
import './Sidebar.css';

// Prop types
const propTypes = {
    selectedMenu: PropTypes.string,
    onClick: PropTypes.func,
};

const defaultProps = {
    selectedMenu: '',
    onClick: () => {}
};

const SideBar = ({
    selectedMenu,
    onClick,
}) => {
    return (
        <Nav className="config-view-sidebar" bsStyle="pills" stacked>
            <NavItem
                eventKey={1}
                active={selectedMenu === MENU_TYPE.ORACLE_SALE_CLOUD}
                onClick={() => onClick(MENU_TYPE.ORACLE_SALE_CLOUD)}
            >
                Oracle Sales Cloud
            </NavItem>
            <NavItem
                eventKey={2}
                active={selectedMenu === MENU_TYPE.CORE_BANKING_SYSTEM}
                onClick={() => onClick(MENU_TYPE.CORE_BANKING_SYSTEM)}
            >
                Core Banking System
            </NavItem>
            <NavItem
                eventKey={3}
                active={selectedMenu === MENU_TYPE.BACK_OFFICE_SYSTEM}
                onClick={() => onClick(MENU_TYPE.BACK_OFFICE_SYSTEM)}
            >
                Back Office System
            </NavItem>
        </Nav>
    );
}

SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;

export default SideBar;
