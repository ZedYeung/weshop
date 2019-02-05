import React, { Component } from 'react';
import { Radio, Icon } from 'antd';


export class Ordering extends Component {
    onOrderingChange = (e) => {
        this.props.getOrdering(e.target.value);
    }
    
    render() {
        return (
            <Radio.Group className="ordering-radio" buttonStyle="outline" onChange={this.onOrderingChange}>
                <p className="ordering-radio">Price</p>
                {/* <Radio.Button value="Price" disabled={true}>Price</Radio.Button> */}
                <Radio.Button value="price"><Icon type="caret-up" /> </Radio.Button>
                <Radio.Button value="-price"><Icon type="caret-down" /></Radio.Button>
                {/* <Radio.Button value="Created" disabled={true}>Created</Radio.Button> */}
                <p className="ordering-radio">Newest</p>
                <Radio.Button value="created"> <Icon type="caret-up" /></Radio.Button>
                <Radio.Button value="-created"> <Icon type="caret-down" /></Radio.Button>
            </Radio.Group>
        )
    }
}