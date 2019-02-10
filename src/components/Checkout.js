import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import { Button, Modal } from 'antd';
import InjectedCheckoutForm from './CheckoutForm';


export class Checkout extends Component {
    state = {
        visible: false,
    };
    
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div>
                <Button className="checkout-form-botton" type="primary" onClick={this.showModal}>Checkout</Button>
                
                    <Modal
                        title="Checkout"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={null}
                    > 
                        <Elements>
                            <InjectedCheckoutForm amount={this.props.amount} orderID={this.props.orderID} />
                        </Elements>
                    </Modal>
            </div>

        );
    }
  }
  