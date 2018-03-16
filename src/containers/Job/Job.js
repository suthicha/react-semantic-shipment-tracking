import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Grid, Segment } from 'semantic-ui-react';
import JobSearchBar from './JobSearchBar/JobSearchBar';
import JobTable from './JobTable/JobTable';
import JobModal from './JobModal/JobModal';
import Aux from '../../hoc/Aux/Aux';
import classes from './Job.css';

class Job extends Component {
    state = { 
        open: true,
        openModal: false,
        job: null
    }

    handleClose = () => this.setState({ open: true })

    componentDidMount(){
        this.props.onFetchJobFromState();
    }

    componentWillReceiveProps = (nextProps) => {
      if (nextProps.saveJobStatus){
          this.setState({openModal:false});
      }
    }

    onSearchBarClickedHandler = (data) => {
        const { etd, reference} = data;
        this.props.onFetchJob(etd, reference);
    }

    onRowClickedHandler = (data) => {
        this.setState({openModal:true});
        this.props.onOpenJobModal(data);
    }

    onModalClosedHandler = () => {
        this.setState({openModal:false});
    }

    onModalSubmitHandler = (job) => {
        this.props.onSaveJobTsPool(job);
    }

    searchHandler = (event) => {
        event.preventDefault();
        const refno = event.target.value.toUpperCase();
        this.props.onFilterJob(refno);
    }

    render() {
        
        let jobModal = null;
        
        if (this.props.showModal){
            jobModal = (
                <JobModal 
                    show={this.props.showModal} 
                    open={this.state.openModal}
                    job={this.props.job}
                    modalClosed={this.onModalClosedHandler} />
            );
        }

        if (!this.props.showModal && this.state.openModal){
            jobModal = (
                <JobModal 
                    show={this.props.showModal} 
                    open={this.state.openModal}
                    job={this.props.job}
                    modalClosed={this.onModalClosedHandler}
                    modalSubmited={this.onModalSubmitHandler} />
            );
        }
        
        return (
            <Aux>
                {jobModal}
                <div className={classes.Job}>
                    
                    <Grid columns='equal'>
                        <Grid.Row stretched>
                        <Grid.Column>
                            <Segment className={classes.Segment}>
                                <JobSearchBar clicked={this.onSearchBarClickedHandler} />
                            </Segment>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <JobTable 
                                    loading={this.props.loading}
                                    data={this.props.jobs} 
                                    rowClicked={this.onRowClickedHandler}
                                    onSearch={this.searchHandler} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        jobs: state.jobAgent.jobs,
        loading: state.jobAgent.loading,
        error: state.jobAgent.error,
        showModal: state.jobModalAgent.showModal,
        job: state.jobModalAgent.job,
        saveJobStatus: state.jobModalAgent.saveJobStatus,
        saveError: state.jobModalAgent.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchJob: (etd, refno) => dispatch(actions.jobQuery(etd, refno)),
        onFetchJobFromState: () => dispatch(actions.fetchJobFromState()),
        onOpenJobModal: (job) => dispatch(actions.openJobModal(job)),
        onSaveJobTsPool: (job) => dispatch(actions.saveJobToTSPool(job)),
        onFilterJob: (refno) => dispatch(actions.jobFilter(refno))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Job);