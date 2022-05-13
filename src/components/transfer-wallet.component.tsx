import {ChangeEvent, Component} from "react";
import WalletDataService from "../services/wallet.service";
import IWalletData from '../types/wallet';

type Props = {};

type State = {
    wallets: Array<IWalletData>,
    wallets2: Array<IWalletData>,
    currentWallet: IWalletData,
    message: string
};

export default class TransferWallet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveWallets = this.retrieveWallets.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeFromWallet = this.onChangeFromWallet.bind(this);
        this.onChangeToWallet = this.onChangeToWallet.bind(this);
        this.transferWallet = this.transferWallet.bind(this);

        this.state = {
            wallets: [],
            wallets2: [],
            currentWallet: {
                id: 1,
                name: "",
                balance: 0,
                amount: 0,
                toId: 1
            },
            message: ""

        };
    }

    componentDidMount() {
        this.retrieveWallets();
    }

    retrieveWallets() {
        WalletDataService.getAll()
            .then((response: any) => {
                this.setState({
                    wallets: response.data,
                    wallets2: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    onChangeAmount(e: ChangeEvent<HTMLInputElement>) {
        const amount = e.target.valueAsNumber;

        this.setState((prevState) => ({
            currentWallet: {
                ...prevState.currentWallet,
                amount: amount,
            },
        }));
    }

    onChangeFromWallet(e: any) {
        const id = e.target.value;

        this.setState((prevState) => ({
            currentWallet: {
                ...prevState.currentWallet,
                id: id,
            },
        }));
    }

    onChangeToWallet(e: any) {
        const id = e.target.value;

        this.setState((prevState) => ({
            currentWallet: {
                ...prevState.currentWallet,
                toId: id,
            },
        }));
    }

    transferWallet() {
        WalletDataService.w2w(
            this.state.currentWallet.id,
            this.state.currentWallet.amount,
            this.state.currentWallet.toId,
        )
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    currentWallet: response.data,
                    message: "The Wallet to  Wallet Transfer completed successfully!",
                });
            })
            .catch((e: Error) => {
                console.log(e);
                this.setState({
                    message: "Invalid Transfer Amount"
                });
            });
    }

    render() {
        const {wallets, wallets2} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                </div>
                <div className="col-md-6">
                    <h4>Wallet Transfer</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="id">From Wallet : </label>
                            {" "}
                            <select onChange={this.onChangeFromWallet}>
                                {
                                    wallets.map((wallet: IWalletData) =>
                                        (<option key={wallet.id} value={wallet.id}>
                                            {wallet.name}
                                        </option>))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="toId">To Wallet : </label>
                            {" "}
                            <select onChange={this.onChangeToWallet}>
                                {
                                    wallets2.map((wallet: IWalletData) =>
                                        (<option key={wallet.id} value={wallet.id}>
                                            {wallet.name}
                                        </option>))

                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Transfer Amount </label>
                            <input
                                type="number"
                                className="form-control"
                                id="amount"
                                onChange={this.onChangeAmount}
                            />
                        </div>
                    </form>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.transferWallet}
                    >
                        TRANSFER
                    </button>
                    <div>
                        <p>{this.state.message}</p>
                    </div>
                </div>
            </div>
        );
    }

}


