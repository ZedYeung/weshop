import React, { Component } from 'react';
import { Form, InputNumber, Button } from 'antd';


class FilterForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.getFilter(values.min_price, values.max_price)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item
                    label="MinPrice"
                >
                {getFieldDecorator('min_price') (
                    <InputNumber min={0} max={10 ** 9} precision={2} />
                )}
                </Form.Item>

                <Form.Item
                    label="MaxPrice"
                >
                {getFieldDecorator('max_price') (
                    <InputNumber min={this.props.form.getFieldValue('min_price')} max={10 ** 9} precision={2} />
                )}
                </Form.Item>

                <Form.Item
                    wrapperCol={{ span: 12, offset: 6 }}
                >
                <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        )
    }
}

export const Filter = Form.create()(FilterForm);