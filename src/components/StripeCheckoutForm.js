import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom'
import { message } from 'antd';
import { createOrder, checkout } from './api';

class CheckoutForm extends Component {
    state = {
        "status": null,
        "orderID": null,
    }

    handleCheckout = (e) => {
        e.preventDefault();

        createOrder({
            "order_amount": this.props.amount
        }).then((order) => {
            this.setState({
                orderID: order.id
            })
            this.props.stripe.createToken({ type: "card", name: "Weshop" })
            .then((token) => {
                if (token.error) {
                    console.log("THERE IS AN ERROR IN YOUR FORM", token.error);
                } else {
                    console.log('Received Stripe token:', token.token);
                    checkout({
                        "source": token.token.id,
                        "order_id": order.data.order_id,
                        "amount": this.props.amount 
                    }).then((res) => {
                        console.log(res)
                        console.log(res.data)
                        this.setState({
                            "status": res.data,
                        })
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            });        
        }).catch((err) => {
            console.log(err);
        })
    };

    success = () => {
        message.success('pay succeeded');
    };
    
    error = () => {
        message.error('pay failed');
    };
    
    warning = () => {
        message.warning('pay pending');
    };

    checkoutStatus = (status) => {
        switch(status) {
            case 'succeeded':
                message.success('pay succeeded');
                break
            case 'failed':
                message.error('pay failed');
                break
            case 'pending':
                message.warning('pay pending');
                break
            default:
                console.log("wrong status", status);
        }
    }

    render() {
        return (
            <div>
                {this.state.status ? <Redirect to={`/order/${this.state.orderID}`}/> : (
                    <form className="checkout">
                        <CardElement />
                        <button onClick={this.handleCheckout}>Confirm</button>
                    </form>
                )
                }
                {this.checkoutStatus(this.state.status)}
            </div>

        )
    }
}

export default injectStripe(CheckoutForm);