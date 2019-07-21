import React, { Component } from "react";
import "./CSS/CoinContainer.css";
import Bitcoin from "./img/Bitcoin.png";
import DogCoin from "./img/DogCoin.png";

class Coin extends Component {
  render() {
    let pic;
    if (this.props.info.side === "bitcoin") {
      pic = <img src={Bitcoin} alt={this.props.info.side} />;
    } else if (this.props.info.side === "dog-coin") {
      pic = <img src={DogCoin} alt={this.props.info.side} />;
    }

    return (
      <div className={this.props.spinning ? "Coin-spinning" : "Coin"}>
        {pic}
      </div>
    );
  }
}

export default Coin;
