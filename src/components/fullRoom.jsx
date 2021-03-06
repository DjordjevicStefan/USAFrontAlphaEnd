import React, { Component } from "react";
import NavBar from "./navBar.jsx";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import Checkbox from "./checkbox.jsx";
import _ from "lodash";
import "../css/fullroom.css";
import { getRooms } from "../services/fakeRoomService";
import axios from "axios";
import SearchBox from "./common/searchbox";
class FullRoom extends Form {
  state = {
    data: {},
    errors: {},
    rooms: {},
    value: {},
    schema: {},
    checked: [],
    rooms2: {},
    build: []
  };

  getCurrentRoom = () => {
    return this.props.match.params.id;
  };
  handleBackButton = () => {
    this.props.history.push("/rooms/" + this.props.match.params.m);
  };
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      window.location = `/`;
    }
  }
  handleFinishedButton = () => {
    // console.log(this.props.match);
    this.props.history.push(
      "/rooms/" + this.props.match.params.id + "/work-order"
    );
    const work = JSON.parse(localStorage.getItem("workorder"));
    const date = Date(Date.now());
    work.workorder.completedTime = date;
    localStorage.setItem("workorder", JSON.stringify(work));
  };

  handleChangeArea = ({ currentTarget: input }) => {
    const value = this.state.value;

    value[input.name] = input.value;

    this.setState({ value });

    const rooms = this.state.allItems.find(room => room._id === input.id);

    rooms.comment = this.state.value[input.name];

    localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.state.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.state.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = e => {
    const input = e.currentTarget;

    const errors = { ...this.state.errors };
    const schema = { ...this.state.schema };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };

    data[input.name] = input.value;

    this.setState({ data, errors });

    const rooms = this.state.allItems.find(room => room._id === input.id);

    rooms.quantity = data[input.name];

    localStorage.setItem("allItems", JSON.stringify(this.state.allItems));

    // schema = {
    //   [input.name]: Joi.number().label("quantity")
    // };
    // this.setState({ schema });

    // const data = { ...this.state.data };
    // console.log(input.value);
    // console.log(e.target.value);
    // data[input.name] = input.value;
    // this.setState({ data });

    // this.setState({ value: e.target.value });
  };
  // changeBuild(value) {
  //   // console.log(value);
  // }
  handleSearch = query => {
    this.setState({ searchQuery: query });
    console.log(query);
  };
  handleInput = e => {
    const { showing } = this.state;
    const buildNumber = JSON.parse(localStorage.getItem("workorder")).workorder
      .buildingNumber;

    const buildings = JSON.parse(localStorage.getItem("buildings")).find(
      m => m.number == buildNumber
    );

    // element.value = element.number + " (" + element.zip + ")";
    const adress = buildings.adress + " (" + buildings.zip + ")";
    // console.log(buildings);
    this.setState({ adress });
  };
  handleCheckboxChange = e => {
    const checked = { ...this.state.checked };

    const rooms = this.state.allItems.find(
      room => room._id === e.currentTarget.id
    );
    if (e.target.checked === false) {
      checked[e.currentTarget.name] = e.target.checked;
      rooms.checked = false;

      localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
    } else {
      checked[e.currentTarget.name] = e.target.checked;
      rooms.checked = true;
      localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
    }
    this.setState({ checked });
  };
  handleAptNum = e => {};
  // handleChange1(e) {
  //   const building1 = e.target.value;
  //   const build = building1.split(":");
  //   const building = build[0];
  //   // console.log(building);
  //   const work = JSON.parse(localStorage.getItem("workorder"));
  //   work.workorder.buildingNumber = building;
  //   localStorage.setItem("workorder", JSON.stringify(work));
  // }
  handleWorkOrder = async () => {
    // const workOrder = JSON.parse(localStorage.getItem("workorder"));

    const allItems = JSON.parse(localStorage.getItem("allItems"));
    const copyItems = [...allItems].filter(item => {
      return item.checked;
    });
    const finalItems = copyItems.map(item => {
      return {
        name: item.name,
        price: item.price,
        room: item.room,
        subCategory: item.subCategory,
        quantity: item.quantity,
        comment: item.comment
      };
    });
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.jobs = finalItems;
    work.workorder.status = "saved";
    work.workorder.sendTime = Date(Date.now());
    work.workorder.completedTime = Date(Date.now());
    localStorage.setItem("workorder", JSON.stringify(work));
    const finalData = JSON.parse(localStorage.getItem("workorder"));
    console.log(finalData);
    const data = await axios.post(
      process.env.REACT_APP_API_URL + "/user/newWorkorder",
      JSON.stringify(finalData)
    );
    console.log(data);
  };

  constructor(props) {
    super(props);
    const data = {};
    const errors = {};
    const value = {};
    const checked = {};
    const rooms = getRooms();

    const allItems = JSON.parse(localStorage.getItem("allItems"));
    // const room = this.props.match.params.m;

    const room0 = rooms.filter(m => m.id == this.props.match.params.id);
    const renderedItems = allItems.filter(m => m.room === room0[0].name);
    {
      renderedItems.map(item => (checked[item.name] = false));
    }

    let schema = this.state.schema;

    let items = renderedItems;

    {
      items.map(item => (schema[item.name] = Joi.number().label("quantity")));
    }

    const buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region === this.props.match.params.m
    );

    const build = [...this.state.build];

    // const d = buildings.map(
    //   element =>
    //     (element.value =
    //       element.number +
    //       ":" +
    //       " " +
    //       element.adress +
    //       " (" +
    //       element.zip +
    //       ")")
    // );

    // build.push(d);
    // this.state = { data };

    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const build1 = [];
    build1.push(workorder.workorder.buildingNumber);
    build.push(build1);
    const adress = [];
    const searchQuery = "";
    // console.log(build);
    this.state = {
      searchQuery,
      adress,
      build,
      rooms,
      schema,
      allItems,
      data,
      errors,
      value,
      checked,
      renderedItems
    };
  }

  render() {
    console.log(this.state.searchQuery);
    const searchQuery = this.state.searchQuery;
    const showing = true;
    // const adress = [];
    if (
      !JSON.parse(localStorage.getItem("workorder")).workorder.buildingNumber
    ) {
    }
    const buildNumber = JSON.parse(localStorage.getItem("workorder")).workorder
      .buildingNumber;

    const building = JSON.parse(localStorage.getItem("buildings")).find(
      m => m.number == buildNumber
    );

    // element.value = element.number + " (" + element.zip + ")";

    // const { data, errors, checked, renderedItems } = this.state;

    const adress = building.adress + " (" + building.zip + ")";
    console.log(searchQuery);

    let datas = this.state.renderedItems;
    if (searchQuery) {
      datas = this.state.renderedItems.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    let title = "";
    if (datas[0] == undefined) {
      title = "Not found";
    } else {
      title = datas[0].room;
    }
    console.log(datas);

    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const value = workorder.workorder.apartmentNumber;
    // const { adress } = this.state;
    // console.log(adress);

    return (
      <React.Fragment>
        <div className="container mainPage">
          <NavBar
            {...this.props}
            value={value}
            adress={adress}
            showing={showing}
            build={this.state.build}
            // onHandleInput={this.handleInput}
            // build={build}
            onHandleChange={this.handleChange1}
            // onChangeBuildings={() => this.handleChangeBuilding()}
            onHandleAptNum={this.handleAptNum}
            onBackButton={this.handleBackButton}
            onFinishedButton={this.handleFinishedButton}
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
            <Link to={"/user/workorders"} className="btn btn-warning mt-3 mb-3">
              My Workorders
            </Link>
            <button
              onClick={() => this.handlelogOut()}
              className="btn btn-danger m-3"
            >
              &#x2716; Logout
            </button>
          </div>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <div className="rooms border text-center">
            <h1 className="lead m-3">{title}</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>SubCategory</th>

                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Comment</th>

                  <th>Link</th>
                  <th>✔</th>
                </tr>
              </thead>
              <tbody>
                {datas.map(item => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.subCategory}</td>
                    <td>{item.price}</td>

                    <td>
                      <input
                        min="1"
                        disabled={item.checked}
                        name={item.name}
                        label="quantity"
                        onChange={this.handleChange}
                        value={  item.quantity || 1 }
                        className="quantity"
                        type="number"
                        id={item._id}
                      />{" "}
                    </td>
                    <td>{Math.ceil(item.quantity * item.price) || item.price }$</td>
                    <td>
                      <textarea
                        cols="38"
                        rows="2"
                        disabled={item.checked}
                        onChange={this.handleChangeArea}
                        name={item.name}
                        value={item.comment}
                        id={item._id}
                      />
                    </td>
                    <td>
                      <Link to="#">Link</Link>
                    </td>
                    <td>
                      <Checkbox
                        type="checkbox"
                        className="form-control"
                        name={item.name}
                        id={item._id}
                        checked={item.checked}
                        onChange={this.handleCheckboxChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FullRoom;
