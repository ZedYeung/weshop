import React, { Component } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { OrderProductList } from './OrderProductList';
import { OrderDetailList } from './OrderDetailList';
import { getOrder } from './api';


export class Order extends Component {
    state = {
        order: null,
    }

    componentDidMount() {
        getOrder(
            this.props.orderID
        ).then((res) => {
            console.log(res)
            this.setState({
                order: res.data,
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render () {
        const { order } = this.state
        return (
            <div>
                <OrderDetailList orderDetail={order && [order]} />
                <OrderProductList products={order && order.product}/>
            </div>
        )
    }
}