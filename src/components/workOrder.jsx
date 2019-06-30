import React, { Component } from "react";

import AdminNavbar from "./common/adminNavbar";
import TableName from "./common/tableName";
import WorkOrderTable from "../components/semicommon/workOrderTable";

import { getAllVendors } from "../services/vendor";
import { getWorkOrder, assignJob, endJob } from "../services/workOrders";
import getAllUsers from "../services/users";

import { toast, ToastContainer } from "react-toastify";
import { async } from "q";

export default class WorkOrder extends Component {
  state = {
    workorder: null,
    vendors: null,
    users: null,
    jobForSendArrey: [],
    selectedId: "",
    load: false,
    jobIdFromDate: ""
  };

  async componentDidMount() {
    const { data: workorder } = await getWorkOrder(this.props.match.params.id);
    const { data: vendors } = await getAllVendors();

    const vendorsWithoutDisabled = vendors.filter(
      vendor => vendor.status === "active"
    );

    const { data: users } = await getAllUsers();

    // deleting the calendar prop for now
    for (let i = 0; i < vendorsWithoutDisabled.length; i++) {
      delete vendorsWithoutDisabled[i].calendar;
    }

    this.setState(() => ({
      workorder: workorder,
      vendors: vendorsWithoutDisabled,
      users: users,
      okTriger: false,
      load: true
    }));
  }

  //// prvi puca uvek
  handleDateChange = e => {
    const selDate = e.target.value;
    
    
    

    const jobId = this.state.jobIdFromDate;
    const jobsArrey = this.state.workorder.jobs.slice();
    // console.log("arej koji tek treba u filter" , jobsArrey);

    const editDate = jobsArrey.filter(job => job._id === jobId);
    // console.log("filterovan arrey" , editDate);

    editDate[0].assignmentDate = selDate;
    console.log("dodat datum", editDate[0]);

    const workorderCopy = { ...this.state.workorder };
    workorderCopy.jobs = jobsArrey;

    // console.log("workorder koji se vraca" , workorderCopy);

    this.setState({
      workorder: workorderCopy
    });
  };

  handleId = id => {
    this.setState({
      jobIdFromDate: id
    });
  };

  handleVendorChange = e => {
    const selVendorId = e.target.value;
    //  console.log("vendor id", selVendorId);

    const jobId = e.target.parentElement.id;
    //  console.log("job id" , jobId);

    const copyArrey = this.state.jobForSendArrey;
    if (copyArrey.length !== 0) {
      let index = copyArrey.findIndex(x => x.jobId === jobId);
      copyArrey.splice(index, 1);
    }

    const obj = {
      jobId: jobId,
      selVendorId: selVendorId
    };

    copyArrey.push(obj);

    const woCopy = this.state.workorder;
    const jobToAddVendorId = woCopy.jobs.filter(job => job._id === jobId);
    jobToAddVendorId[0].vendorId = selVendorId;

    this.setState({
      workorder: woCopy,
      jobForSendArrey: copyArrey
    });
  };

  handleOkButton = async (e, id) => {
    let yesNo = window.confirm(
      `Are you sure you assigned the correct date and vendor for this job?`
    );

    if (yesNo === false) {
      return;
    } else {
    }

    this.setState({
      okTriger: true
    });

    const clickBtnId = id;

    //// check if vendor and date is selected
    const checkArrey = this.state.jobForSendArrey;
    let index = checkArrey.findIndex(x => x.jobId === clickBtnId);

    let jobsArrey = this.state.workorder.jobs;
    let index2 = jobsArrey.findIndex(x => x.assignmentDate !== "");

    const firstCheck = index;
    const secondCheck = index2;

    ////data i need to populate assign function

    const workorder = this.state.workorder.workorder;
    console.log("pre funkcje wo" , workorder );
    //// check to see if all jobs wrom this wo are sent ,checking for wo change status
    const woStatusCheck = (workorder) => {
     let check = jobsArrey.filter(job => (
          job.status === "pending" 
      )) ;
    
      if (check.length === 0) {
        workorder.status = "sent"  ;
      } else {
    }
    } ;
    woStatusCheck(workorder);
    console.log("oosle funckije wo" , workorder );
    
    //// curent job to submit on button click
    const job = jobsArrey.find(job => job._id === clickBtnId);

    let selVendorId = null;
    const vendorObj = checkArrey.find(job => job.jobId === clickBtnId);

    if (vendorObj) {
      selVendorId = vendorObj.selVendorId;
    } else {
      return null;
    }

    const vendorArrey = this.state.vendors;
    const vendor = vendorArrey.find(vendor => vendor._id === selVendorId);

    if (firstCheck !== -1 && secondCheck !== -1) {
      this.submitDateAndVendor(clickBtnId, job, vendor, workorder);
    } else {
      toast.error("please fill out all fields and date");
    }
  };

  submitDateAndVendor = async (clickBtnId, job, vendor, workorder) => {

    
    console.log("jobid", clickBtnId);
    console.log("wo", workorder);
    console.log("job", job);
    console.log("jvendor", vendor);

  

    const { data } = await assignJob(clickBtnId, job, vendor, workorder);
    if (data.success) {
      const woAndJobs = this.state.workorder;
      const statusToEdit = woAndJobs.jobs.filter(job => job._id === clickBtnId);
      statusToEdit[0].status = "sent";
      this.setState({
        workorder: woAndJobs
      });
    } else {
      toast.error("database error!");
    }
  };

  render() {
    const { load } = this.state;

    if (load === false) {
      return (
        <div>
          <AdminNavbar pageName="Work order" />
          <TableName tablename="Loading...." />
          <ToastContainer />
        </div>
      );
    }

    return (
      <div>
        <AdminNavbar pageName="Work order" />
        <ToastContainer />

        <WorkOrderTable
          workorder={this.state.workorder}
          users={this.state.users}
          onVendorChange={this.handleVendorChange}
          onDateChange={this.handleDateChange}
          calendarTest={this.state.calendarTest}
          handleId={this.handleId}
          vendors={this.state.vendors}
          returnVendorId={this.handleVendorId}
          onOk={this.handleOkButton}
          okTriger={this.state.okTriger}
        />
      </div>
    );
  }
}
