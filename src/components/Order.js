import React, { Component } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { getProduct } from './api';


export class Order extends Component {
    render () {
        return (
            <div>
                <h1>order</h1>
                <Card className="product-info"
                    title="lsdfaasdfdsf"
                >
                    <Row gutter={10}>
                        <Col span={5}>
                            <Statistic title="Price" value={3452} prefix="$" />
                        </Col>
                        <Col span={5}>
                            <Statistic title="Stock" value={342324} />
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}