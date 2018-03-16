import React, { Component } from 'react';
import TrackingItem from '../TrackingItem/TrackingItem';
import classes from './TrackingTable.css';

class TrackingTable extends Component {
    
    render(){
        const jobs = this.props.trackingdata;
        let content = this.props.loading? "Loading...": "Please enter your reference.";

        if (jobs) {
            content = jobs.map((item, i)=>{
            return <TrackingItem key={i} data={item}/>;
            });

            if (jobs.length === 0){
                content = "Find NotFound !!!";
            }
        }
        
        return (
            <div className={classes.TrackingTable}>
               {content}
            </div>
        )
    }
}

export default TrackingTable;