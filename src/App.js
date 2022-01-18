

import React, { Component, UseContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Index from "./pages/inicio/index";
import All from "./pages/movie/all";
import Login from "./pages/login/index";
import AddMovie from "./pages/movie/add";
import IndexMovie from "./pages/movie/index";
import Dashboard from "./pages/dashboard";
import Details from "./pages/Details"
import { useSearch } from "./hooks/useSearch"
import SearchContext from "./components/Search/context"


const App = () => {


    const searchText = useSearch()
    return (
        <div className="App">
            <SearchContext.Provider value={searchText}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Index} />
                        <Route exact path='/movies' component={All} />
                        <Route path='/login' component={Login} />
                        <Route path='/movie/add' component={AddMovie} />
                        <Route path='/movie' component={IndexMovie} />
                        <Route path='/details/:type/:id' component={Details} />
                        <Route path='/dashboard' component={Dashboard} />
                        {/*<PrivateRoute perfil="1" path='/usuarios' component={IndexUser} />*/}
                    </Switch>
                </Router>
            </SearchContext.Provider>
        </div>
    );

}

export default App;
// https://youtu.be/tBweoUiMsDg?t=8054