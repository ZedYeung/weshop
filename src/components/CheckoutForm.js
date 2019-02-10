import React, { Component } from 'react';
import { Elements, CardElement, injectStripe } from 'react-stripe-elements';
import { Form, Button, Modal } from 'antd';
import InjectedCheckoutForm from './StripeCheckoutForm';


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

    saveFormRef = (formRef) => {
        this.formRef = formRef;
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
                            <InjectedCheckoutForm amount={this.props.amount} />
                        </Elements>
                    </Modal>

            </div>

        );
    }
  }
  
//   export const Checkout = injectStripe(CheckoutForm);
// export default injectStripe(CheckoutForm);