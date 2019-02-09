import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import youtubeLogo from '../youtube-logo.svg';

class Sidebar extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <div><img className="youtube-logo" src={youtubeLogo}/></div>
                        <div><h3 className="my-auto">Youtube</h3></div>
                    </div>
                </div>
                <div className="col-6 d-flex align-items-center"><input className="form-control"/></div>
                <div className="col d-flex align-items-center text-center">Extra stuff</div>
            </div>

        );
    }
}

export default inject("store")(observer(Sidebar));
