import React, { Component } from 'react';
import {Header} from './Header';
import {Navbar} from './Navbar';
import {Product} from './Product';
import {Footer} from './Footer';
import {TOKEN_KEY} from '../.env'


export class Main extends Component {
    state = {
        isLoggedIn: !! localStorage.getItem(TOKEN_KEY),
    }

    handleLogin = (response) => {
        localStorage.setItem(TOKEN_KEY, response);
        this.setState({isLoggedIn:true});

    }

    handleLogout = () =>{
        localStorage.removeItem(TOKEN_KEY);
        this.setState({isLoggedIn: false});
    }

    render() {
        return (
            <div className="main">
                <Header isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} handleLogout={this.handleLogout} />
                <Navbar/>
                <Product/>
                <Footer/>
            </div>
        )
    }
}