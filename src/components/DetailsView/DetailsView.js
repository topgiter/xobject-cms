// Libraies
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Components
import { Grid, Row, Col } from 'react-bootstrap';

// Styles
import './DetailsView.css';

// Prop types
const propTypes = {};

const defaultProps = {};

class DetailsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <ReactCSSTransitionGroup
                transitionName="details-view-trans"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className="details-view">
                    <h3>Record Details</h3>

                    <Grid fluid>
                        <Row>
                            <Col className="title">Key Information</Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <div className="details-content">
                                    <div><b>First Name: </b> Lisa</div>
                                    <div><b>Last Name: </b> Johnnssen</div>
                                    <div><b>Account Name: </b> ActivePrime_test</div>
                                    <div><b>Title: </b> Owner</div>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="details-content">
                                    <div><b>Business Phone:</b> </div>
                                    <div><b>Home Phone:</b> 381-315-9879</div>
                                    <div><b>Mobile Phone:</b> </div>
                                    <div><b>Email:</b> </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="title" sm={6}>Mailing Address</Col>
                            <Col className="title" sm={6}>Other Address</Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <div className="details-content">
                                    <div><b>Address:</b> </div>
                                    <div><b>Mailing City:</b> Westland</div>
                                    <div><b>Mailing State / Province:</b> CO</div>
                                    <div><b>Zip / Postal:</b> </div>
                                    <div><b>Mailing Country:</b> </div>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="details-content">
                                    <div><b>Address:</b> </div>
                                    <div><b>City:</b> Westland</div>
                                    <div><b>State / Province:</b> CO</div>
                                    <div><b>Zip / Postal:</b> </div>
                                    <div><b>Country:</b> </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

DetailsView.propTypes = propTypes;
DetailsView.defaultProps = defaultProps;

export default DetailsView;
