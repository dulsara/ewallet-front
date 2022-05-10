import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddWallet from "./components/add-wallet.component";
import Wallet from "./components/wallet.component";
import WalletsList from "./components/wallet-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/wallets"} className="navbar-brand">
            E-WALLET
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/wallets"} className="nav-link">
                Wallets
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add-Wallet
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/wallets"]} component={WalletsList} />
            <Route exact path="/add" component={AddWallet} />
            <Route path="/wallets/:id" component={Wallet} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
