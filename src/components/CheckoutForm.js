import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom'
import { message, Button } from 'antd';
import { AddressList } from './AddressList';
import { createOrder, checkout } from './api';

class CheckoutForm extends Component {
    state = {
        status: null,
        shipping_address: null,
        orderID: this.props.orderID,
    }

    
    handleCheckout = (e) => {
        e.preventDefault();

        if ( this.state.orderID == null ) {
            if ( this.state.shipping_address == null ) {
                message.error('Please select shipping address');
                return
            }
            createOrder({
                ...this.state.shipping_address,
                "order_amount": this.props.amount
            }).then((res) => {
                this.setState({
                    orderID: res.data.order_id,
                }, () => {
                    this.createCheckout()
                })
            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.createCheckout()
        }

    };

    createCheckout = () => {
        this.props.stripe.createToken({ type: "card", name: "Weshop" })
        .then((res) => {
            if (res.error) {
                console.log("THERE IS AN ERROR IN YOUR FORM", res.error);
            } else {
                console.log('Received Stripe token:', res.token);
                this.callCheckout(res.token)
            }
        });  
    }

    callCheckout = (token) => {
        checkout({
            "source": token.id,
            "order_id": this.state.orderID,
            "amount": this.props.amount 
        }).then((res) => {
            this.setState({
                "status": res.data,
            }, () => {
                this.checkoutStatus(this.state.status)
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    checkoutStatus = (status) => {
        switch(status) {
            case 'succeeded':
                message.success('pay succeeded');
                break
            case 'pending':
                message.warning('pay pending');
                break
            case 'failed':
                message.error('pay failed');
                break
            default:
                console.log("wrong status", status);
        }
    }

    setAddress = (address) => {
        this.setState({
            shipping_address: Object.assign({}, ...Object.keys(address).map(k => ({["shipping_" + k]: address[k]})))
        })
    }

    render() {
        return (
            <div>
                {this.state.status === "succeeded" ? <Redirect to="/thankyou" /> : (
                    <form className="checkout">
                        <AddressList setAddress={this.setAddress} />
                        <CardElement />
                        <Button
                            block type="primary"
                            onClick={this.handleCheckout}
                            style={{marginTop: '20px'}}>
                            Confirm
                        </Button>
                    </form>
                )
                }
            </div>

        )
    }
}

export default injectStripe(CheckoutForm);