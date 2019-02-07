import React, { Component } from 'react';
import {Header} from './Header';
import {Navbar} from './Navbar';
import { ProductList } from './ProductList';
import {Footer} from './Footer';


export class Main extends Component {
    render() {
        return (
            <div className="main">
                <Header isLoggedIn={this.props.isLoggedIn} handleLogout={this.props.handleLogout} />
                <Navbar/>
                <ProductList />
                <Footer/>
            </div>
        )
    }
}