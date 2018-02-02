// Libraies
import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Components
import Header from '../Layout/Header/Header';
import Loader from '../Layout/Loader/Loader';
import SearchResultsInfo from './SearchResultsInfo/SearchResultsInfo';
import FilterList from './FilterList/FilerList';
import AccontsTable from './AccountsTable/AccountsTable';
import ContactsTable from './ContactsTable/ContactsTable';
import ActivitiesTable from './ActivitiesTable/ActivitiesTable';
import OpportunitiesTable from './OpportunitiesTable/OpportunitiesTable';
import CoreBankSystemsTable from './CoreBankSystemTable/CoreBankSystemTable';
import DetailsView from '../DetailsView/DetailsView';
import ConfigView from '../ConfigView/ConfigView';

// Styles
import './SearchResults.css';

// Mock data
import mockData from '../../mock/data.json';

// contants
export const ACTIVE_WIN_TYPE = {
    SEARCH_RESULTS: 'SEARCH_RESULTS',
    DETAILS_VIEW: 'DETAILS_VIEW',
    CONFIG_VIEW: 'CONFIG_VIEW',
};

// Prop types
const propTypes = {
    term: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onChangeTerm: PropTypes.func.isRequired,
};

const defaultProps = {
    term: '',
};

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            activeWindow: ACTIVE_WIN_TYPE.SEARCH_RESULTS,
            filters: [],
            accounts: [
                {
                    name: 'bob',
                    city: '',
                    state: '',
                    country: '',
                    owner: '',
                },
            ],
            contacts: [],
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
            coreBankSystems: [],
        };

        this.fetchResults = this.fetchResults.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleActiveWindow = this.handleActiveWindow.bind(this);
        this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
        this.handleToggleFilter = this.handleToggleFilter.bind(this);
    }

    componentDidMount() {
        const { term } = this.props;

        this.fetchResults(term);
    }

    // Emulate filtering in backend
    filterMockData(term) {
        const { osc, financial } = mockData;

        let contacts, coreBankSystems;

        switch (term) {
            case 'liz johnson':
                contacts = [osc[0], osc[1], osc[2]];
                coreBankSystems = [financial[0]]
                break;
            case 'bob smith':
                contacts = [osc[3], osc[4], osc[5], osc[6]];
                coreBankSystems = [financial[1]]
                break;
            case 'chuck jiovani':
                contacts = [osc[7], osc[8]];
                coreBankSystems = [financial[2]]
                break;
            case 'matt garcia':
                contacts = [osc[9]];
                coreBankSystems = [financial[3]]
                break;
            default:
                contacts = [];
                coreBankSystems = [];
        }

        return { contacts, coreBankSystems };
    }

    fetchResults(term) {
        this.setState({ isLoading: true });

        setTimeout(() => {
            const { contacts, coreBankSystems } = this.filterMockData(term);

            this.setState({
                isLoading: false,
                contacts,
                coreBankSystems,
            })
        }, 1000)
    }

    handleSearch(term) {
        const { onChangeTerm } = this.props;

        onChangeTerm(term);
        this.fetchResults(term);
    }

    handleActiveWindow(win) {
        this.setState({
            activeWindow: win
        });
    }

    handleRemoveFilter(id) {
        this.setState({
            filters: this.state.filters.filter(f => f.id !== id)
        });
    }

    handleToggleFilter(item, checked) {
        if (checked) {
            this.setState({
                filters: [
                    ...this.state.filters,
                    {
                        id: item.id,
                        label: item.full_name
                    }
                ]
            });
        } else {
            this.handleRemoveFilter(item.id);
        }
    }

    renderComponent() {
        const { accounts, contacts, activities, opportunities, coreBankSystems, isLoading, filters } = this.state;

        return (
            <div className="search-results-view">
                <SearchResultsInfo />
                <FilterList
                    list={filters}
                    onRemoveFilter={this.handleRemoveFilter}
                />
                <AccontsTable accounts={accounts} />
                <ContactsTable
                    contacts={contacts}
                    handleActiveWindow={this.handleActiveWindow}
                    filters={filters}
                    onToggleFilter={(item, checked) => this.handleToggleFilter(item, checked)}
                />
                <ActivitiesTable activities={activities} />
                <OpportunitiesTable opportunities={opportunities} />
                <CoreBankSystemsTable coreBankSystems={coreBankSystems} />

                {(isLoading) && (
                    <Loader />
                )}
            </div>
        );
    }
    render() {
        const { onClose, term } = this.props;
        const { activeWindow } = this.state;

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
                        isSearch={activeWindow === ACTIVE_WIN_TYPE.SEARCH_RESULTS}
                        term={term}
                        onClose={() => onClose()}
                        onClickConfig={() => this.handleActiveWindow(ACTIVE_WIN_TYPE.CONFIG_VIEW)}
                        onLogoClick={() => window.open('https://activeprime.com/')}
                        onClickGotoSearch={() => this.handleActiveWindow(ACTIVE_WIN_TYPE.SEARCH_RESULTS)}
                        onSubmit={(term) => this.handleSearch(term)}
                    />

                    {(activeWindow === ACTIVE_WIN_TYPE.SEARCH_RESULTS) && this.renderComponent()}
                    {(activeWindow === ACTIVE_WIN_TYPE.DETAILS_VIEW) && (
                        <DetailsView handleActiveWindow={this.handleActiveWindow} />
                    )}
                    {(activeWindow === ACTIVE_WIN_TYPE.CONFIG_VIEW) && (
                        <ConfigView handleActiveWindow={this.handleActiveWindow} />
                    )}
                </div>
            </ReactCSSTransitionGroup>
        );
    }

}

SearchResults.propTypes = propTypes;
SearchResults.defaultProps = defaultProps;

export default SearchResults;
