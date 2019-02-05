import React, { Component } from 'react';
import { List, Card } from 'antd';
import { Ordering } from './Ordering';
import {getProducts} from './api';

const { Meta } = Card;

export class Product extends Component {
    state = {
        curPage : 1,
        ordering: '',
        min_price: '',
        max_price: '',
        data: [],
    }

    componentDidMount () {
        this.getData();
    }

    getOrdering = (ordering) => {
        this.setState({
            ordering: ordering
        }, () => {
            this.getData();
        })
    }

    getData =() => {
        getProducts({
            page: this.state.curPage,
            ordering: this.state.ordering,
            min_price: this.state.min_price,
            max_price: this.state.max_price
        }).then((res) => {
            console.log(res.data);
            this.setState({
                data: res.data.results,
                productCount: res.data.count
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="products-main">
                <Ordering className="product-ordering" getOrdering={this.getOrdering}/>
                <List className="product-list"
                    grid={{ gutter: 16, column: 4 }}
                    // grid={{gutter: 0, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,}}
                    dataSource={this.state.data}
                    pagination={{
                        defaultPageSize: 8,
                        total: this.state.productCount,
                        onChange: (page) => {
                            console.log(page)
                            this.setState({    
                                curPage: page
                            }, () => {
                                this.getData();
                            })
                        },
                    }}

                    renderItem={item => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={<img alt={item.name} src={item.image} />}
                        >
                            <Meta
                                title={item.name}
                            />
                            <div className="extra-product-info">
                                <p className="price">${item.price}</p>
                            </div>
                        </Card>
                    </List.Item>
                    )}
                />
            </div>
        );
    }
}