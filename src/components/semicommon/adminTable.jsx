import React, { Component } from "react";
import {Link} from "react-router-dom"
import TableName from "../common/tableName";
import _ from "lodash";

const AdminTable = ({ allOrders, status, onChange, onSort, sortColumn, checkEmpty, findUser }) => {
  //// filter orders by state prop
  let filteredOrders = allOrders.filter(order => order.status === status);

  //// sorting work oreders /// returns a arrey
  let sorted = _.orderBy(filteredOrders, [sortColumn.path], [sortColumn.order]);

  
   //// changing asc/desc arrow depending on the user interaction
  let arrowIcon = path => {
    if (sortColumn.path === path) {
     return (sortColumn.order === "asc") ? <i className="fa fa-sort-desc mr-2" /> : <i className="fa fa-sort-asc mr-2" /> ;
    }
 
    
  };

  ///// fa fa-sort-asc mr-2
  ///// fa fa-sort-desc mr-2

  return (
    <div className="container">
      <TableName tablename="Work orders" />
      {checkEmpty()}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Select</th>
            <th
              className="click-th"
              onClick={() => onSort("buildingNumber")}
              scope="col"
            >
              {arrowIcon("buildingNumber")}
              Building number
            </th>
            <th
              className="click-th"
              onClick={() => onSort("apartmentNumber")}
              scope="col"
            >
              {arrowIcon("apartmentNumber")}
              Apartment number
            </th>
            <th className="click-th" 
            onClick={() => onSort("firstName")} 
            scope="col"
            >
              {arrowIcon("firstName")} 
              User
            </th>
            <th scope="col">
              <button onClick={onChange} className="btn btn-primary">
                show {status === "pending" ? "sent" : "pending "}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td className="mt-3" colSpan="4">
                <p className="h6">There is 0 work orders whit this status </p>
              </td>
            </tr>
          ) : null}
          {sorted.map(order => (
            
            <tr key={order._id}>
              <td> <Link to={`/admin/workorder/${order._id}`} className="mdc-button btn-sm btn">Select</Link> </td>
              <td>{order.buildingNumber}</td>
              <td>{order.apartmentNumber}</td>
              <td> {findUser(order.user._id)}</td> 
              <td>{order.status}</td>
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;


