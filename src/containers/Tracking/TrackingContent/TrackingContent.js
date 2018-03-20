import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Step, Icon, Table, Message } from 'semantic-ui-react';
import { formatDateToString } from '../../../shared/utility';

const trackingContent = props => {

    if (!props.shipment){
        return <h2>Find not found...</h2>
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
                <Icon name='truck' />
                <Step.Content>
                <Step.Title>Shipping</Step.Title>
                <Step.Description>Choose your shipping options</Step.Description>
                </Step.Content>
            </Step>

            <Step active>
                <Icon name='payment' />
                <Step.Content>
                <Step.Title>Billing</Step.Title>
                <Step.Description>Enter billing information</Step.Description>
                </Step.Content>
            </Step>

            <Step disabled>
                <Icon name='info' />
                <Step.Content>
                <Step.Title>Confirm Order</Step.Title>
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