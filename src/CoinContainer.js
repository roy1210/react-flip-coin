import React, { Component } from "react";
import { choice } from "./helpers";
import Coin from "./Coin";
import "./CoinContainer.css";

class CoinContainer extends Component {
  static defaultProps = {
    coins: [
      {
        side: "heads",
        imgSrc:
          "https://cdn.shopify.com/s/files/1/1277/7365/products/bitcoin-ag-obverse_740x.png?v=1547616796"
      },
      {
        side: "tails",
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
      nHeads: 0,
      nTails: 0,
      spin: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  flipCoin() {
    const newCoin = choice(this.props.coins);
    this.setState(st => {
      let newState = {
        ...st,
        currCoin: newCoin,
        nFlips: st.nFlips + 1,
        nHeads: st.nHeads + (newCoin.side === "heads" ? 1 : 0),
        nTails: st.nTails + (newCoin.side === "tails" ? 1 : 0),
        spin: true
      };
      setTimeout(() => {
        this.setState({ spin: false });
      }, 500);
      return newState;
    });
  }

  handleClick(e) {
    this.flipCoin();
  }
  render() {
    return (
      <div className="CoinContainer">
        <h2>Let's flip a coin</h2>
        {this.state.currCoin && (
          <Coin info={this.state.currCoin} spinning={this.state.spin} />
        )}
        <button onClick={this.handleClick} disabled={this.state.spin}>
          {this.state.spin ? "Flipping..." : "Flip me"}
        </button>
        <p>
          Out of {this.state.nFlips} flips, there have been {this.state.nHeads}{" "}
          heads and {this.state.nTails} tails.
        </p>
      </div>
    );
  }
}

export default CoinContainer;
