import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../css/navbar.css";

import logo from "../img/ben-leeds-logo.png";
class NavBar extends Component {
  state = {
    data: [],
    value: "",
    showing: true
  };

  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      window.location = `/`;
    }
  }

  constructor(props) {
    super(props);
    const buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region === this.props.match.params.id
    );
    // console.log(buildings);
    const data = [...this.state.data];

    const d = buildings.map(
      element => (element.value = element.adress + " (" + element.zip + ")")
    );

    const showing = false;
    data.push(d);
    this.state = { data, showing };
  }

  handleChange(e) {
    const building1 = e.target.value;
    const build = building1.split(":");
    const building = build[0];
    console.log(building);
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.workorder.buildingNumber = building;
    localStorage.setItem("workorder", JSON.stringify(work));
  }

  render() {
    const data = this.state.data;
    const datas = data[0];
    const workorder = JSON.parse(localStorage.getItem("workorder"));

    const dateNow = workorder.workorder.loginTime;
    const { showing } = this.state;
    const { adress } = this.state;
    // console.log(this.state.data);
    // console.log(this.state.adress);
    // console.log(this.props.adress);
    return (
      <nav className="nav-box  text-center">
        <div className="logo p-3">
          <img src={logo} alt="Ben Leeds Logo" />
        </div>

        <div className="container mainPage">
          <div className="row nav-box">
            <div className="col-sm-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div
                    // onChangeBuild={() => this.props.changeBuild(this.value)}
                    className="build input-group-text  text-white"
                  >
                    Building Number:
                  </div>
                </div>

                <input
                  type="number"
                  min="1"
                  
                  className="build-input"
                  onChange={this.props.onHandleInput}
                  // adress={this.props.adress}
                  // onChangeInput={this.handleInput}
                />
                <br />
                {this.props.showing ? (
                  <div className="build-div">{this.props.adress}</div>
                ) : null}
                {/* <select
                  name="country"
                  onChange={() => this.setState({ showing: !showing })}
                  // onChange={this.props.onHandleChange}
                  // currentBuild={() => this.props.currentBuild(this.state.build)}
                  build={this.props.build}
                  // value={this.props.build}
                > */}
                {/* <option value="">Select building</option>
                  {this.props.build[0].map(e => {
                    console.log(e);
                    // console.log(e);
                    // console.log(this.state.data);
                    // console.log(e);
                    // console.log(index);

                    return <option value={e}>{e}</option>;
                  })} */}
                {/* </select> */}
              </div>
            </div>
            <div className="col-sm-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="build input-group-text  text-white">
                    Apartment Number:
                  </div>
                </div>
                <input
                  value={this.props.value}
                  onChange={this.props.onHandleAptNum}
                  className="build-input"
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="build input-group-text text-white">Date:</div>
                </div>

                <input
                  type="text"
                  className="form-control"
                  defaultValue={dateNow}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
