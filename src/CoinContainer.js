import React, { Component } from "react";
import { choice } from "./helpers";
import Coin from "./Coin";
import "./CoinContainer.css";
import Bitcoin from "./img/Bitcoin.png";
import DogCoin from "./img/DogCoin.png";

class CoinContainer extends Component {
  static defaultProps = {
    coins: [
      {
        side: "bitcoin",
        imgSrc: <img src={Bitcoin} alt="Bitcoin" />
      },
      {
        side: "dog-coin",
        imgSrc: <img src={DogCoin} alt="DogCoin" />
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
        {/* <h4>Out of {this.state.nFlips} flips</h4> */}
        {this.state.win > this.state.lose && (
          <div className="CoinContainer-win">
            <h2>
              Congrats, you have <span>won</span> {this.state.win} /{" "}
              {this.state.nFlips} times
            </h2>
          </div>
        )}
        {this.state.lose > this.state.win && (
          <div className="CoinContainer-lose">
            <h2>
              Oh no, you have <span>lost</span> {this.state.lose} /{" "}
              {this.state.nFlips} times
            </h2>
          </div>
        )}
        {this.state.lose === this.state.win && this.state.nFlips > 0 && (
          <div>
            <div className="CoinContainer-even">
              <h2>
                Now, we are <span>even</span>
              </h2>
            </div>
            <div className="CoinContainer-win">
              <h2>
                We have both <span>won</span> {this.state.win} /{" "}
                {this.state.nFlips} times
              </h2>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CoinContainer;
