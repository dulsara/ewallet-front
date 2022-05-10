import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import TutorialDataService from "../services/wallet.service";
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
    // this.onChangeName = this.onChangeName.bind(this);
    // this.onChangeBalance = this.onChangeBalance.bind(this);
     this.onChangeAmount = this.onChangeAmount.bind(this);

    this.getWallet = this.getWallet.bind(this);
    // this.updatePublished = this.updatePublished.bind(this);
    this.creditWallet = this.creditWallet.bind(this);
    this.debitWallet = this.debitWallet.bind(this);

    this.state = {
      currentWallet: {
        id: null,
        name: "",
        balance: 0,
        amount:0,
        toId:0
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getWallet(this.props.match.params.id);
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentWallet: {
          ...prevState.currentWallet,
          name: name,
        },
      };
    });
  }

  onChangeBalance(e: ChangeEvent<HTMLInputElement>) {
    const balance = e.target.valueAsNumber;

    this.setState((prevState) => ({
      currentWallet: {
        ...prevState.currentWallet,
        balance: balance,
      },
    }));
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
    TutorialDataService.get(id)
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

  // updatePublished(status: boolean) {
  //   const data: IWalletData = {
  //     id: this.state.currentWallet.id,
  //     name: this.state.currentWallet.name,
  //     balance: this.state.currentWallet.balance,
  //     amount: this.state.currentWallet.amount,
  //   };
  //
  //   TutorialDataService.update(data, this.state.currentWallet.id)
  //     .then((response: any) => {
  //       this.setState((prevState) => ({
  //         currentWallet: {
  //           ...prevState.currentWallet,
  //           published: status,
  //         },
  //         message: "The status was updated successfully!"
  //       }));
  //       console.log(response.data);
  //     })
  //     .catch((e: Error) => {
  //       console.log(e);
  //     });
  // }

  creditWallet() {
    TutorialDataService.credit(
      this.state.currentWallet.id,
        this.state.currentWallet.amount
    )
      .then((response: any) => {
        console.log(response.data);
        // this.setState({
        //   message: "The tutorial was updated successfully!",
        // });
        this.setState({
          currentWallet: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  walletToWallet() {
    TutorialDataService.w2w(
        this.state.currentWallet.id,
        this.state.currentWallet.amount,
        this.state.currentWallet.id
    )
        .then((response: any) => {
          console.log(response.data);
          // this.setState({
          //   message: "The tutorial was updated successfully!",
          // });
          this.setState({
            currentWallet: response.data,
          });
        })
        .catch((e: Error) => {
          console.log(e);
        });
  }



  debitWallet() {
    TutorialDataService.debit(this.state.currentWallet.id,this.state.currentWallet.amount)
      .then((response: any) => {
        console.log(response.data);
        //this.props.history.push("/tutorials");
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
    const { currentWallet } = this.state;

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
            {" "}
            <button
                type="submit"
                className="badge badge-success"
                onClick={this.walletToWallet}
            >
              W2W
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Wallet...</p>
          </div>
        )}
      </div>
    );
  }
}