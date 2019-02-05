import React, { Component } from 'react';
import '../styles/App.css';
import {Header} from './Header';
import {Navbar} from './Navbar';
import {Product} from './Product';
import {Footer} from './Footer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Navbar/>
        <Product/>
        <Footer/>
      </div>
    );
  }
}

export default App;
