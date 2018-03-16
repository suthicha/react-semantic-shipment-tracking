import React from 'react';
import { Step, Icon } from 'semantic-ui-react';
import { formatDateToString } from '../../../shared/utility';
import classes from './TrackingItem.css';

const trackingItem = ({data}) => {
    
    const { BookingNo, 
        ArrivalDate, 
        DepartureDate, 
        OBL, 
        ContainerNo, 
        PortOfLoadingName,
        PortOfDischargeName,
        CustomerName,
        CarrierBookingNo
     } = data;

    return (
    <div className={classes.TrackingItem}>
        <Step.Group size='mini' className={classes.fixuistep}>
            <Step link>
                <Icon color='blue' name='flag' />
                <Step.Content>
                    <Step.Title>BOOKING</Step.Title>
                    <Step.Description>
                        <div>{BookingNo}</div>
                        <div>{CustomerName}</div>
                    </Step.Description>
                </Step.Content>
            </Step>
            <Step link>
                <Icon color='orange' name='clock' />
                <Step.Content>
                    <Step.Title>ETD</Step.Title>
                    <Step.Description>
                        <div>{ formatDateToString(DepartureDate,'-') }</div>
                        <div>{PortOfLoadingName}</div>
                    </Step.Description>
                </Step.Content>
            </Step>
            <Step link>
                <Icon color='green' name='ship' />
                <Step.Content>
                    <Step.Title>TRANSPORT</Step.Title>
                    <Step.Description>
                        <div>{OBL}</div>
                        <div>{ContainerNo}</div>
                        <div>{CarrierBookingNo}</div>
                    </Step.Description>
                </Step.Content>
            </Step>
            <Step link>
                <Icon color='yellow' name='clock' />
                <Step.Content>
                    <Step.Title>ETA</Step.Title>
                    <Step.Description>
                        <div>{formatDateToString(ArrivalDate, '-')}</div>
                        <div>{PortOfDischargeName}</div>
                    </Step.Description>
                </Step.Content>
            </Step>
            <Step link>
                <Icon color='blue' name='info' />
                <Step.Content>
                    <Step.Title>Information</Step.Title>
                    <Step.Description></Step.Description>
                </Step.Content>
            </Step>
        </Step.Group>
    </div>);
}

export default trackingItem;