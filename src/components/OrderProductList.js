import React, { Component } from 'react';
import { Table } from 'antd';


export class OrderProductList extends Component {
    render () {
        const columns = [{
            title: 'Name',
            dataIndex: 'product.name',
        }, {
            title: 'Price',
            dataIndex: 'product.price',
            sorter: (a, b) => a.product.price - b.product.price,
        }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        }, {
            title: 'Subtotal',
            render: (subtotal, record) => (
                (record.quantity * record.product.price).toFixed(2)
            ),
            sorter: (a, b) => a.quantity * a.product.price - b.quantity * b.product.price
        }];

        return (
            <Table
                title={() => 'Product List'}
                className="order-product-table"
                rowKey={record => record.id} 
                columns={columns}
                dataSource={this.props.products}
                footer={(data) => (
                    console.log(data)
            )}
        />
        )
    }
}