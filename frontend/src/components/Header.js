import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.svg';
import { Icon, Button } from 'antd';


export class Header extends Component{
    static propTypes = {
        isLoggedIn : PropTypes.bool.isRequired,
        handleLogout: PropTypes.func.isRequired,
    }

    render(){
        return (
            <header className="App-header">
                <Link to="/">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Weshop</h1>
                </Link>
                {
                    this.props.isLoggedIn ? (
                        <div className="auth">
                            <Link to="/cart">
                                <Button
                                    className="auth-button"
                                    ghost
                                >
                                    <Icon type="shopping-cart" />Cart
                                </Button>
                            </Link>
                            <Link to="/member">
                                <Button
                                    className="auth-button"
                                    ghost
                                >
                                    <Icon type="user" />Account
                                </Button>
                            </Link>
                            <Link to="/">
                                <Button 
                                    className="auth-button"
                                    onClick={this.props.handleLogout}
                                    ghost
                                >
                                    <Icon type="logout"/>logout
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="auth">
                            <Link to="/login">
                                <Button
                                    className="auth-button"
                                    ghost
                                >
                                    <Icon type="login"/>login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button
                                    className="auth-button"
                                    ghost
                                >
                                    register
                                </Button>
                            </Link>
                        </div>
                    )
                }
            </header>
        )
    }
}