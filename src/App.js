import './App.css';
import {Switch, Route} from 'react-router-dom';
import React, { Component } from 'react';
import Home from './views/Home';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route exact path = "/" render={()=><Home/>}/>
        </Switch>
      </div>
    )
  }
}