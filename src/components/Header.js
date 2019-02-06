import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.svg';
import { Icon } from 'antd';


export class Header extends Component{
    static propTypes = {
        isLoggedIn : PropTypes.bool.isRequired,
        handleLogout: PropTypes.func.isRequired,
    }

    render(){
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Weshop</h1>
                {
                    this.props.isLoggedIn ? (
                        <a href=""
                            className="auth"
                            onClick={this.props.handleLogout}>
                            <Icon type="logout"/>{' '}logout
                        </a>
                    ) : (
                        <div className="auth">
                            <Link to="/login"><Icon type="login"/>{' '}login</Link>
                            {' '}| <Link to="/register">register</Link>
                        </div>
                    )
                }
            </header>
        )
    }
}