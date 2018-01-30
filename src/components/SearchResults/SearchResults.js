// Libraies
import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Components
import Header from '../Layout/Header/Header';
import SearchResultsInfo from './SearchResultsInfo/SearchResultsInfo';
import AccontsTable from './AccountsTable/AccountsTable';
import ContactsTable from './ContactsTable/ContactsTable';
import ActivitiesTable from './ActivitiesTable/ActivitiesTable';
import OpportunitiesTable from './OpportunitiesTable/OpportunitiesTable';
import CoreBankSystemsTable from './CoreBankSystemTable/CoreBankSystemTable';

// Styles
import './SearchResults.css';


// Prop types
const propTypes = {
    handleActiveWindow: PropTypes.func.isRequired,
};

const defaultProps = {};

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: [
                {
                    name: 'bob',
                    city: '',
                    state: '',
                    country: '',
                    owner: '',
                },
            ],
            contacts: [
                {
                    match: '95.5%',
                    name: 'Bobbie Smit',
                    city: '',
                    state: '',
                    title: '',
                },
                {
                    match: '93%',
                    name: 'Robbie Smithe',
                    city: '',
                    state: '',
                    title: '',
                },
                {
                    match: '92%',
                    name: 'Rob Smith',
                    city: '',
                    state: '',
                    title: '',
                },
                {
                    match: '87.5%',
                    name: 'Robert Smythe',
                    city: '',
                    state: '',
                    title: '',
                },
            ],
            activities: [
                {
                    owner: 'bob',
                    match: '100%',
                    subject: 'Send Proposal',
                    priority: 'High',
                    assignedTo: 'John Dunbar',
                    dueDate: '3/1/18',
                    status: 'In Progress',
                },
            ],
            opportunities: [
                {
                    owner: 'bob',
                    opportunityName: 'sample opp',
                    accountName: 'xyz',
                    primaryContract: 'my contract',
                },
            ],
            // coreBankSystems: [
            //     {
            //         match: '87.5%',
            //         name: 'Robert Smythe',
            //         investAcctDesc: '1 Year CD - 0123',
            //         investAcctBalance: '$10,456',
            //         nextMaturityDate: '5/5/2018',
            //         bankingAcct: 'Adv - Tiered Checking - 1162',
            //         bankingAcctBalance: '$32,456',
            //     },
            //     {
            //         match: '',
            //         name: '',
            //         investAcctDesc: '5 Year CD - 8923',
            //         investAcctBalance: '$150,000',
            //         nextMaturityDate: '3/4/2020',
            //         bankingAcct: 'Savings - 45682',
            //         bankingAcctBalance: '$43,098',
            //     }
            // ],
            coreBankSystems: [],
        };
    }

    render() {
        const { handleActiveWindow } = this.props;
        const { accounts, contacts, activities, opportunities, coreBankSystems } = this.state;

        return (
            <ReactCSSTransitionGroup
                transitionName="search-result-trans"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className="search-results">
                    <Header
                        onClose={() => handleActiveWindow('')}
                        onClickConfig={() => handleActiveWindow('')}
                        onLogoClick={() => window.open('https://activeprime.com/')}
                        onSubmit={(term) => {}}
                    />
                    <SearchResultsInfo />
                    <AccontsTable accounts={accounts} />
                    <ContactsTable
                        contacts={contacts}
                        handleActiveWindow={(win) => handleActiveWindow(win)}
                    />
                    <ActivitiesTable activities={activities} />
                    <OpportunitiesTable opportunities={opportunities} />
                    <CoreBankSystemsTable coreBankSystems={coreBankSystems} />
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

SearchResults.propTypes = propTypes;
SearchResults.defaultProps = defaultProps;

export default SearchResults;
