import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import '../styles/App.css';
import {Main} from './main';
import {Login} from './Login';


class App extends Component {
  getLogin = () => {
    return this.props.isLoggedIn ? <Redirect to="/"/> : <Login handleLogin = {this.props.handleLogin}/>;
  }

  render() {
    return (
      <section className="App">
        <Switch>
            <Route exact path="/" component={Main} />
            {/* <Route path="/register" component={Register}/> */}
            <Route path="/login" component={Login}/>
            <Route component={Main} />
        </Switch>
      </section>
    );
  }
}

export default App;
