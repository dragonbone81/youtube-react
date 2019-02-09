import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Switch, Route} from 'react-router-dom';
import Home from './routes/Home';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App container-fluid d-flex h-100 flex-column">
                <TopBar/>
                <div className="row h-100">
                    <Sidebar/>
                    <div className="col main-content">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/trending" component={() => null}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default inject("store")(observer(App));
