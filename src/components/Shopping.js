import React, { Component } from 'react';
import { Form,  Button, Select, Icon, Alert } from 'antd';
import { addCart } from './api';


const FormItem = Form.Item;
const { Option } = Select;
class ShoppingForm extends Component {
    state = {
        added: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                addCart({
                    product: this.props.productID,
                    quantity: values.quantity,
                }).then((res) => {
                    this.setState({
                        added: true,
                    })
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 22,
                    offset: 0,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit} className="shopping-form">
                <FormItem
                    {...formItemLayout}
                    label="Qty"
                >
                    {getFieldDecorator('quantity', {
                        initialValue: 1
                    })(
                        <Select>
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                        </Select>    
                    )}    
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button block type="primary" htmlType="submit"><Icon type="shopping-cart" />Add to Cart</Button>
                    {this.state.added === true && (
                        <Alert message="Added to Cart" type="success" />
                    )}
                </FormItem>
            </Form>

        );
    }
}

export const Shopping = Form.create()(ShoppingForm);