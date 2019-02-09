import {decorate, configure, observable, action} from 'mobx'

configure({enforceActions: "observed"});

class Store {
    API_KEY = "AIzaSyDa3twZvyiLDhDQUFu8s-dScTYzp4AnVvY";
    changeTesting = () => {
        this.test = 'yo'
    }
}

decorate(Store, {
    test: observable,
    changeTesting: action,
});

export default new Store();