import React, { Component } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";
import ImageComponent from "./components/ImageComponent";
import { Button } from "antd";
const uuidv4 = require("uuid/v4");

const START_SCREEN = "START_SCREEN";
const GOOD_SCREEN = "GOOD_SCREEN";
const BAD_SCREEN = "BAD_SCREEN";
const END_SCREEN = "END_SCREEN";

class App extends Component {
  state = {
    hash: "",
    screen: START_SCREEN,
    dotLocation: null
  };

  makeid() {
    return uuidv4();
  }
  componentDidMount() {
    this.setState({ hash: this.makeid() });
  }
  handleClick = e => {
    e.preventDefault();
    this.setState({ screen: GOOD_SCREEN, dotLocation: 1 });
  };
  afterCapture = () => {
    console.log("photo taken");
    const { screen, dotLocation } = this.state;

    if (dotLocation >= 5 && screen === GOOD_SCREEN) {
      // Change to bad screen
      this.setState({ dotLocation: 1, screen: BAD_SCREEN });
    } else if (dotLocation >= 5 && screen === BAD_SCREEN) {
      // Change to end screen
      this.setState({ dotLocation: null, screen: END_SCREEN });
    } else {
      this.setState({ dotLocation: dotLocation + 1 });
    }
  };
  renderDot = () => {
    const { dotLocation } = this.state;
    if (dotLocation === 1)
      return <div className="dot" style={{ left: 0, top: 0 }} />;
    if (dotLocation === 2)
      return <div className="dot" style={{ right: 0, top: 0 }} />;
    if (dotLocation === 3)
      return <div className="dot" style={{ left: 0, bottom: 0 }} />;
    if (dotLocation === 4)
      return <div className="dot" style={{ right: 0, bottom: 0 }} />;
    if (dotLocation === 5)
      return (
        <div
          className="dot"
          style={{ left: "50%", right: "50%", top: "50%" }}
        />
      );

    return null;
  };

  render() {
    const { screen } = this.state;

    return (
      <div className="app">
        {this.renderDot()}
        <div className="sidebar">
          <h2 class="title">Instruktioner</h2>
          Instruktioner, Instruktioner, 1. Instruktioner
        </div>
        <div className="main">
          {screen === START_SCREEN && (
            <div>
              <h2>Välkommen</h2>
              <div className="information">
                Information Information Information
              </div>
              <Button type="primary" onClick={this.handleClick}>
                Starta
              </Button>
            </div>
          )}
          {screen === GOOD_SCREEN && (
            <div className="photo-view">
              <h2>Ergonomiskt foto</h2>
              <p>Text om detta</p>
              <ImageComponent
                folder="oskarsbilder/"
                filename="good1"
                hash={this.state.hash}
                afterCapture={this.afterCapture}
              />
            </div>
          )}
          {screen === BAD_SCREEN && (
            <div className="photo-view">
              <h2>Dålig hållning</h2>
              <ImageComponent
                folder="oskarsbilder/"
                filename="bad1"
                hash={this.state.hash}
                afterCapture={this.afterCapture}
              />
            </div>
          )}
          {screen === END_SCREEN && (
            <div>
              <h2>Slutfört</h2>
              <div className="information">
                Tack för din tid. Uppdatera sidan för att göra om testet.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
