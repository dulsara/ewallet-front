import {ChangeEvent, Component} from "react";
import WalletDataService from "../services/wallet.service";
import IWalletData from '../types/wallet';

type Props = {};

type State = {
  wallets: Array<IWalletData>,
  wallets2: Array<IWalletData>,
  currentWallet: IWalletData
};

export default class TransferWallet extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.retrieveWallets = this.retrieveWallets.bind(this);
    // this.getWallet = this.getWallet.bind(this);


    this.state = {
      wallets: [],
      wallets2: [],
      currentWallet: {
        id: 0,
        name: "",
        balance: 0,
        amount:0,
        toId:0
      }
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

  onChangeFromWallet(e: ChangeEvent<HTMLInputElement>) {
    const id = e.target.valueAsNumber;

    this.setState((prevState) => ({
      currentWallet: {
        ...prevState.currentWallet,
        id: id,
      },
    }));
  }

  onChangeToWallet(e: ChangeEvent<HTMLInputElement>) {
    const id = e.target.valueAsNumber;

    this.setState((prevState) => ({
      currentWallet: {
        ...prevState.currentWallet,
        toId: id,
      },
    }));
  }

  creditWallet() {
    WalletDataService.w2w(
        this.state.currentWallet.id,
        this.state.currentWallet.amount,
        this.state.currentWallet.toId,
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

  render() {
    const {  wallets,wallets2 } = this.state;

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
                <select>
                  {
                    wallets.map((wallet: IWalletData)=>
                        (<option key={wallet.id}  value={wallet.name}>
                          {wallet.name}
                        </option> ))
                  }
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="toId">To Wallet : </label>
                {" "}
                <select >
                  {
                    wallets2.map((wallet: IWalletData)=>
                        (<option key={wallet.id}  value={wallet.name} >
                          {wallet.name}
                        </option> ))

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
                onClick={this.creditWallet}
            >
              TRANSFER
            </button>
            <div>


              {/*<p>We eat {value}!</p>*/}
            </div>
          </div>
        </div>
    );
  }

}


