import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import * as actions from '../../store/actions/index';
import TrackingContent from './TrackingContent/TrackingContent';
import classes from './Tracking.css';

class Tracking extends Component {

    componentDidMount(){
        this.props.onFetchTrackingFromState();
    }

    render(){
        let content= (<Loader active className={classes.Loading} inline='centered' size='massive'>Loading...</Loader>);

        if (!this.props.loading){
            let shipment = null;
            if (this.props.shipments && this.props.shipments.length > 0){
                shipment = this.props.shipments[0];
            }
            content = <TrackingContent shipment={shipment} refno={this.props.refno} />
        }

        return(
            <div className={classes.Tracking}>
                <Grid widths='equal'>
                    <Grid.Row stretched>
                        <Grid.Column className={classes.FixRightLine}>
                            {content}
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
        shipments: state.trackingAgent.shipments,
        refno: state.trackingAgent.refno,
        error: state.trackingAgent.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTrackingFromState: () => dispatch(actions.fetchTrackingFromState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking);