import React, { Component } from 'react';
import { List, Card } from 'antd';
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
            <List className="product-list"
                grid={{ gutter: 16, column: 4 }}
                // grid={{gutter: 0, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,}}
                dataSource={this.state.data}
                renderItem={item => (
                <List.Item>
                    <Card
                        hoverable
                        // style={{ width: 200 }}
                        // cover={<img alt={item.name} src={item.image} width="200" height="200" />}
                        cover={<img alt={item.name} src={item.image} />}
                    >
                        <Meta
                        title={item.name}
                        />
                    </Card>
                </List.Item>
                )}
            />
        );
    }
}