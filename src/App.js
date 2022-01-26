import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/Layout/AppNavbar';
import Dashboard from './components/Layout/Dashboard';
import AddClient from './components/Clients/AddClient';
import ClientDetail from './components/Clients/ClientDetail';
import EditClient from './components/Clients/EditClient';
import Login from './components/Auth/Login';
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
                  path="/client/add"
                >
                  <AddClient />
                </Route>
                <Route
                  exact
                  path='/client/:id'
                >
                  <ClientDetail />
                </Route>
                <Route
                  exact
                  path="/client/edit/:id"
                >
                  <EditClient />
                </Route>
                <Route
                  exact
                  path="/Login"
                >
                  <Login />
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
