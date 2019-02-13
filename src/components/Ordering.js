import React, { Component } from 'react';
import { Radio, Icon } from 'antd';


export class Ordering extends Component {
    onOrderingChange = (e) => {
        this.props.getOrdering(e.target.value);
    }
    
    render() {
        return (
            <div className="product-ordering">
                <Radio.Group buttonStyle="outline" onChange={this.onOrderingChange} size="small" >
                    Price{' '}
                    <Radio.Button value="price"><Icon type="caret-up" />  </Radio.Button>
                    <Radio.Button value="-price"><Icon type="caret-down" /></Radio.Button>

                    {' '}Newest{' '}
                    <Radio.Button value="created"> <Icon type="caret-up" /></Radio.Button>
                    <Radio.Button value="-created"> <Icon type="caret-down" /></Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}