import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Step, Icon, Table, Message } from 'semantic-ui-react';
import { formatDateToString } from '../../../shared/utility';
import classes from './TrackingContent.css';

const trackingContent = props => {

    if (!props.shipment){

        return (
            <div>
                <Segment className={classes.Segment}>
                    <Header as='h2'>
                        <Icon name='search' />
                        <Header.Content color="red">
                        Tracking Alert
                        <Header.Subheader>
                            {props.refno? "Find not found refno "+ props.refno + ".":"Please enter your reference."}
                        </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Segment>
            </div>
        );
    }
    const { shipment } = props;
    const arrivalDate = formatDateToString(shipment.ArrivalDate,'-');
    const departureDate = formatDateToString(shipment.DepartureDate, '-');
    const deliveryDate = formatDateToString(shipment.DeliveryDate, '-');

    const clockStatus = (dt) => {
        const yourDate = new Date(dt);
        const currDate = new Date();
        
        if (dt === "1900-01-01" ){
            return "red";
        }else if (yourDate < currDate){
            return "green";
        }else if (yourDate > currDate){
            
            return "orange";
        }else {
            return "grey";
        }
    };

    return (
            <div>
            <Step.Group attached='top'>
            <Step>
                <Icon name='search' />
                <Step.Content>
                <Step.Title>Your reference</Step.Title>
                <Step.Description>{props.refno}</Step.Description>
                </Step.Content>
            </Step>

            <Step>
                <Icon name='folder open outline' />
                <Step.Content>
                <Step.Title>JobNo.</Step.Title>
                <Step.Description>{shipment.JobNo}</Step.Description>
                </Step.Content>
            </Step>

            <Step active>
                <Icon name='bookmark outline' />
                <Step.Content>
                    <Step.Title>{shipment.OBL}</Step.Title>
                </Step.Content>
            </Step>
            </Step.Group>

            <Segment attached>
                <Table definition>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>OBL No.</Table.Cell>
                            <Table.Cell>{shipment.OBL}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Waybill No.</Table.Cell>
                            <Table.Cell>{shipment.HBL}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Booking No. / CarrierBooking No.</Table.Cell>
                            <Table.Cell>{shipment.BookingNo}</Table.Cell>
                            <Table.Cell>{shipment.CarrierBookingNo}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Container No.</Table.Cell>
                            <Table.Cell>{shipment.ContainerNo}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Shipper</Table.Cell>
                            <Table.Cell>{shipment.TaxNo}</Table.Cell>
                            <Table.Cell>{shipment.CustomerName}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Destination</Table.Cell>
                            <Table.Cell>{shipment.DestCode} {shipment.DestName}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Loading Port</Table.Cell>
                            <Table.Cell>{shipment.PortOfLoadingCode} {shipment.PortOfLoadingName}</Table.Cell>
                            <Table.Cell><Icon name="clock" size="big" color={clockStatus(deliveryDate)} /> {deliveryDate}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Vessel / ETD.</Table.Cell>
                            <Table.Cell>{shipment.MotherVessel}</Table.Cell>
                            <Table.Cell><Icon name="clock" size="big" color={clockStatus(departureDate)} /> {departureDate}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Discharge Port</Table.Cell>
                            <Table.Cell>{shipment.PortOfDischargeCode} {shipment.PortOfDischargeName}</Table.Cell>
                            <Table.Cell><Icon name="clock" size="big" color={clockStatus(arrivalDate)} /> {arrivalDate}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Segment>
            <Message attached='bottom' error>
            <Icon name='info' />
                Remark: {shipment.Remark}
            </Message>
        </div>
    );
};

trackingContent.propTypes = {
    shipment: PropTypes.object
}

export default trackingContent;