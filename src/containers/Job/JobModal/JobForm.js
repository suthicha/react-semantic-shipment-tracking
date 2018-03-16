import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';
import { updateObject } from '../../../shared/utility';
import { formatDateToString } from '../../../shared/utility';
// import './JobForm.css';

class JobForm extends Component {

    state = { job: null }
    
    componentDidMount(){
        this.setState({
            job: {
                ...this.props.job, 
                DeliveryDate: formatDateToString(this.props.job.DeliveryDate, '-'),
                DepartureDate: formatDateToString(this.props.job.DepartureDate,'-'),
                ArrivalDate: formatDateToString(this.props.job.ArrivalDate, '-')
            }
        });
    }

    onChangedHandler = (event) => {
        event.preventDefault();
        const { id, value } = event.target;

        const updateJob = updateObject(this.state.job, {[id]: value.toUpperCase()});
        this.setState({job: updateJob});

    }

    onSubmitHandler = () => {
        this.props.onSubmited(this.state.job);
    }

    render(){

        if (!this.state.job) return null;
        const { 
            MasterJobNo, 
            JobNo, 
            BookingNo, 
            TaxNo, 
            CustomerName,
            OBL,
            HBL,
            CarrierBookingNo,
            DestCode,
            DestName,
            FeederVessel,
            ContainerNo,
            MotherVessel,
            VoyageNo,
            DepartureDate,
            PortOfDischargeCode,
            PortOfDischargeName,
            ArrivalDate,
            PortOfLoadingCode,
            PortOfLoadingName,
            DeliveryDate,
            Remark,
            UpdateDateTime
        } = this.state.job;

        return (
            <Form size='tiny' onSubmit={this.onSubmitHandler}>
                <Form.Group widths='equal'>
                    <Form.Input 
                        readOnly 
                        fluid 
                        value={MasterJobNo}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='MasterJobNo'
                        label='Master JobNo.' 
                        placeholder='Master JobNo' />                    
                    <Form.Input 
                        readOnly 
                        fluid 
                        value={JobNo}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='JobNo'
                        label='JobNo.' 
                        placeholder='JobNo.' />
                    <Form.Input 
                        readOnly
                        fluid 
                        value={BookingNo}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='BookingNo'
                        label='Booking No.' 
                        placeholder='Booking No.' />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        width="4"
                        fluid
                        value={TaxNo}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='TaxNo'
                        label='TaxNo'
                        required
                        placeholder='TaxNo' />
                    <Form.Input
                        width="12"
                        fluid
                        value={CustomerName}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='CustomerName'
                        label='Customer name'
                        placeholder='Customer name' />                   
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        value={OBL}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='OBL'
                        label='OBL'
                        placeholder='OBL' />
                    <Form.Input
                        fluid
                        value={HBL}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='HBL'
                        label='HBL'
                        placeholder='HBL' />
                    <Form.Input
                        fluid
                        value={CarrierBookingNo}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='CarrierBookingNo'
                        label='Carrier BookingNo.'
                        placeholder='Carrier BookingNo.' />  
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        width='4'
                        fluid
                        value={FeederVessel}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='FeederVessel'
                        label='FeederVessel'
                        placeholder='FeederVessel' />
                    <Form.Input
                        width='12'
                        fluid
                        value={ContainerNo}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='ContainerNo'
                        label='Container No.'
                        placeholder='Container No.' />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        width='4'
                        fluid
                        value={VoyageNo}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='VoyageNo'
                        label='VoyageNo'
                        placeholder='VoyageNo' />
                    <Form.Input
                        width='12'
                        fluid
                        value={MotherVessel}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='MotherVessel'
                        label='MotherVessel'
                        placeholder='MotherVessel' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        value={DestCode}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='DestCode'
                        label='Destination Code'
                        placeholder='Destination Code' />
                    <Form.Input
                        fluid
                        value={DestName}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='DestName'
                        label='Destination name'
                        placeholder='Destination name' />
                     <Form.Input
                        fluid
                        value={DepartureDate}
                        type='date'
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='DepartureDate'
                        label='ETD' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        value={PortOfDischargeCode}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='PortOfDischargeCode'
                        label='DischargePort'
                        placeholder='DischargePort' />
                    <Form.Input
                        fluid
                        value={PortOfDischargeName}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='PortOfDischargeName'
                        label='DischargeName'
                        placeholder='DischargeName' />
                    <Form.Input
                        fluid
                        value={ArrivalDate}
                        type='date'
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='ArrivalDate'
                        label='ETA' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        value={PortOfLoadingCode}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='PortOfLoadingCode'
                        label='LoadingPort'
                        placeholder='LoadingPort' />
                    <Form.Input
                        fluid
                        value={PortOfLoadingName}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='PortOfLoadingName'
                        label='LoadingName'
                        placeholder='LoadingName' />
                    <Form.Input
                        fluid
                        type='date'
                        value={DeliveryDate}
                        onChange={(e)=>this.onChangedHandler(e)}
                        id='DeliveryDate'
                        label='Delivery date' />                
                </Form.Group>
                <Form.Field>
                    <label>Remark</label>
                    <TextArea 
                        id='Remark' 
                        value={Remark} 
                        placeholder='Remark'
                        onChange={(e)=>this.onChangedHandler(e)} />
                </Form.Field>
                <Button type='button' color='google plus' onClick={()=>{this.props.onClosed()}}>
                    <Icon name="x" />
                    Cancel
                </Button>
                <Button type='submit' color='twitter' loading={this.props.saving}>
                    <Icon name="save" />
                    Save
                </Button>
                <span>{UpdateDateTime ? <span>Last update {UpdateDateTime}</span>: null}</span>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        saving: state.jobModalAgent.saving
    }
}

export default connect(mapStateToProps)(JobForm);