import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';


export class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="Weshop" />
            </header>
        );
    }
}