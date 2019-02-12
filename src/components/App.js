import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
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
  state = {
    isLoggedIn: !! localStorage.getItem(TOKEN_KEY),
  }

  handleLogin = (res) => {
      localStorage.setItem(TOKEN_KEY, res.data.token);
      this.setState({isLoggedIn:true});
  }

  handleLogout = () =>{
      localStorage.removeItem(TOKEN_KEY);
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
              <Route path="/register" component={Register}/>
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

export default App;
