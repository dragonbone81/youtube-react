import {decorate, configure, observable, action} from 'mobx'

configure({enforceActions: "observed"});

class Store {
    test = 'testing';
    changeTesting = () => {
        this.test = 'yo'
    }
}

decorate(Store, {
    test: observable,
    changeTesting: action,
});

export default new Store();