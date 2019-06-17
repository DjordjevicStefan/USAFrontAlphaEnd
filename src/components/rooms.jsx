import React, { Component } from "react";
import "../css/navbar.css";

import NavBar from "./navBar.jsx";

import Room from "./room.jsx";
import { getRooms } from "../services/fakeRoomService";

class Rooms extends Component {
  state = {
    rooms: getRooms(),
    value: []
  };

  componentDidMount() {}

  handleAptNum = e => {
    const value = [...this.state.value];

    const workOrder = JSON.parse(localStorage.getItem("workorder"));
    workOrder.workorder.apartmentNumber = e.target.value;

    localStorage.setItem("workorder", JSON.stringify(workOrder));

    this.setState({
      value: e.target.value
    });
  };
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
  handleChangeBuilding = value => {};

  render() {
    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const value = workorder.apartmentNum;

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
      <div className="container mainPage">
        <NavBar
          {...this.props}
          value={value}
          onHandleAptNum={this.handleAptNum}
          onChangeBuildings={() => this.handleChangeBuilding()}
          onBackButton={this.handleBackButton}
          onFinishedButton={this.handleFinishedButton}
        />
        <div className="row">{rooms}</div>
      </div>
    );
  }
}

export default Rooms;
