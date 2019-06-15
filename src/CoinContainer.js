import React, { Component } from "react";
import { choice } from "./helpers";
import Coin from "./Coin";
import "./CoinContainer.css";

class CoinContainer extends Component {
  static defaultProps = {
    coins: [
      {
        side: "bitcoin",
        imgSrc:
          "https://cdn.shopify.com/s/files/1/1277/7365/products/bitcoin-ag-obverse_740x.png?v=1547616796"
      },
      {
        side: "dog-coin",
        imgSrc:
          "https://www.wildtornado.com/blog/wp-content/uploads/2018/08/0f21b-dog-291x300.png"
      }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      currCoin: null,
      nFlips: 0,
      win: 0,
      lose: 0,
      spin: false,
      betOn: null
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  flipCoin() {
    const newCoin = choice(this.props.coins);

    this.setState(st => {
      let newState = {
        ...st,
        currCoin: newCoin,
        nFlips: st.nFlips + 1,
        win: st.win + (newCoin.side === this.state.betOn ? 1 : 0),
        lose: st.lose + (newCoin.side !== this.state.betOn ? 1 : 0),
        spin: true
      };
      console.log(newCoin);
      setTimeout(() => {
        this.setState({ spin: false });
      }, 500);
      return newState;
    });
  }

  async handleClick(e) {
    await this.setState(() => {
      return { betOn: e };
    });
    console.log(this.state.betOn);
    this.flipCoin();
  }
  // handleClick(e) {
  //   this.setState(() => {
  //     return { betOn: e };
  //   });
  //   console.log(this.state.betOn);
  //   setTimeout(() => {
  //     this.flipCoin();
  //   }, 10);
  // }

  render() {
    return (
      <div className="CoinContainer">
        <h2 className="CoinContainer-fade-in one">
          Flip a coin, challenge me!
        </h2>
        {this.state.currCoin && (
          <Coin info={this.state.currCoin} spinning={this.state.spin} />
        )}
        <button
          onClick={this.handleClick.bind(this, "bitcoin")}
          disabled={this.state.spin}
        >
          {this.state.spin ? "Flipping..." : "Bet on Bitcoin"}
        </button>
        <button
          onClick={this.handleClick.bind(this, "dog-coin")}
          disabled={this.state.spin}
        >
          {this.state.spin ? "Flipping..." : "Bet on Dog-coin"}
        </button>
        <h4>Out of {this.state.nFlips} flips</h4>
        {this.state.win > 0 && (
          <div className="CoinContainer-win">
            <h2>
              Congrats, You <span>won</span> {this.state.win} times.
            </h2>
          </div>
        )}
        {this.state.lose > 0 && (
          <div className="CoinContainer-lose">
            <h2>
              Oh no, You <span>lost</span> {this.state.lose} times.
            </h2>
          </div>
        )}
      </div>
    );
  }
}

export default CoinContainer;
