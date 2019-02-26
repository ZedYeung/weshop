import React, { Component } from 'react';
import { Tabs } from 'antd';
import { getCategories } from './api';

const TabPane = Tabs.TabPane;

export class Category extends Component {
    state = {
        categories: null,
        // isLoaded: false,
    }

    onCategoryChange = (key) => {
        this.props.getCategory(key);
    }

    componentDidMount () {
        getCategories(

        ).then((res) => {
          console.log(res)
            this.setState({
                categories: res.data,
                // isLoaded: true,
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <Tabs className="category-tabs" defaultActiveKey="" onChange={this.onCategoryChange}>
                {/* {
                    this.state.isLoaded && this.state.categories.map((category) => (
                        <TabPane tab={category.name} key={category.id}>{category.name}</TabPane>
                    ))
                } */}
                <TabPane tab="All" key=""></TabPane>
                {
                    this.state.categories && this.state.categories.map((category) => (
                        <TabPane tab={category.name} key={category.id}></TabPane>
                    ))
                }
            </Tabs>
        )
    }
}