import React, { Component } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { getProduct } from './api';
import { Shopping } from './Shopping';


export class Product extends Component {
    state = {
        product: null,
    }

    componentDidMount() {
        getProduct(
            this.props.productID
        ).then((res) => {
            this.setState({
                product: res.data
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const product = this.state.product;

        return (
            <div className="product">
                {product && (
                    <Row gutter={2}>
                        <Col span={8}>
                            <Card
                                className="product-image"
                                cover={<img alt={product.name} src={product.image} /> }
                            >
                            </Card>
                        </Col>
                        <Col span={10}>
                            <Card className="product-info"
                                title={product.name}
                            >
                                <Row gutter={10}>
                                    <Col span={5}>
                                        <Statistic title="Price" value={product.price} prefix="$" />
                                    </Col>
                                    <Col span={5}>
                                        <Statistic title="Stock" value={product.stock} />
                                    </Col>
                                </Row>
                                <ul>
                                {
                                    product.description.split('\n').map((line, idx) => (
                                        <li key={idx}>{line}</li>
                                    ))
                                }
                                </ul>
                            </Card>
                        </Col> 
                        <Col span={3}>
                            <Card
                                className="product-user-operation"
                                title={`$${product.price}`}
                            >
                                <Shopping productID={product.id} />
                            </Card>
                        </Col> 
                    </Row>
                )}
            </div>
        )
    }
}