// Libraies
import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Components
import Header from '../Layout/Header/Header';

// contants
import { ACTIVE_WIN_TYPE } from '../App';

// Styles
import './DetailsView.css';

// Prop types
const propTypes = {
    handleActiveWindow: PropTypes.func,
};

const defaultProps = {};

class DetailsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { handleActiveWindow } = this.props;

        return (
            <ReactCSSTransitionGroup
                transitionName="details-view-trans"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className="details-view">
                    <Header
                        isSearch={false}
                        onClose={() => handleActiveWindow('')}
                        onClickGotoSearch={() => handleActiveWindow(ACTIVE_WIN_TYPE.SEARCH_RESULTS)}
                        onLogoClick={() => window.open('https://activeprime.com/')}
                        onSubmit={(term) => {}}
                    />
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

DetailsView.propTypes = propTypes;
DetailsView.defaultProps = defaultProps;

export default DetailsView;
