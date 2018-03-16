import React, {Component} from 'react';
import { Table, Dimmer, Loader, Input, Form } from 'semantic-ui-react';
import { formatDateToString } from '../../../shared/utility';
import classes from './JobTable.css';
import Aux from '../../../hoc/Aux/Aux';

class JobTable extends Component {

    rowClickedHandler = (event, job)=> {
        event.preventDefault();
        this.props.rowClicked(job);
    }

    render(){
        let rows = null;

        if (this.props.loading){
            rows = (
                <Table.Row>
                    <Table.Cell colSpan='11'>
                    <Dimmer active inverted>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    </Table.Cell>
                </Table.Row>
            );
        }

        if (this.props.data){
            
            rows = this.props.data.map((job)=>{
                const etd = new Date(job.DepartureDate);
                let rowClass = [classes.Row];

                if (job.ShipmentStatus){
                    rowClass = [classes.Row, classes.ActiveItem];
                }

                return (
                    <Table.Row 
                        key={job.TrxNo} 
                        className={rowClass.join(' ')}
                        onClick={(event)=>this.rowClickedHandler(event, job)}>
                        <Table.Cell className={classes.Cell}>{ formatDateToString(etd,'-')}</Table.Cell>
                        <Table.Cell className={classes.Cell}>{job.MasterJobNo}</Table.Cell>                        
                        <Table.Cell className={classes.Cell}>{job.OBL}</Table.Cell>
                        <Table.Cell className={classes.Cell}>{job.JobNo}</Table.Cell>                   
                        <Table.Cell className={classes.Cell}>{job.BookingNo}</Table.Cell>
                        <Table.Cell className={classes.Cell}>{job.CustomerName}</Table.Cell>
                        <Table.Cell className={classes.Cell}>{job.MotherVessel}</Table.Cell>
                        <Table.Cell className={classes.Cell}>{job.VoyageNo}</Table.Cell>
                        <Table.Cell className={classes.Cell}>{job.DestCode}</Table.Cell>
                        <Table.Cell className={classes.Cell}>{job.DestName}</Table.Cell>
                    </Table.Row>
                );
            });
        }

        return (
            <Aux>
                <div className={classes.Search}>
                    <Form size="tiny">
                        <Form.Field>
                            <Input icon='search' placeholder='Search...' onChange={(e) => this.props.onSearch(e)} />
                        </Form.Field>
                    </Form>
                </div>
                <Table color={'red'} celled structured className={classes.Table}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className={classes.HeaderCell} rowSpan='2'>ETD.</Table.HeaderCell> 
                            <Table.HeaderCell className={classes.HeaderCell} rowSpan='2'>MasterJob</Table.HeaderCell>                                                                       
                            <Table.HeaderCell className={classes.HeaderCell} rowSpan='2'>OBL</Table.HeaderCell>
                            <Table.HeaderCell className={classes.HeaderCell} rowSpan='2'>JobNo</Table.HeaderCell>                        
                            <Table.HeaderCell className={classes.HeaderCell} rowSpan='2'>Booking No.</Table.HeaderCell>                        
                            <Table.HeaderCell className={classes.HeaderCell} rowSpan='2'>Customer</Table.HeaderCell>
                            <Table.HeaderCell className={classes.HeaderCell} colSpan='2'>Vessel</Table.HeaderCell>
                            <Table.HeaderCell className={classes.HeaderCell} colSpan='2'>Destination</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell className={classes.HeaderCell}>Mother</Table.HeaderCell>
                            <Table.HeaderCell className={classes.HeaderCell}>VOY</Table.HeaderCell>
                            <Table.HeaderCell className={classes.HeaderCell}>Code</Table.HeaderCell>
                            <Table.HeaderCell className={classes.HeaderCell}>Name</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            {rows}
                    </Table.Body>
                </Table>
            </Aux>
        );
    }
}

export default JobTable;