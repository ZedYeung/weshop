import React, { Component } from 'react';
import { Card } from 'antd';

export class Thankyou extends Component {
    render() {
        return (
            <Card className="thankyou" title="Thanks for your order" bordered={false} >
                <p>This is just a demo website</p>
                <p>You would not be charged and would not receive any package</p>
                <p>You would not be charged and would not receive any package</p>
                <p>You would not be charged and would not receive any package</p>
                <p>Best</p>
          </Card>
        )
    }
}