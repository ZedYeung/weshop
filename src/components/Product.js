import React, { Component } from 'react';
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
        return (
            <div>
                {this.state.product && <img alt={this.state.product.name} src={this.state.product.image} /> }
            </div> 
        )
    }
}