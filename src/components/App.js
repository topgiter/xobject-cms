// Libraries
import React, { Component } from 'react';

// Components
import Wrapper from './Layout/Wrapper/Wrapper';
import SearchBar from './Layout/SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import DetailsView from './DetailsView/DetailsView';

// constants
export const ACTIVE_WIN_TYPE = {
    SEARCH_RESULTS: 'SEARCH_RESULTS',
    DETAILS_VIEW: 'DETAILS_VIEW',
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            activeWindow: '',
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleActiveWindow = this.handleActiveWindow.bind(this);
    }

    handleSearch(term) {
        this.setState({
            term,
            activeWindow: ACTIVE_WIN_TYPE.SEARCH_RESULTS
        });
    }

    handleActiveWindow(activeWindow) {
        this.setState({ activeWindow });
    }

    render() {
        const { activeWindow } = this.state;

        return (
            <Wrapper>
                <SearchBar onSubmit={(term) => this.handleSearch(term)} />

                {(activeWindow === ACTIVE_WIN_TYPE.SEARCH_RESULTS) && (
                    <SearchResults
                        handleActiveWindow={this.handleActiveWindow}
                        gotoDtailsView={this.handleActiveWindow}
                    />
                )}

                {(activeWindow === ACTIVE_WIN_TYPE.DETAILS_VIEW) && (
                    <DetailsView
                        handleActiveWindow={this.handleActiveWindow}
                    />
                )}

            </Wrapper>
        );
    }
}

export default App;
