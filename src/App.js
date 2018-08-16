import React, { Component } from "react";
import "./App.css";
import { Motion, spring } from "react-motion";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      inputClick: false,
      passwordClick: false,
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
      case "password":
        return this.setState({ passwordClick: !this.state.passwordClick });
      default:
        return "nada";
    }
  }

  usernameClick() {
    this.moveEyes("initial");
    this.moveMouth();
  }
  passwordClick() {
    this.moveEyes("password");
    this.moveMouth();
  }

  usernameTrack(e) {
    let valueLength = e.target.value;
    this.setState({ username: valueLength }, () => {
      valueLength.length < 16
        ? this.setState({ eyeMovement: valueLength.length })
        : console.log("too many");
    });
  }
  passwordTrack(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <div className="animation-frame">
          <div
            style={{
              width: "120%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <div className="dog-ear" style={{ transform: "rotate(20deg)" }} />
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
                        : this.state.passwordClick
                          ? spring(-15)
                          : spring(this.state.eyeMovement),
                      y: this.state.inputClick
                        ? spring(15)
                        : this.state.passwordClick
                          ? spring(-15)
                          : spring(0)
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
                        : this.state.passwordClick
                          ? spring(-15)
                          : spring(this.state.eyeMovement),
                      y: this.state.inputClick
                        ? spring(15)
                        : this.state.passwordClick
                          ? spring(-15)
                          : spring(0)
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
              <div id="monkey-mouth">
                <div id="monkey-nose" />
                <Motion
                  defaultStyle={{ x: 0, grin: 50 }}
                  style={{
                    x: this.state.mouthMovement
                      ? this.state.passwordClick
                        ? spring(0)
                        : spring(15, { stiffness: 30, damping: 15 })
                      : spring(0),
                    grin: this.state.mouthMovement
                      ? this.state.passwordClick
                        ? spring(10)
                        : spring(20)
                      : spring(50)
                  }}
                >
                  {mot => {
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
            </div>
            <div className="dog-ear" style={{ transform: "rotate(-20deg)" }} />
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
          <input
            placeholder="Password"
            type="password"
            onFocus={() => this.passwordClick()}
            onChange={e => this.passwordTrack(e)}
            onBlur={() => this.passwordClick()}
            value={this.state.password}
          />
        </div>
      </div>
    );
  }
}

export default App;
