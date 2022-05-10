import { Component, ChangeEvent } from "react";
import TutorialDataService from "../services/wallet.service";
import { Link } from "react-router-dom";
import IWalletData from '../types/wallet';

type Props = {};

type State = {
  wallets: Array<IWalletData>,
  currentWallet: IWalletData | null,
  currentIndex: number,
  searchName: string
};

export default class WalletsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveWallets = this.retrieveWallets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    // this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      wallets: [],
      currentWallet: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveWallets();
  }

  onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveWallets() {
    TutorialDataService.getAll()
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

  setActiveTutorial(wallet: IWalletData, index: number) {
    this.setState({
      currentWallet: wallet,
      currentIndex: index
    });
  }

  // removeAllTutorials() {
  //   TutorialDataService.deleteAll()
  //     .then((response: any) => {
  //       console.log(response.data);
  //       this.refreshList();
  //     })
  //     .catch((e: Error) => {
  //       console.log(e);
  //     });
  // }

  searchName() {
    this.setState({
      currentWallet: null,
      currentIndex: -1
    });

    TutorialDataService.findByWallet(this.state.searchName)
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

  render() {
    const { searchName, wallets, currentWallet, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Wallet Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Wallet List</h4>

          <ul className="list-group">
            {wallets &&
              wallets.map((tutorial: IWalletData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.name}
                </li>
              ))}
          </ul>

          {/*<button*/}
          {/*  className="m-3 btn btn-sm btn-danger"*/}
          {/*  onClick={this.removeAllTutorials}*/}
          {/*>*/}
          {/*  Remove All*/}
          {/*</button>*/}
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
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Wallet for more details...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
