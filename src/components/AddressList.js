import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { getAddresses, deleteAddress, updateAddress } from './api';
import { EditableCell, EditableFormRow, EditableContext } from './EditableTable';


export class AddressList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            editingKey: '',
        }

        this.columns = [{
            title: 'Fullname',
            dataIndex: 'fullname',
            editable: true,
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            editable: true,
        }, {
            title: 'Address1',
            dataIndex: 'address1',
            editable: true,
        }, {
            title: 'Address2',
            dataIndex: 'address2',
            editable: true,
        }, {
            title: 'City',
            dataIndex: 'city',
            editable: true,
        }, {
            title: 'State',
            dataIndex: 'state',
            editable: true,
        }, {
            title: 'Zipcode',
            dataIndex: 'zipcode',
            editable: true,
        }, {
            title: 'Country',
            dataIndex: 'country',
            editable: true,
        }, {
            title: 'Action',
            dataIndex: 'id',
            render: (id, record) => {
                const editable = this.isEditing(record);
                return (
                  <div>
                    {editable ? (
                      <div>
                        <EditableContext.Consumer>
                          {form => (
                            <Button onClick={() => this.saveEdit(form, record.key)}>
                                Save
                            </Button>
                          )}
                        </EditableContext.Consumer>
                        <Popconfirm
                          title="Sure to cancel?"
                          onConfirm={() => this.cancelEdit(record.key)}
                        >
                          <Button>Cancel</Button>
                        </Popconfirm>
                      </div>
                    ) : (
                        <div>
                            <Button onClick={() => this.edit(record.key)}>Edit</Button>
                            <Button onClick={(e) => this.handleDelete(id, e)} >Delete</Button>
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
            console.log(res)
            this.setState({
                addresses: res.data,
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    handleDelete = (addressID, e) => {
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

    isEditing = (record) => record.key === this.state.editingKey;

    cancelEdit = () => {
        this.setState({ editingKey: '' });
    };

    edit = (key) => {
        this.setState({ editingKey: key });
    }

    saveEdit = (form, key) => {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }

            const newAddresses = [...this.state.addresses];
            const index = newAddresses.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newAddresses[index];
                newAddresses.splice(index, 1, {
                    ...item,
                    ...row,
                });

                updateAddress(
                    item.id, row
                ).then((res) => {
                    this.setState({ addresses: newAddresses, editingKey: '' });
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                newAddresses.push(row);
                this.setState({ addresses: newAddresses, editingKey: '' });
            }
        });
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
                rowClassName="editable-row"
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