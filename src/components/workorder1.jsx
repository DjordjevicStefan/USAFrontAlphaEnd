import React, { Component } from "react";
import NavBar from "./navBar.jsx";
import _ from "lodash";
import axios from "axios";

import "../css/workorder.css";

class Wo extends Component {
  state = {
    allItems: {}
    // jobsList: getItemList()
  };
  saveStateToLocalStorage() {
    const allItems = JSON.parse(localStorage.getItem("allItems"));
    localStorage.setItem("allItems", JSON.stringify(allItems));
  }
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      window.location = `/`;
    }
  }
  componentDidMount() {
    // this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    // window.addEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );
  }

  handleBackButton = url => {
    this.props.history.push("/rooms/" + this.props.match.params.m);
  };
  handleFinishedButton = async () => {
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
    work.workorder.totalPrice = 90;
    work.workorder.comment = "bla";
    work.workorder.sendTime = Date(Date.now());
    localStorage.setItem("workorder", JSON.stringify(work));
    const finalData = JSON.parse(localStorage.getItem("workorder"));
    console.log(finalData);
    const data = await axios.post(
      "http://localhost:3500/user/newWorkorder",
      JSON.stringify(finalData)
    );
    console.log(data);
    if (data.statusText === "OK") {
      console.log("radi");
      // window.location = `/`;
      console.log(this.props);

      const work = JSON.parse(localStorage.getItem("workorder"));
      work.workorder.buildingNumber = "";
      work.workorder.apartmentNumber = "";

      work.workorder.loginTime = Date(Date.now());
      localStorage.setItem("workorder", JSON.stringify(work));
      this.props.history.push("/rooms/" + this.props.match.params.m);
      window.location.reload();
    }
  };
  constructor(props) {
    super(props);

    const allItems = JSON.parse(localStorage.getItem("allItems")).filter(
      m => m.checked == true
    );

    this.state = {
      allItems
    };
  }
  render() {
    // const totalprice = this.state.allItems.map(
    //   item => item.quantity * item.price
    // );
    let total = 0;
    for (let i = 0; i < this.state.allItems.length; i++) {
      total += Math.ceil(
        this.state.allItems[i].quantity * this.state.allItems[i].price
      );
    }
    console.log(total);
    // const total = totalprice.map(item => );

    return (
      <React.Fragment>
        <div className="container main-page">
          <NavBar
            {...this.props}
            // value={value}
            onHandleAptNum={this.handleAptNum}
            onChangeBuildings={() => this.handleChangeBuilding()}
            onBackButton={this.handleBackButton}
            onFinishedButton={this.handleFinishedButton}
          />
          <div className="work-order border text-center mt-3">
            <h1 className="m-3">Work order</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Item</th>
                  <th>Subcat</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allItems.map(item => (
                  <tr>
                    <td>{item.room}</td>
                    <td>{item.name}</td>
                    <td>{item.subCategory}</td>

                    <td>{item.quantity}</td>
                    <td>{item.price}$</td>
                    <td>{Math.ceil(item.quantity * item.price)}$</td>
                    <td>{item.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>Total Price: {total}$</div>
            <textarea
              placeholder="Comment About Workorder"
              name=""
              id=""
              cols="30"
              rows="4"
            />
            <div className="buttons">
              <button
                onClick={() => this.handleBackButton()}
                className="btn btn-warning m-3"
              >
                ⏎ Cancel
              </button>

              <button
                onClick={() => this.handleFinishedButton()}
                className="btn btn-primary m-3"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Wo;
