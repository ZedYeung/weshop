import React, { Component } from 'react';
import { Table } from 'antd';
import { Checkout } from './Checkout';

export class OrderAddress extends Component {
    render () {
        const columns = [{
            title: 'Fullname',
            dataIndex: 'shipping_fullname',
        }, {
            title: 'Phone',
            dataIndex: 'shipping_phone',
        }, {
            title: 'Address1',
            dataIndex: 'shipping_address1',
        }, {
            title: 'Address2',
            dataIndex: 'shipping_address2',
        }, {
            title: 'City',
            dataIndex: 'shipping_city',
        }, {
            title: 'State',
            dataIndex: 'shipping_state',
        }, {
            title: 'Zipcode',
            dataIndex: 'shipping_zipcode',
        }, {
            title: 'Country',
            dataIndex: 'shipping_country',
        }];

        return (

            <Table
                title={() => 'Shipping Address'}
                className="order-address-table"
                rowKey={record => record.id} 
                columns={columns}
                dataSource={this.props.orderAddress}
                pagination={false}
            />
        )
    }
}
