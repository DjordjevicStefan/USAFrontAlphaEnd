import React, { Component } from "react";
import NavBar from "./navBar.jsx";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import Checkbox from "./checkbox.jsx";
import _ from "lodash";
import "../css/fullroom.css";
import { getRooms } from "../services/fakeRoomService";

class FullRoom extends Form {
  state = {
    data: {},
    errors: {},
    rooms: {},
    value: {},
    schema: {},
    checked: [],
    rooms2: {}
  };

  componentDidMount = () => {};

  getCurrentRoom = () => {
    return this.props.match.params.id;
  };
  handleBackButton = () => {
    this.props.history.push("/rooms/" + this.props.match.params.id);
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

    this.state = {
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
  handleAptNum = e => {};

  render() {
    const { data, errors, checked, renderedItems } = this.state;

    const datas = this.state.renderedItems;

    const title = datas[0];
    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const value = workorder.workorder.apartmentNumber;

    return (
      <React.Fragment>
        <div className="container mainPage">
          <NavBar
            {...this.props}
            value={value}
            onChangeBuildings={() => this.handleChangeBuilding()}
            onHandleAptNum={this.handleAptNum}
            onBackButton={this.handleBackButton}
            onFinishedButton={this.handleFinishedButton}
          />
          <div className="border text-center">
            <h1>{title.room}</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>SubCat</th>

                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Comment</th>
                  <th>Link</th>
                  <th>✔</th>
                </tr>
              </thead>
              <tbody>
                {datas.map(item => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.subCategory}</td>
                    <td>{item.price}</td>

                    <td>
                      <input
                        disabled={item.checked}
                        name={item.name}
                        label="quantity"
                        onChange={this.handleChange}
                        value={item.quantity}
                        className="form-control"
                        type="text"
                        id={item._id}
                      />{" "}
                    </td>

                    <td>
                      <textarea
                        disabled={item.checked}
                        onChange={this.handleChangeArea}
                        name={item.name}
                        value={item.comment}
                        id={item._id}
                      />
                    </td>
                    <td>
                      <Link>Link</Link>
                    </td>
                    <td>
                      {" "}
                      <Checkbox
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
