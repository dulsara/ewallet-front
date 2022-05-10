import { Component, ChangeEvent } from "react";
import WalletDataService from "../services/wallet.service";
import IWalletData from '../types/wallet';

type Props = {};

type State = IWalletData & {
  submitted: boolean
};

export default class AddWallet extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBalance = this.onChangeBalance.bind(this);
    this.saveWallet = this.saveWallet.bind(this);
    this.newWallet = this.newWallet.bind(this);

    this.state = {
      id: null,
      name: "",
      balance:0,
      amount:0,
      toId:0,
      submitted: false
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeBalance(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      balance: e.target.valueAsNumber
    });
  }

  saveWallet() {
    const data: IWalletData = {
      name: this.state.name,
      balance: this.state.balance,
      amount: this.state.amount,
      toId: this.state.toId
    };

    WalletDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          balance: response.data.balance,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newWallet() {
    this.setState({
      id: null,
      name: "",
      balance: 0,
      submitted: false
    });
  }

  render() {
    const { submitted, name, balance } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newWallet}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={name}
                onChange={this.onChangeName}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="balance">Balance</label>
              <input
                type="number"
                className="form-control"
                id="balance"
                required
                value={balance}
                onChange={this.onChangeBalance}
                name="balance"
              />
            </div>

            <button onClick={this.saveWallet} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
