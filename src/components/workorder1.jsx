import React, { Component } from "react";

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
    this.props.history.push("/rooms/" + this.props.match.params.id);
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
    work.workorder.sendTime = Date(Date.now());
    localStorage.setItem("workorder", JSON.stringify(work));
    const finalData = JSON.parse(localStorage.getItem("workorder"));

    const data = await axios.post(
      "http://localhost:3500/user/newWorkorder",
      JSON.stringify(finalData)
    );
    console.log(data);
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
    return (
      <React.Fragment>
        <div className="container mainPage">
          <div className="border text-center mt-3">
            <h1 className="p-3">Work order</h1>
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
                    <td>{item.price}</td>
                    <td>{item.quantity * item.price}</td>
                    <td>{item.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
