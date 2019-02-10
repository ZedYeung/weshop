import React, { Component } from 'react';
import { Table, InputNumber,  Button, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom'
import { getCart, deleteCart, updateCart } from './api';
import { Checkout } from './Checkout';

export class Cart extends Component {
    state = {
        cart: [],
    }

    componentDidMount() {
        getCart(

        ).then((res) => {
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

    onQuantityChange = (quantity, productID) => {
        updateCart(productID, {
            quantity: quantity
        }).then((res) => {
            this.setState({
                cart: this.state.cart.map((item) => {
                    if (item.product.id === productID) {
                        item.quantity = quantity;
                    } 
                    return item;
                })
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    getSubtotal = () => {
        return this.state.cart.reduce((acc, item) => (
            acc + item.quantity * item.product.price
        ), 0)
    }

    render() {
        const columns = [{
            title: 'Image',
            dataIndex: 'product.image',
            width: '100',
            render: (image, record) => (
                <img src={image} width="100" alt={record.product.name}/>
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
            render: (quantity, record) => (
                <InputNumber
                    min={1} max={record.product.stock}
                    defaultValue={quantity}
                    onChange={(key) => this.onQuantityChange(key, record.product.id)} 
                />
            ),
            sorter: (a, b) => a.quantity - b.quantity,
        }, {
            title: 'Action',
            dataIndex: 'product.id',
            render: (id, record) => (
                <span>
                    <Button onClick={(e) => this.handleDelete(id, e)} >Delete</Button>
                </span>
            )
        }];

        return (
            <Row gutter={6} className="cart">
                <Col span={20}>
                    <Table
                        className="cart-table"
                        rowKey={record => record.product.id} 
                        columns={columns}
                        dataSource={this.state.cart}
                        footer={(data) => (
                            console.log(data)
                        )}
                    />
                </Col>
                <Col span={3}>
                    <Card className="checkout-form-card"
                        title={`$${this.getSubtotal()}`}
                    >
                        <Checkout amount={this.getSubtotal()} />
                        
                        <Link to="/">
                            <Button className="checkout-form-botton" block>Keep Shopping</Button>
                        </Link>
                    </Card>
                </Col>
            </Row>
        )
    }
}