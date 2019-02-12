import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Table, Button, Popconfirm } from 'antd';
import { Checkout } from './Checkout';
import { deleteOrder } from './api';

export class OrderDetail extends Component {
    state = {
        deleted: false
    }
    handleDelete = (orderID) => {
        deleteOrder(
            orderID
        ).then((res) => {
            this.setState({
                deleted: true
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render () {
        const columns = [{
            title: 'ID',
            dataIndex: 'order_id',
        }, {
            title: 'Timestamp',
            dataIndex: 'created',
        }, {
            title: 'Amount',
            dataIndex: 'order_amount',
            sorter: (a, b) => a.order_amount - b.order_amount,
        }, {
            title: 'Status',
            dataIndex: 'pay_status',
            render: (pay_status, record) => (
                <div>
                    {pay_status}
                    {pay_status !== 'succeeded' && <Checkout amount={record.order_amount} orderID={record.order_id} />}
                </div>
            ),
        }, {
            title: 'Action',
            dataIndex: 'id',
            render: (id) => (
                <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.handleDelete(id)}
                >
                    <Button type="danger">Cancel</Button>
                </Popconfirm>
            )
        }];

        return (
            <div>
                {this.state.deleted == false ? (
                    <Table
                        title={() => 'Order Info'}
                        className="order-detail-table"
                        rowKey={record => record.id} 
                        columns={columns}
                        dataSource={this.props.orderDetail}
                        pagination={false}
                    />
                ) : <Redirect to="/member/order"/>}
            </div>
        )
    }
}
