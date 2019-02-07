import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Radio, Select, Alert } from 'antd';
import { getUserProfile, updateUserProfile } from './api';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
class UserProfileForm extends Component {
    state = {
        user: null,
    }

    componentDidMount() {
        getUserProfile(

        ).then((res) => {
            console.log(res);
            this.setState({
                user: res.data,
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                updateUserProfile({
                    first_name: values.first_name,
                    last_name: values.last_name,
                    birthday: values.birthday.format('YYYY-MM-DD'),
                    gender: values.gender,
                    mobile: values.mobile,
                    email: values.email,
                }).then((res) => {
                    // message.success(response);
                    alert("Updated");
                    this.props.history.push('/');
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
                    span: 14,
                    offset: 6,
                },
            },
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
        <Select style={{ width: 70 }}>
            <Option value="1">+1</Option>
            <Option value="86">+86</Option>
        </Select>
        );
        
        const user = this.state.user;
        user && console.log(moment(user.birthday).format('YYYY-MM-DD'))

        return (
            <div className="home">
                {user && (
                <Form onSubmit={this.handleSubmit} className="userProfile-form">
                    <FormItem
                        {...formItemLayout}
                        label="first_name"
                        hasFeedback
                    >
                        {getFieldDecorator('first_name', {
                            initialValue: user.first_name, 
                            rules: [{ message: 'Please input your first_name!', whitespace: true}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="last_name"
                        hasFeedback
                    >
                        {getFieldDecorator('last_name', {
                            initialValue: user.last_name, 
                            rules: [{ message: 'Please input your last_name!', whitespace: true}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <Form.Item
                        {...formItemLayout}
                        label="Birthday"
                    >
                        {getFieldDecorator('birthday', {
                            initialValue: moment(user.birthday), 
                            rules: [{ type: 'object', message: 'Please input your birthday!'}],
                        })(
                            <DatePicker />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Gender"
                    >
                        {getFieldDecorator('gender', {
                            initialValue: user.gender, 
                            rules: [{ message: 'Please input your gender!'}],
                        })(
                            <Radio.Group  size="small" >
                                <Radio value="O"> other </Radio>
                                <Radio value="M"> male </Radio>
                                <Radio value="F"> female </Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Mobile"
                    >
                    {getFieldDecorator('mobile', {
                        initialValue: user.mobile, 
                        rules: [{ message: 'Please input your phone number!' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            initialValue: user.email,
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </FormItem>
                </Form>
                )}
            </div>
        );
    }
}

export const Home = Form.create()(UserProfileForm);