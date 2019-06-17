import React, { Component } from "react";

import "../css/navbar.css";

import logo from "../img/ben-leeds-logo.png";
class NavBar extends Component {
  state = {
    data: [],
    value: ""
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

    const data = [...this.state.data];

    const d = buildings.map(
      element =>
        (element.value =
          element.number +
          ":" +
          " " +
          element.adress +
          " (" +
          element.zip +
          ")")
    );

    data.push(d);
    this.state = { data };
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

    // console.log(this.state.data);
    return (
      <nav className=" navBox  text-center">
        <div class="logo p-3">
          <img src={logo} alt="Ben Leeds Logo" />
        </div>
        <div className="container mainPage">
          <div className="row">
            <div className="col-sm-6">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="build input-group-text  text-white">Building:</div>
                </div>

                <select
                  name="country"
                  onChange={this.handleChange}
                  value={this.value}
                >
                  {this.state.data[0].map(e => {
                    console.log(e);
                    // console.log(e);
                    // console.log(this.state.data);
                    // console.log(e);
                    // console.log(index);

                    return <option value={e}>{e}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="build input-group-text  text-white">
                    Apt. number:
                  </div>
                </div>
                <input
                  value={this.props.value}
                  onChange={this.props.onHandleAptNum}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="build input-group-text text-white">Date:</div>
                </div>

                <input type="text" className="form-control" value={dateNow} />
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => this.props.onBackButton()}
            className="btn btn-warning m-3"
          >
            ⏎ Home
          </button>
          <button
            onClick={() => this.handlelogOut()}
            className="btn btn-danger m-3"
          >
            &#x2716; Logout
          </button>

          <button
            onClick={() => this.props.onFinishedButton()}
            className="btn btn-primary m-3"
          >
            Complete All
          </button>
        </div>
      </nav>
    );
  }
}

export default NavBar;
