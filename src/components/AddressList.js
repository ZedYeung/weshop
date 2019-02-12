import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { getAddresses, deleteAddress, updateAddress, createAddress } from './api';
import { EditableCell, EditableFormRow, EditableContext } from './EditableTable';


export class AddressList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            editingKey: '',
            defaultAddress: null,
        }

        this.columns = [{
            title: 'Default',
            dataIndex: 'id',
            key: "default",
            editable: false,
            render: (id, record) => {
                return (
                    <Button
                        shape="circle"
                        type={this.state.defaultAddress === id ? "primary" : "default"}
                        size="small"
                        onClick={() => this.setDefault(id, record)}>
                    </Button>
                )
            }
        }, {
            title: 'Fullname',
            dataIndex: 'fullname',
            key: "fullname",
            editable: true,
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            key: "phone",
            editable: true,
        }, {
            title: 'Address1',
            dataIndex: 'address1',
            key: "address1",
            editable: true,
        }, {
            title: 'Address2',
            dataIndex: 'address2',
            key: "address2",
            editable: true,
        }, {
            title: 'City',
            dataIndex: 'city',
            key: "city",
            editable: true,
        }, {
            title: 'State',
            dataIndex: 'state',
            key: "state",
            editable: true,
        }, {
            title: 'Zipcode',
            dataIndex: 'zipcode',
            key: "zipcode",
            editable: true,
        }, {
            title: 'Country',
            dataIndex: 'country',
            key: "country",
            editable: true,
        }, {
            title: 'Action',
            dataIndex: 'id',
            key: "id",
            render: (id, record) => {
                const editable = this.isEditing(record);

                return (
                  <div>
                    {editable ? (
                      <div>
                        <EditableContext.Consumer>
                          {form => (
                            <Button onClick={() => this.saveEdit(form, id)}>
                                Save
                            </Button>
                          )}
                        </EditableContext.Consumer>
                        <Popconfirm
                          title="Sure to cancel?"
                          onConfirm={() => this.cancelEdit(id)}
                        >
                          <Button type="danger">Cancel</Button>
                        </Popconfirm>
                      </div>
                    ) : (
                        <div>
                            <Button onClick={() => this.edit(id)}>Edit</Button>
                            <Popconfirm
                                title="Sure to cancel?"
                                onConfirm={() => this.handleDelete(id)}
                            >
                                <Button type="danger">Delete</Button>
                            </Popconfirm>
                        </div>
                    )}

                  </div>
            )
                    }
        }];
    }
    componentDidMount() {
        getAddresses(

        ).then((res) => {
            this.setState({
                addresses: res.data,
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    handleDelete = (addressID) => {
        deleteAddress (
            addressID
        ).then((res) => {
            this.setState({
                addresses: this.state.addresses.filter((address) => address.id !== addressID)
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    isEditing = (record) => record.id === this.state.editingKey;

    cancelEdit = (id) => {
        if (id === 'new') {
            this.setState({
                addresses: this.state.addresses.filter((address) => address.id !== 'new')
            })
        } 
        this.setState({ editingKey: '' });
    };

    edit = (id) => {
        this.setState({ editingKey: id });
    }

    saveEdit = (form, id) => {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }

            const newAddresses = [...this.state.addresses];
            const index = newAddresses.findIndex(item => id === item.id);

            if (index > -1) {
                const item = newAddresses[index];

                if (id !== 'new') {
                    updateAddress(
                        item.id, row
                    ).then((res) => {
                        newAddresses.splice(index, 1, {
                            ...item,
                            ...row,
                        });
                        this.setState({ addresses: newAddresses, editingKey: '' });
                    }).catch((err) => {
                        console.log(err);
                    })        
                } else {
                    createAddress(
                        row
                    ).then((res) => {
                        let newAddress = res.data
                        newAddresses.splice(index, 1, {
                            ...item,
                            ...newAddress,
                        });
                        this.setState({
                            addresses: newAddresses,
                            editingKey: '' ,
                        });

                        if (this.state.defaultAddress == null) {
                            this.setState({
                                defaultAddress: res.data.id
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            } 
            // else {
            //     newAddresses.push(newAddress);
            //     this.setState({ addresses: newAddresses, editingKey: '' });
            // }
        });
    }

    handleAdd = () => {
        if (this.state.editingKey === 'new') {
            return
        }
        const { addresses } = this.state;
        const newAddress = {
          fullname: '',
          phone: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          id: 'new',
        };
        this.setState({
            addresses: [...addresses, newAddress],
        }, () => {
            this.edit('new')
        });
    }

    setDefault = (id, record) => {
        this.setState({
            defaultAddress: id
        }, () => {
            this.props.setAddress(record);
        })
    }

    render() {
        const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
          };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: record => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record),
              }),
            };
          });

        return (
            <Table
                className="address-table"
                components={components}
                size={this.props.size} 
                rowClassName="editable-row"
                rowKey={record => record.id} 
                columns={columns}
                dataSource={this.state.addresses}
                pagination={{hideOnSinglePage: true}}
                footer={(data) => (
                    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                        Add Address
                    </Button>
                )}
            />
        )
    }
}