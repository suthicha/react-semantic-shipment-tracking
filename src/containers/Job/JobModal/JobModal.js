import React, {Component} from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import JobForm from './JobForm';
import classes from './JobModal.css';

class JobModal extends Component {
    
    render(){
        
        let loader = null 
        let modalClass = classes.Close;
        if (this.props.open){
            modalClass = classes.FadeIn;
        }
        
        if (this.props.show){
            loader = <Backdrop show={true} title="Preparing" />;
        }
       
        let modal = (
            <Modal 
                className={modalClass}
                closeIcon 
                closeOnDimmerClick={false}
                open={this.props.open} 
                onClose={() => this.props.modalClosed()}>
                <Modal.Header className={classes.ModalHeader}>
                    <Icon name='ship' />
                    Booking Information
                </Modal.Header>
                <Modal.Content>
                    <JobForm 
                        job={this.props.job} 
                        onClosed={this.props.modalClosed}
                        onSubmited={this.props.modalSubmited} />
                </Modal.Content>
                
            </Modal>
            );

        return this.props.open && this.props.job ? modal: loader;
    }
}

export default JobModal;