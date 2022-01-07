import React, {Fragment} from 'react';
import {BrowserRouter as Router , Route, Switch, Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

//Redux
import { Provider } from 'react-redux';//in order to connect redux with react
import store from './store';

import './App.css';


const App =() => {
  return (
    <Provider store={store}>
      <Router>
        < Fragment>
            <Navbar/>
            <Route exact  path='/' component={ Landing} />
            <section>
              <Switch>
                <Route exact path='/register' component={ Register }/>
                <Route exact path='/login' component={ Login }/>
              </Switch>
            </section>
          </Fragment>
      </Router>
    </Provider>
    
  );
}

export default App;