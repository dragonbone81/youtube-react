import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <div className="col sidebar">
                <ul className="list-group list-group-flush">
                    <li onClick={() => this.props.history.push("/")}
                        className="sidebar-item list-group-item border-0 d-flex align-items-center flex-row">
                        <i className="fas fa-home"/>
                        <span className="sidebar-icon-text">Home</span>
                    </li>
                    <li onClick={() => this.props.history.push("/trending")}
                        className="sidebar-item list-group-item border-0 d-flex align-items-center flex-row">
                        <i className="fas fa-fire"/>
                        <span className="sidebar-icon-text">Trending</span>
                    </li>
                    <li className="sidebar-item list-group-item border-0 d-flex align-items-center flex-row">
                        <i className="fas fa-random"/>
                        <span className="sidebar-icon-text">Random</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(inject("store")(observer(Sidebar)));
