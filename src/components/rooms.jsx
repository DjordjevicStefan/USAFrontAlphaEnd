import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

import NavBar from "./navBar.jsx";

import Room from "./room.jsx";
import { getRooms } from "../services/fakeRoomService";

class Rooms extends Component {
  state = {
    rooms: getRooms(),
    value: [],
    build: []
  };

  componentDidMount() {}

  handleBackButton = url => {
    // this.props.history.push("/rooms/" + this.props.match.params.id);
    // return console.log(this.props.match.url);
  };
  handleFinishedButton = () => {
    this.props.history.push(
      "/rooms/" + this.props.match.params.id + "/work-order"
    );
    const work = JSON.parse(localStorage.getItem("workorder"));
    const date = Date(Date.now());
    work.workorder.completedTime = date;
    localStorage.setItem("workorder", JSON.stringify(work));
  };

  handleChange1 = e => {
    console.log(e);
    const building1 = e.target.value;
    const build = building1.split(":");
    const building = build[0];
    console.log(building);
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.workorder.buildingNumber = building;
    localStorage.setItem("workorder", JSON.stringify(work));
  };

  handleInput = e => {
    console.log(e.target.value);
    const { showing } = this.state;

    const buildings = JSON.parse(localStorage.getItem("buildings")).find(
      m => m.number == e.target.value
    );
    if (buildings === undefined) {
      const adress = "";
      this.setState({ showing: false, adress: false });
    } else {
      const adress = buildings.adress + " (" + buildings.zip + ")";
      console.log(buildings);
      const work = JSON.parse(localStorage.getItem("workorder"));
      work.workorder.buildingNumber = e.target.value;
      work.workorder.adress = adress;
      localStorage.setItem("workorder", JSON.stringify(work));
      this.setState({ showing: !showing, adress });
    }
    // element.value = element.number + " (" + element.zip + ")";
  };

  handleAptNum = e => {
    const value = "";

    const workOrder = JSON.parse(localStorage.getItem("workorder"));
    workOrder.workorder.apartmentNumber = e.target.value;

    localStorage.setItem("workorder", JSON.stringify(workOrder));

    this.setState({
      value: e.target.value
    });
  };

  constructor(props) {
    super(props);

    const buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region === this.props.match.params.id
    );

    const build = [...this.state.build];

    const d = buildings.map(
      element => (element.value = element.number + " (" + element.zip + ")")
    );

    build.push(d);
    const adress = [];
    // this.state = { data };
    const showing = false;
    const rooms = getRooms();
    this.state = {
      rooms: getRooms(),
      value: false,
      build,
      showing: true
    };
  }

  render() {
    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const value = workorder.workorder.apartmentNumber;
    const buildNumber = JSON.parse(localStorage.getItem("workorder")).workorder
      .buildingNumber;
    let adress = [];
    let showing = [];
    if (buildNumber == "") {
      adress = "";
      console.log("radii");
    } else {
      const building = JSON.parse(localStorage.getItem("buildings")).find(
        m => m.number == buildNumber
      );
      console.log(building);
      // console.log(building);
      // const adress = "";
      // if (building == undefined) {
      //   const adress = "Upisi adresu";
      // } else {
      //   // element.value = element.number + " (" + element.zip + ")";

      //   // const { data, errors, checked, renderedItems } = this.state;

      adress = building.adress + " (" + building.zip + ")";
      const { showing } = this.state;
    }
    // const showing = true;
    // }

    // const adress = workorder.workorder.buildingNumber;
    // console.log(value, adress);

    // const build = workorder.workorder.buildingNumber;
    // console.log(build);
    let rooms = this.state.rooms.map(room => {
      return (
        <Room
          region={this.props.match.params.id}
          id={room.id}
          image={room.image}
          name={room.name}
        />
      );
    });

    return (
      <div className="container main-page">
        <NavBar
          {...this.props}
          showing={showing}
          value={value}
          build={this.state.build}
          onHandleInput={this.handleInput}
          adress={adress}
          // build={build}
          onHandleChange={this.handleChange1}
          onHandleAptNum={this.handleAptNum}
          onChangeBuildings={() => this.handleChangeBuilding()}
        />
        <div className="buttons">
          <div className="col-6">
            <button
              onClick={() => this.handleBackButton()}
              className="btn btn-warning m-3"
            >
              ⏎ Home
            </button>

            <button
              onClick={() => this.handleWorkOrder()}
              className="btn btn-success m-3"
            >
              Save
            </button>
            <button
              onClick={() => this.handleFinishedButton()}
              className="btn btn-primary m-3"
            >
              Complete All
            </button>
          </div>
          <Link
            to={"/user/workorders"}
            className="btn btn-warning mt-3 mb-3 float-right"
          >
            My Workorders
          </Link>
          <button
            onClick={() => this.handlelogOut()}
            className="btn btn-danger m-3"
          >
            &#x2716; Logout
          </button>
        </div>
        {adress && value ? <div className="row">{rooms}</div> : null}
      </div>
    );
  }
}

export default Rooms;
