import React, { Component } from "react";
import "./App.css";
import { Motion, spring } from "react-motion";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      inputClick: false,
      eyeMovement: 0,
      mouthMovement: false
    };
  }

  moveMouth() {
    this.setState({ mouthMovement: !this.state.mouthMovement });
  }

  moveEyes(phrase) {
    switch (phrase) {
      case "initial":
        return this.setState({ inputClick: !this.state.inputClick });
      case "track":
        let forward = this.state.eyeMovement + 1;
        return this.setState({ eyeMovement: forward });
      case "back-track":
        let backward = this.state.eyeMovement - 1;
        return this.setState({ eyeMovement: backward });
      default:
        return "nada";
    }
  }

  usernameClick() {
    // window.addEventListener("onfocus", e => {
    this.moveHead();
    this.moveEyes("initial");
    this.moveMouth();

    // });
  }

  usernameTrack(e) {
    let valueLength = e.target.value;
    this.setState({ username: valueLength }, () => {
      valueLength.length < 16
        ? this.setState({ eyeMovement: valueLength.length })
        : console.log("too many");

      // window.addEventListener("keydown", e => {
      //   console.log(e.keyCode !== 8);
      //   this.state.eyeMovement < 16 || this.state.eyeMovement < -7
      //     ? e.keyCode !== 8
      //       ? this.moveEyes("track")
      //       : this.moveEyes("back-track")
      //     : console.log("max");
      // });
    });
  }

  render() {
    // window.addEventListener("change", e => {
    //   console.log(e);
    // });
    console.log(this.state.eyeMovement);
    return (
      <div className="App">
        <div className="animation-frame">
          <div id="animation-head">
            <div id="animation-eyes">
              <div id="animation-eye">
                <Motion
                  defaultStyle={{
                    x: this.state.eyeMovement,
                    y: 0
                  }}
                  style={{
                    x: this.state.inputClick
                      ? spring(this.state.eyeMovement - 7)
                      : spring(this.state.eyeMovement),
                    y: this.state.inputClick ? spring(15) : spring(0)
                  }}
                >
                  {mot => {
                    return (
                      <div
                        id="animation-pupil"
                        style={{
                          transform: `translate(${mot.x}px, ${mot.y}px)`
                        }}
                      />
                    );
                  }}
                </Motion>
              </div>
              <div id="animation-eye">
                <Motion
                  defaultStyle={{
                    x: 0,
                    y: 0
                  }}
                  style={{
                    x: this.state.inputClick
                      ? spring(this.state.eyeMovement - 7)
                      : spring(this.state.eyeMovement),
                    y: this.state.inputClick ? spring(15) : spring(0)
                  }}
                >
                  {mot => {
                    return (
                      <div
                        id="animation-pupil"
                        style={{
                          transform: `translate(${mot.x}px, ${mot.y}px)`
                        }}
                      />
                    );
                  }}
                </Motion>
              </div>
            </div>
            <Motion
              defaultStyle={{ x: 0, grin: 50 }}
              style={{
                x: this.state.mouthMovement
                  ? spring(10, { stiffness: 30, damping: 15 })
                  : spring(0),
                grin: this.state.mouthMovement ? spring(15) : spring(50)
              }}
            >
              {mot => {
                // console.log("mot.grin", mot.grin);
                return (
                  <div
                    id="animation-smile"
                    style={{
                      transform: `translateX(${mot.x}px)`,
                      width: `${mot.grin}%`
                    }}
                  />
                );
              }}
            </Motion>
          </div>
          <div id="animation-body" />
        </div>
        <div id="sign-in-container">
          <input
            placeholder="Username"
            onFocus={() => this.usernameClick()}
            onChange={e => this.usernameTrack(e)}
            onBlur={() => this.usernameClick()}
            value={this.state.username}
          />
          <input placeholder="Password" type="password" />
        </div>
      </div>
    );
  }
}

export default App;
