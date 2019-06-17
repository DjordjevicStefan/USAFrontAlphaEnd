import React, { Component } from "react";
import WorkOrderJobs from "./workOrderJobs" ;

export default class workOrderTable extends Component {
  render() {
    const { workorder, jobs } = this.props.workorder;
    const { users, onDateChange, onVendorChange , calendarTest, vendors, handleId, returnVendorId, onOk } = this.props;

    let workorderUser = users.find(x => x._id === workorder.userId);
    const userName = workorderUser.firstName + "     " + workorderUser.lastName;

    return (
      <div>
        <div className="container container-bg">
          <div className="row">
            <div className="col-sm-3">
              <span className="lead font-weight-bold">Work order of:</span>
            </div>
            <div className="col-sm-9 text-center">
              <h5 className="reset-mb">{userName}</h5>
            </div>
          </div>
          <div className="row border-b">
            <div className="col-sm-3">
              <span className="lead font-weight-bold">Time:</span>
            </div>
            <div className="col-sm-3 text-center">
              <span>
                <span className="lead">login time :</span>
                {workorder.loginTime.substring(0, 19)}
              </span>
            </div>
            <div className="col-sm-3 text-center">
              <span className="lead">CMPL time :</span>
              <span> {workorder.completedTime.substring(0, 19)} </span>
            </div>
            <div className="col-sm-3 text-center">
              <span className="lead">send time :</span>
              <span> {workorder.sendTime.substring(0, 19)} </span>
            </div>
          </div>
          <div className="row">
            <div className="col-sm text-center"> <pre className="lead font-weight-bold mt-2"> J O B S    L I S T</pre>  </div>
          </div>

          <WorkOrderJobs 
             jobs={jobs}
             onVendorChange ={onVendorChange}
             onDateChange= {onDateChange}
             calendarTest ={calendarTest}
             vendors={vendors}
             handleId={handleId}
             returnVendorId={returnVendorId}
             onOk = {onOk}
          />

        </div>
      </div>
    );
  }
}
