import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import '../styles/App.css';
import { Header } from './Header';
import { ProductList } from './ProductList';
import { Product } from './Product';
import { Cart } from './Cart';
import { Login } from './Login';
import { Register } from './Register';
import { Member } from './Member';
import { Thankyou } from './Thankyou';
import { Footer } from './Footer';
import { TOKEN_KEY } from '../.env'


class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  state = {
    isLoggedIn: !! this.props.cookies.get(TOKEN_KEY),
  }

  handleLogin = (res) => {
    console.log(this.props.cookies)
    this.props.cookies.set(TOKEN_KEY, res.data.token, { path: '/', maxAge: 3600 * 24 });
    // this.props.cookies.set(TOKEN_KEY, res.data.token, { path: '/', httpOnly: true, maxAge: 3600 * 24 });
    this.setState({isLoggedIn:true});
  }

  handleLogout = () =>{
    this.props.cookies.remove(TOKEN_KEY);
      this.setState({isLoggedIn: false});
  }

  getLogin = (props) => {
    return this.state.isLoggedIn ? <Redirect to="/"/> : <Login {...props} handleLogin={this.handleLogin}/>;
  }

  getProduct = (props) => {
      return <Product productID={props.match.params && props.match.params.productID }/>
  }

  render() {
    return (

        <section className="App">
          <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
          <Switch>
              {/* <Route exact path="/" render={this.getMain} /> */}
              <Route exact path="/" component={ProductList} />
              <Route path="/register" render={(props) => <Register {...props} handleLogin={this.handleLogin} /> } />
              <Route path="/login" render={this.getLogin}/>
              <Route path="/member" component={Member} /> 
              <Route path="/cart" render={(props) => <Cart style={{marginLeft: '5%', marginTop: '40px', marginRight: '5%'}}/>} /> />
              <Route path="/thankyou" component={Thankyou} />
              <Route path="/product/:productID" render={this.getProduct} /> 
              <Route component={ProductList} />
          </Switch>
          <Footer/>
        </section>
    );
  }
}

export default withCookies(App);
