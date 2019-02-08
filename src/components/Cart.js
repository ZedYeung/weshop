import React, { Component } from 'react';
import { Table } from 'antd';
import { getCart, deleteCart } from './api';

export class Cart extends Component {
    state = {
        cart: [],
    }

    componentDidMount() {
        getCart(

        ).then((res) => {
            console.log(res)
            this.setState({
                cart: res.data,
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    handleDelete = (productID, e) => {
        deleteCart(
            productID
        ).then((res) => {
            this.setState({
                cart: this.state.cart.filter((item) => item.product.id !== productID)
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const columns = [{
            title: 'Image',
            dataIndex: 'product.image',
            width: '100',
            render: (image) => (
                <img src={image} width="100"/>
            )
          }, {
            title: 'Name',
            dataIndex: 'product.name',
          }, {
            title: 'Price',
            dataIndex: 'product.price',
            sorter: (a, b) => a.product.price - b.product.price,
          }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
          }, {
            title: 'Action',
            dataIndex: 'product.id',
            render: (id, record) => (
                <span>
                    <a href="#" onClick={(e) => this.handleDelete(id, e)}>Delete</a>
                </span>
            )
          }];

        return (
            <Table className="cart" columns={columns} dataSource={this.state.cart} />
        )
    }
}