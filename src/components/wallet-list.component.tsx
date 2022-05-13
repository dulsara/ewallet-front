import {Component} from "react";
import WalletDataService from "../services/wallet.service";
import {Link} from "react-router-dom";
import IWalletData from '../types/wallet';

type Props = {};

type State = {
    wallets: Array<IWalletData>,
    currentWallet: IWalletData | null,
    currentIndex: number,
};

export default class WalletsList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveWallets = this.retrieveWallets.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveWallet = this.setActiveWallet.bind(this);

        this.state = {
            wallets: [],
            currentWallet: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveWallets();
    }

    retrieveWallets() {
        WalletDataService.getAll()
            .then((response: any) => {
                this.setState({
                    wallets: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveWallets();
        this.setState({
            currentWallet: null,
            currentIndex: -1
        });
    }

    setActiveWallet(wallet: IWalletData, index: number) {
        this.setState({
            currentWallet: wallet,
            currentIndex: index
        });
    }

    render() {
        const { wallets, currentWallet, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                </div>
                <div className="col-md-6">
                    <h4>Wallet List</h4>

                    <ul className="list-group">
                        {wallets &&
                            wallets.map((wallet: IWalletData, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveWallet(wallet, index)}
                                    key={index}
                                >
                                    {wallet.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentWallet ? (
                        <div>
                            <h4>E-Wallet</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentWallet.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Balance:</strong>
                                </label>{" "}
                                {currentWallet.balance}
                            </div>

                            <Link
                                to={"/wallets/" + currentWallet.id}
                                className="badge badge-warning"
                            >
                                Credit/Debit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Wallet for more details...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
