import React, { Component } from 'react';
import { Form,  Button, Select, Icon, } from 'antd';
import { getUserProfile, updateUserProfile } from './api';


const FormItem = Form.Item;
const { Option } = Select;
class ShoppingForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
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
                    span: 14,
                    offset: 6,
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
                    <Button type="primary" htmlType="submit"><Icon type="shopping-cart" />Add to Cart</Button>
                </FormItem>
            </Form>
        );
    }
}

export const Shopping = Form.create()(ShoppingForm);