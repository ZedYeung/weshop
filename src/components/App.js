import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import '../styles/App.css';
import {Main} from './main';
import { Product } from './Product';
import {Login} from './Login';
import {Register} from './Register';
import {TOKEN_KEY} from '../.env'


class App extends Component {
  state = {
    isLoggedIn: !! localStorage.getItem(TOKEN_KEY),
  }

  handleLogin = (res) => {
    console.log(res);
      localStorage.setItem(TOKEN_KEY, res.data.token);
      this.setState({isLoggedIn:true});
  }

  handleLogout = () =>{
      localStorage.removeItem(TOKEN_KEY);
      this.setState({isLoggedIn: false});
  }

  getLogin = (props) => {
    console.log(props);
    return this.state.isLoggedIn ? <Redirect to="/"/> : <Login {...props} handleLogin={this.handleLogin}/>;
  }

  getMain = () => {
    return <Main isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
  }

  getProduct = (props) => {
      return <Product productID={props.match.params && props.match.params.productID }/>
  }

  render() {
    return (
      <section className="App">
        <Switch>
            <Route exact path="/" render={this.getMain} />
            <Route path="/register" component={Register}/>
            <Route path="/login" render={this.getLogin}/>
            <Route path="/product/:productID" render={this.getProduct} /> 
            <Route render={this.getMain} />
        </Switch>
      </section>
    );
  }
}

export default App;
