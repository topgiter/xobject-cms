import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './SearchResultsInfo.css';

class SearchResultsInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false
        };
    }

    render() {
        return (
            <div className="results-info">
                <div
                    className="title"
                    onClick={() => this.setState({ showInfo: !this.state.showInfo}) }
                >
                    Understanding my results
                </div>
                <ReactCSSTransitionGroup
                    transitionName="slide"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={100}
                    transitionLeaveTimeout={100}
                >
                    {(this.state.showInfo) && (
                        <div className="content">
                            Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
                        </div>
                    )}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default SearchResultsInfo;