import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <img onClick={this.props.store.changeTesting} src={logo} className="App-logo" alt="logo"/>
                <div>
                    {this.props.store.test}
                </div>
            </div>
        );
    }
}

export default inject("store")(observer(App));
