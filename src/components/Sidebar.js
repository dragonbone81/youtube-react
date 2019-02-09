import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

class Sidebar extends Component {
    render() {
        return (
            <div className="col sidebar">
                <ul className="list-group">
                    <li className="sidebar-item list-group-item border-0">Home</li>
                    <li className="sidebar-item list-group-item border-0">Trending</li>
                    <li className="sidebar-item list-group-item border-0">Random</li>
                </ul>
            </div>
        );
    }
}

export default inject("store")(observer(Sidebar));
