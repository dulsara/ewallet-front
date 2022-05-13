import {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddWallet from "./components/add-wallet.component";
import Wallet from "./components/wallet.component";
import WalletsList from "./components/wallet-list.component";
import TransferWallet from "./components/transfer-wallet.component";
import Login from "./components/login.component";
import AuthService from "./services/auth.service";

type Props = {};
type State = {
    showBoard: boolean
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showBoard: false,
        };
    }

    componentDidMount() {
        const userToken = AuthService.getCurrentUserToken();
        if (userToken) {
            this.setState({
                showBoard: true,

            });
        }
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showBoard: false,
        });
    }

    render() {
        const {showBoard} = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    {showBoard && (<Link to={"/wallets"} className="navbar-brand">
                            E-WALLET
                        </Link>
                    )}
                    <div className="navbar-nav mr-auto">
                        {showBoard && (<li className="nav-item">
                                <Link to={"/wallets"} className="nav-link">
                                    Wallets
                                </Link>
                            </li>
                        )}
                        {showBoard && (<li className="nav-item">
                                <Link to={"/add"} className="nav-link">
                                    Add-Wallet
                                </Link>
                            </li>
                        )}
                        {showBoard && (<li className="nav-item">
                                <Link to={"/transfer"} className="nav-link">
                                    Transfer-Wallet
                                </Link>
                            </li>
                        )}
                        {showBoard && (<li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        )}
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/wallets" component={WalletsList}/>
                        <Route exact path="/add" component={AddWallet}/>
                        <Route path="/wallets/:id" component={Wallet}/>
                        <Route exact path="/transfer" component={TransferWallet}/>
                        <Route exact path={["/", "/login"]} component={Login}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
