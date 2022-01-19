import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/Layout/AppNavbar';
import Dashboard from './components/Layout/Dashboard';
import AddClient from './components/Clients/AddClient';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route exact
                  path="/"
                >
                  <Dashboard />
                </Route>
                <Route
                  exact
                  path="/clients/add"
                >
                  <AddClient />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
