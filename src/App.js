

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./services/auth";


import Index from "./pages/inicio/index";
import Login from "./pages/login/index";
import AddMovie from "./pages/movie/add";
import IndexMovie from "./pages/movie/index";
import Dashboard from "./pages/dashboard";




const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
                ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Index} />
                        <Route path='/login' component={Login} />
                        <Route path='/movie/add' component={AddMovie} />
                        <Route path='/movie' component={IndexMovie} />
                        <Route path='/dashboard' component={Dashboard} />
                        {/*<PrivateRoute perfil="1" path='/usuarios' component={IndexUser} />*/}
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
// https://youtu.be/tBweoUiMsDg?t=8054