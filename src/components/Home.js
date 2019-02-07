import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Radio, Select } from 'antd';
import { getUserProfile } from './api';

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
        // this.props.form.validateFieldsAndScroll((err, values) => {
        //     if (!err) {
        //         // console.log('Received values of form: ', values);
        //         updateUserProfile(

        //         ).then((res) => {
        //             // message.success(response);

        //             this.props.history.push('/');
        //         }).catch((error) => {
        //             console.log(error);
        //         });
        //     }
        // });
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

        return (
            <div className="home">
                {user && (
                <Form onSubmit={this.handleSubmit} className="userProfile-form">
                    <FormItem
                        {...formItemLayout}
                        label="Firstname"
                        hasFeedback
                    >
                        {getFieldDecorator('firstname', {
                            initialValue: user.firstname, 
                            rules: [{ message: 'Please input your firstname!', whitespace: true}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Lastname"
                        hasFeedback
                    >
                        {getFieldDecorator('lastname', {
                            initialValue: user.lastname, 
                            rules: [{ message: 'Please input your lastname!', whitespace: true}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <Form.Item
                        {...formItemLayout}
                        label="Birthday"
                    >
                        {getFieldDecorator('birthday', {
                            initialValue: user.birthday, 
                            rules: [{ message: 'Please input your birthday!'}],
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
                                <Radio value="other"> other </Radio>
                                <Radio value="male"> male </Radio>
                                <Radio value="female"> female </Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Mobile"
                    >
                    {getFieldDecorator('mobile', {
                        initialValue: user.mobile, 
                        rules: [{ required: true, message: 'Please input your phone number!' }],
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
                                required: true, message: 'Please input your E-mail!',
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