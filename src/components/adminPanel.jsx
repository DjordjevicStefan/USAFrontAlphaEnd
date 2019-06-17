import React, { Component } from "react";
import AdminNavbar from "./common/adminNavbar";

import getAllWorkorders from "../services/workOrders";
import getAllUsers from "../services/users";

import AdminTable from "./semicommon/adminTable";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import TableName from "./common/tableName";


class AdminPanel extends Component {
  state = {
    orders: null,
    users: null,
    btnStatus: "pending",
    sortColumn: { path: "buildingNumber", order: "asc" }
  };

  //// http request from the mongo database
  async componentDidMount() {
    try {
      //// for pro days 

      const { data: users } = await getAllUsers();
      this.setState({ users: users });

      const { data: orders } = await getAllWorkorders();
      this.setState({ orders: orders });

    } catch (error) {
      if (error.status === 400) {
        toast.error("database error!");
      }
    }
  }

  //// show correct order status
  handleChangeStatus = () => {
    if (this.state.btnStatus === "pending")
      return this.setState({ btnStatus: "sent" });
    if (this.state.btnStatus === "sent")
      return this.setState({ btnStatus: "pending" });
  };

  //// sorting the table
  handleSort = path => {
    if (this.state.sortColumn.path === path) {
      let order = this.state.sortColumn.order === "asc" ? "desc" : "asc";
      this.setState({ sortColumn: { path: path, order: order } });
    } else {
      this.setState({ sortColumn: { path: path, order: "asc" } });
    }
  };

  //////// finding user by workorder
  findUserByWo = (workorderId) => {
    let userObj = this.state.users.find(e => {
          return e._id === workorderId;
        });
    let name = userObj.firstName + " " + userObj.lastName ;
    return name ;
  }

  checkEmpty = () => {
    if (this.state.orders.length === 0) {
      return (
        <div>
          <p className="h4">There is no work orders at this moment</p>
        </div>
      );
    }
  };

  render() {
    if (this.state.orders === null) {
      return (
        // <BrowserRouter >
        <div>
          
          <AdminNavbar pageName="Admin panel"/>
          <TableName tablename="Loading...." />
          <ToastContainer />
        </div>
      );
    }

    return (
      // <BrowserRouter>
      <div>
        <ToastContainer />
        <AdminNavbar pageName="Admin panel"/>
         
         {/* <Switch>
        <Route path="/users" exact component={Users} />
        </Switch> */}
         
        <AdminTable
          checkEmpty={this.checkEmpty}
          sortColumn={this.state.sortColumn}
          onSort={this.handleSort}
          onChange={this.handleChangeStatus}
          status={this.state.btnStatus}
          allOrders={this.state.orders}
          findUser = {this.findUserByWo}
        />
      </div>
      // /* </BrowserRouter> */
    );
  }
}

export default AdminPanel;
