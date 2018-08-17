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
          <Motion
            defaultStyle={{ head: 0, ears: 20 }}
            style={{
              head: this.state.inputClick
                ? spring(10, { stiffness: 50, damping: 30 })
                : spring(0),
              ears: this.state.inputClick
                ? spring(30, { stiffness: 50, damping: 30 })
                : spring(20)
            }}
          >
            {overMot => {
              return (
                <div
                  style={{
                    width: "120%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    transform: `translate(-${overMot.head}px, ${
                      overMot.head
                    }px)`,
                    zIndex: 4
                  }}
                >
                  <div
                    className="dog-ear"
                    style={{ transform: `rotate(${overMot.ears}deg)` }}
                  />
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
                    <div id="dog-mouth">
                      <Motion
                        defaultStyle={{
                          x: 0,
                          grin: 50,
                          whistle: 0,
                          opacity: 1
                        }}
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
                            : spring(50),
                          whistle: this.state.passwordClick
                            ? spring(50, { stiffness: 20, damping: 40 })
                            : spring(0),
                          opacity: this.state.passwordClick
                            ? spring(1, { stiffness: 30, damping: 30 })
                            : spring(0)
                        }}
                      >
                        {mot => {
                          return (
                            <div style={{ height: "100vh", width: "100%" }}>
                              <img
                                alt="musical note"
                                src="/note.png"
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  top: 60,
                                  height: 50,
                                  width: 30,
                                  opacity: mot.opacity,
                                  transform: `translateY(-${mot.whistle}px)`
                                }}
                              />
                              <div id="dog-nose" />
                              <div
                                id="animation-smile"
                                style={{
                                  transform: `translateX(${mot.x}px)`,
                                  width: `${mot.grin}%`
                                }}
                              />
                            </div>
                          );
                        }}
                      </Motion>
                    </div>
                  </div>
                  <div
                    className="dog-ear"
                    style={{
                      transform: `rotate(-${overMot.ears}deg)`
                    }}
                  />
                </div>
              );
            }}
          </Motion>
          <Motion
            defaultStyle={{ body: 0 }}
            style={{
              body: this.state.inputClick
                ? spring(10, { stiffness: 50, damping: 30 })
                : spring(0)
            }}
          >
            {bodyMot => {
              return (
                <div
                  id="animation-body"
                  style={{ transform: `rotate(-${bodyMot.body}deg)` }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <div
                      className="dog-collar"
                      style={{
                        WebkitTransform: "skew(-20deg)",
                        MozTransform: "skew(-20deg)",
                        OTransform: "skew(-20deg)"
                      }}
                    />
                    <div id="dog-tie">
                      <div style={{ height: "110px" }} />

                      <div id="dog-knot-tie" />
                      <div id="dog-long-tie" />
                    </div>
                    <div
                      className="dog-collar"
                      style={{
                        WebkitTransform: "skew(20deg)",
                        MozTransform: "skew(20deg)",
                        OTransform: "skew(20deg)"
                      }}
                    />
                  </div>
                </div>
              );
            }}
          </Motion>
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: -5,
              justifyContent: "space-between",
              width: "50%"
            }}
          >
            <div
              className="dog-paws"
              style={{ transform: "rotate(30deg)", padding: "10px 0 0 0" }}
            >
              <div className="dog-claw" />
              <div className="dog-claw" />
              <div className="dog-claw" />
            </div>
            <div
              className="dog-paws"
              style={{ transform: "rotate(-30deg)", padding: "10px 0 0 0" }}
            >
              <div className="dog-claw" />
              <div className="dog-claw" />
              <div className="dog-claw" />
            </div>
          </div>
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
