import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { Menu, Layout } from 'antd';
import { UserProfile } from './UserProfile';
import { Cart } from './Cart';
import { Order } from './Order';
import { OrderList } from './OrderList';
import { AddressList } from './AddressList';


const { Sider, Content } = Layout

export class Member extends Component {
  state = {
    current: 'profile',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  getOrder = (props) => {
    return <Order orderID={props.match.params && props.match.params.orderID }/>
  }

  render() {
    return (
        <section>
             <Layout style={{ minHeight: '100vh' }}>
                <Sider>
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="vertical"
                        theme="dark"
                    >
                        <Menu.Item key="profile">
                            <Link to="/member/profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="address">
                            <Link to="/member/address">Address</Link>
                        </Menu.Item>
                        <Menu.Item key="cart" >
                            <Link to="/member/cart">Cart</Link>
                        </Menu.Item>
                        <Menu.Item key="order">
                            <Link to="/member/order">Order</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content>
                        <Switch>
                            <Route exact path="/member" component={UserProfile} />
                            <Route exact path="/member/profile" component={UserProfile} />
                            <Route path="/member/cart" component={Cart} />
                            <Route path="/member/address" render={(props) => <AddressList size="middle" />} />
                            <Route exact path="/member/order" component={OrderList} />
                            <Route path="/member/order/:orderID" render={this.getOrder} /> 
                            <Route component={UserProfile} />
                        </Switch>
                    </Content>
                </Layout>
             </Layout>


        </section>
    );
  }
}
