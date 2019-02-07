import React, { Component } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { getProduct } from './api';


export class Product extends Component {
    state = {
        product: null,
    }

    componentDidMount() {
        getProduct(
            this.props.productID
        ).then((res) => {
            console.log(res);
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
                    <Row gutter={20}>
                        <Col span={8}>
                        <Card
                            className="product-image"
                            cover={<img alt={product.name} src={product.image} /> }
                        >
                        </Card>
                        </Col>
                        <Col span={12}>

                        <Card className="product-info"
                            title={product.name}
                        >
                            <Row gutter={12}>
                                <Col span={6}>
                                    <Statistic title="Price" value={product.price} prefix="$" />
                                </Col>
                                <Col span={6}>
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
                    </Row>
                )}
            </div>

            
        )
    }
}