import {Component, ChangeEvent} from "react";
import {RouteComponentProps} from 'react-router-dom';

import WalletDataService from "../services/wallet.service";
import IWalletData from "../types/wallet";

interface RouterProps { // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentWallet: IWalletData;
    message: string;
}

export default class Wallet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.getWallet = this.getWallet.bind(this);
        this.creditWallet = this.creditWallet.bind(this);
        this.debitWallet = this.debitWallet.bind(this);

        this.state = {
            currentWallet: {
                id: null,
                name: "",
                balance: 0,
                amount: 0,
                toId: 0
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getWallet(this.props.match.params.id);
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

    getWallet(id: string) {
        WalletDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentWallet: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    creditWallet() {
        WalletDataService.credit(
            this.state.currentWallet.id,
            this.state.currentWallet.amount
        )
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    currentWallet: response.data,
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    debitWallet() {
        WalletDataService.debit(this.state.currentWallet.id, this.state.currentWallet.amount)
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    currentWallet: response.data,
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
        const {currentWallet} = this.state;

        return (
            <div>
                {currentWallet ? (
                    <div className="edit-form">
                        <h4>Wallet Operations</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name : </label>
                                {" "}
                                {currentWallet.name}
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance">Balance : </label>
                                {" "}
                                {currentWallet.balance}
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Transfer Amount </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    value={currentWallet.amount}
                                    onChange={this.onChangeAmount}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-success"
                            onClick={this.debitWallet}
                        >
                            DEBIT
                        </button>
                        {" "}
                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.creditWallet}
                        >
                            CREDIT
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Wallet...</p>
                    </div>
                )}
            </div>
        );
    }
}
