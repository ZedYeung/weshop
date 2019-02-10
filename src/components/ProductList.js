import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { List, Card, Input } from 'antd';
import { Category } from './Category';
import { Ordering } from './Ordering';
import { Filter } from './Filter';
import { getProducts } from './api';


const { Meta } = Card;
const Search = Input.Search;

export class ProductList extends Component {
    state = {
        curPage : 1,
        search: '',
        category: '',
        ordering: '',
        min_price: '',
        max_price: '',
        data: [],
    }

    componentDidMount () {
        this.getData();
    }

    getCategory = (category) => {
        this.setState({
            category: category
        }, () => {
            this.getData();
        })
    }

    getOrdering = (ordering) => {
        this.setState({
            ordering: ordering
        }, () => {
            this.getData();
        })
    }

    getFilter = (min_price, max_price) => {
        this.setState({
            min_price: min_price,
            max_price: max_price
        }, () => {
            this.getData();
        })
    }

    getData =() => {
        getProducts({
            page: this.state.curPage,
            search: this.state.search,
            category: this.state.category,
            ordering: this.state.ordering,
            min_price: this.state.min_price,
            max_price: this.state.max_price
        }).then((res) => {
            this.setState({
                data: res.data.results,
                productCount: res.data.count
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    handleSearch = (value) => {
        this.setState({
            search: value
        }, () => {
            this.getData();
        })
    }

    render() {
        return (
            <div className="products-main">  
                <section className="filter">
                    <Search
                        className="product-search"
                        placeholder="input search text"
                        onSearch={this.handleSearch}
                        enterButton
                    />          
                    <Category getCategory={this.getCategory} />
                    <Filter getFilter={this.getFilter} />
                    <Ordering  getOrdering={this.getOrdering} />
                </section>

                <List className="product-list"
                    grid={{ gutter: 16, column: 4 }}
                    // grid={{gutter: 0, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,}}
                    dataSource={this.state.data}
                    pagination={{
                        defaultPageSize: 8,
                        total: this.state.productCount,
                        onChange: (page) => {
                            this.setState({    
                                curPage: page
                            }, () => {
                                this.getData();
                            })
                        },
                    }}

                    renderItem={item => (
                    <List.Item>
                        <Link to={`/product/${item.id}`}>
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
                        </Link>
                    </List.Item>
                    )}
                />
            </div>
        );
    }
}