import React, { Component } from 'react';
import { Table } from 'antd';


export class OrderDetailList extends Component {
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
        }];

        return (

            <Table
                title={() => 'Order Detail'}
                className="order-detail-table"
                rowKey={record => record.id} 
                columns={columns}
                dataSource={this.props.orderDetail}
                footer={(data) => (
                    console.log(data)
                )}
            />
        )
    }
}
