import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom'
import { getOrders, deleteOrder } from './api';


export class OrderList extends Component {
    state = {
        orders: [],
    }

    componentDidMount() {
        getOrders(

        ).then((res) => {
            this.setState({
                orders: res.data,
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    handleDelete = (orderID, e) => {
        deleteOrder(
            orderID
        ).then((res) => {
            this.setState({
                orders: this.state.orders.filter((order) => order.id !== orderID)
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'order_id',
            render: (order_id, record) => (
                <Link to={`/member/order/${record.id}`}>
                    {order_id}
                </Link>
            ),
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
        }, {
            title: 'Action',
            dataIndex: 'id',
            render: (id, record) => (
                <Button
                    onClick={(e) => this.handleDelete(id, e)}
                >
                    Cancel
                </Button>
            )
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