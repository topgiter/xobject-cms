// Libraries
import React, { Component } from 'react';

// Components
import Wrapper from './Layout/Wrapper/Wrapper';
import SearchBar from './Layout/SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            showResults: false,
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeTerm = this.handleChangeTerm.bind(this);
        this.handleCloseSearchResults = this.handleCloseSearchResults.bind(this);
    }

    handleSearch(term) {
        this.setState({
            term,
            showResults: true,
        });
    }

    handleChangeTerm(term) {
        this.setState({
            term
        });
    }

    handleCloseSearchResults() {
        this.setState({
            showResults: false
        });
    }

    render() {
        const { term, showResults } = this.state;
        
        return (
            <Wrapper>
                <SearchBar
                    term={term}
                    onSubmit={this.handleSearch}
                />

                {(showResults) && (
                    <SearchResults
                        term={term}
                        onChangeTerm={this.handleChangeTerm}
                        onClose={this.handleCloseSearchResults}
                    />
                )}
            </Wrapper>
        );
    }
}

export default App;
