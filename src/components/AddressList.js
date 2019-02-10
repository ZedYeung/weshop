import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom'
import { getAddresses } from './api';


export class AddressList extends Component {
    state = {
        addresses: [],
    }

    componentDidMount() {
        getAddresses(

        ).then((res) => {
            console.log(res)
            this.setState({
                addresses: res.data,
            })
        }).catch((err) => {
            console.log(err);
        })
    }



    render() {
        const columns = [{
            title: 'Address1',
            dataIndex: 'address1'
        }, {
            title: 'Address2',
            dataIndex: 'address2',
        }, {
            title: 'City',
            dataIndex: 'city'
        }, {
            title: 'State',
            dataIndex: 'state'
        }, {
            title: 'Zipcode',
            dataIndex: 'zipcode'
        }, {
            title: 'Country',
            dataIndex: 'country'
        }, {
            title: 'Action',
            dataIndex: 'id',
            render: (id, record) => (
                <Button>
                    Delete
                </Button>
            )
        }];

        return (
            <Table
                className="address-table"
                rowKey={record => record.id} 
                columns={columns}
                dataSource={this.state.addresses}
                footer={(data) => (
                    console.log(data)
            )}
        />
        )
    }
}