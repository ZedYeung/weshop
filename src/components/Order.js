import React, { Component } from 'react';
import { Table, InputNumber,  Button, Row, Col, Card, Modal } from 'antd';
import { Link } from 'react-router-dom'
import { StripeProvider, Elements } from 'react-stripe-elements';
import { getOrder } from './api';


export class Order extends Component {
    state = {
        orders: [],
    }

    componentDidMount() {
        getOrder(

        ).then((res) => {
            console.log(res)
            this.setState({
                orders: res.data,
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'order_id',
        }, {
        title: 'Timestamp',
        dataIndex: 'created',
        }, {
        title: 'Amount',
        dataIndex: 'order_amount',
        sorter: (a, b) => a.product.price - b.product.price,
        }, {
        title: 'Status',
        dataIndex: 'pay_status'
        }];

        return (
            <Table
                className="order-table"
                rowKey={record => record.order_id} 
                columns={columns}
                dataSource={this.state.orders}
                footer={(data) => (
                    console.log(data)
            )}
        />
        )
    }
}