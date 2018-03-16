import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import TrackingSearchBar from './TrackingSearchBar/TrackingSearchBar';
import TrackingTable from './TrackingTable/TrackingTable';
import * as actions from '../../store/actions/index';
import classes from './Tracking.css';

class Tracking extends Component {

    componentDidMount(){
        this.props.onFetchTrackingFromState();
    }

    onSearchBarClickedHandler = data => {
        this.props.onTracking(data);
    }

    render(){
        return(
            <div className={classes.Tracking}>
                <Grid widths='equal'>
                    <Grid.Row>
                        <Grid.Column>
                        <TrackingSearchBar loading={this.props.loading} clicked={this.onSearchBarClickedHandler} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column className={classes.FixRightLine}>
                            <TrackingTable loading={this.props.loading} trackingdata={this.props.trackingdata} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>    
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.trackingAgent.loading,
        trackingdata: state.trackingAgent.trackingdata,
        error: state.trackingAgent.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTracking: (refno) => dispatch(actions.tracking(refno)),
        onFetchTrackingFromState: () => dispatch(actions.fetchTrackingFromState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking);