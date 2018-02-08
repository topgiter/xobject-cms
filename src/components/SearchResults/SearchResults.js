// Libraies
import React, { Component, Fragment } from 'react';
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

export const MENU_TYPE = {
    ORACLE_SALE_CLOUD: 'ORACLE_SALE_CLOUD',
    CORE_BANKING_SYSTEM: 'CORE_BANKING_SYSTEM',
    BACK_OFFICE_SYSTEM: 'BACK_OFFICE_SYSTEM',
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

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            activeWindow: ACTIVE_WIN_TYPE.SEARCH_RESULTS,
            filters: [],
            accounts: [],
            contacts: [],
            activities: [],
            opportunities: [],
            coreBankSystems: [],
            options: {
                ORACLE_SALE_CLOUD: {
                    global: {
                        label: 'Search in Oracle Sales Cloud Results',
                        value: true,
                    },
                    accountsFields: [
                        {
                            label: 'Account Name',
                            value: true,
                        },
                        {
                            label: 'Account City',
                            value: true,
                        },
                        {
                            label: 'Account State',
                            value: true,
                        },
                        {
                            label: 'Account Country',
                            value: true,
                        },
                        {
                            label: 'Account Email',
                            value: true,
                        },
                    ],
                    contactsFields: [
                        {
                            label: 'Contact Name',
                            value: true,
                        },
                        {
                            label: 'Contact City',
                            value: true,
                        },
                        {
                            label: 'Contact State',
                            value: true,
                        }
                    ],
                    leadsFields: [
                        {
                            label: 'Lead Name',
                            value: true,
                        },
                        {
                            label: 'Lead City',
                            value: true,
                        },
                        {
                            label: 'Lead tate',
                            value: true,
                        },
                    ],
                    activitiesFields: [
                        {
                            label: 'Account Name',
                            value: true,
                        },
                        {
                            label: 'City',
                            value: true,
                        },
                        {
                            label: 'State',
                            value: true,
                        },
                        {
                            label: 'Country',
                            value: true,
                        },
                        {
                            label: 'Email',
                            value: true,
                        },
                        {
                            label: 'Phone',
                            value: true,
                        },
                        {
                            label: 'Title',
                            value: true,
                        },
                    ],
                    opportunitiesFields: [
                        {
                            label: 'Account Name',
                            value: true,
                        },
                        {
                            label: 'City',
                            value: true,
                        },
                        {
                            label: 'State',
                            value: true,
                        },
                        {
                            label: 'Country',
                            value: true,
                        },
                        {
                            label: 'Email',
                            value: true,
                        },
                        {
                            label: 'Phone',
                            value: true,
                        },
                        {
                            label: 'Title',
                            value: true,
                        },
                    ],
                    objects: [
                        {
                            label: 'All',
                            value: true,
                        },
                        {
                            label: 'Accounts',
                            value: true,
                        },
                        {
                            label: 'Contacts',
                            value: true,
                        },
                        {
                            label: 'Leads',
                            value: true,
                        },
                        {
                            label: 'Activities',
                            value: true,
                        },
                        {
                            label: 'Opportunities',
                            value: true,
                        },
                    ],
                },
                CORE_BANKING_SYSTEM: {
                    global: {
                        label: 'Search in Core Banking Results',
                        value: true,
                    },
                    fields: [
                        {
                            label: 'Member Name',
                            value: true,
                        },
                        {
                            label: 'Member Id',
                            value: true,
                        },
                        {
                            label: 'Investment Account',
                            value: true,
                        },
                        {
                            label: 'Investment Account Desc',
                            value: true,
                        },
                        {
                            label: 'Investment Account Balance',
                            value: true,
                        },
                        {
                            label: 'Next Maturity Date',
                            value: true,
                        },
                        {
                            label: 'Banking Account',
                            value: true,
                        },
                        {
                            label: 'Banking Account Balance',
                            value: true,
                        },
                    ],
                },
                BACK_OFFICE_SYSTEM: {
                    global: {
                        label: 'Search in Back Office System Results',
                        value: true,
                    },
                    fields: [
                        {
                            label: 'Inventory #',
                            value: true,
                        },
                        {
                            label: 'Product Id',
                            value: true,
                        },
                        {
                            label: 'Product Name',
                            value: true,
                        },
                        {
                            label: 'Product Owner',
                            value: true,
                        },
                    ],
                }
            }
        };

        this.fetchResults = this.fetchResults.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleActiveWindow = this.handleActiveWindow.bind(this);
        this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
        this.handleToggleFilter = this.handleToggleFilter.bind(this);
        this.handleChangeOptions = this.handleChangeOptions.bind(this);
    }

    componentDidMount() {
        const { term } = this.props;

        this.fetchResults(term);
    }

    // Emulate filtering in backend
    filterMockData(term) {
        const { osc, financial, accounts, activities, opportunities } = mockData;

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

        return { contacts, coreBankSystems, accounts, activities, opportunities };
    }

    fetchResults(term) {
        this.setState({ isLoading: true });

        setTimeout(() => {
            const { contacts, coreBankSystems, accounts, activities, opportunities } = this.filterMockData(term);

            this.setState({
                isLoading: false,
                contacts,
                coreBankSystems,
                accounts,
                activities,
                opportunities,
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

    handleChangeOptions(menu, field, value, idx) {
        if (field === 'global') {
            this.setState({
                options: {
                    ...this.state.options,
                    [menu]: {
                        ...this.state.options[menu],
                        global: {
                            ...this.state.options[menu].global,
                            value
                        }
                    }
                }
            });
        } else {
            this.setState({
                options: {
                    ...this.state.options,
                    [menu]: {
                        ...this.state.options[menu],
                        [field]: this.state.options[menu][field].map((f, index) => {
                            if (idx === index) {
                                return {
                                    label: f.label,
                                    value,
                                };
                            }

                            return f;
                        })
                    }
                }
            });
        }
    }

    renderComponent() {
        const { accounts, contacts, activities, opportunities, coreBankSystems, isLoading, filters } = this.state;

        return (
            <div className="search-results-view">
                {(!isLoading) && (
                    <Fragment>
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
                    </Fragment>
                )}

                {(isLoading) && (
                    <Loader />
                )}
            </div>
        );
    }

    render() {
        const { onClose, term } = this.props;
        const { activeWindow, options } = this.state;

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
                        <ConfigView
                            options={options}
                            handleChangeOptions={this.handleChangeOptions}
                        />
                    )}
                </div>
            </ReactCSSTransitionGroup>
        );
    }

}

SearchResults.propTypes = propTypes;
SearchResults.defaultProps = defaultProps;

export default SearchResults;
