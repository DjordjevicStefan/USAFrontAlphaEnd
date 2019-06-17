import React, { Component } from "react";

import { getAllVendors } from "../services/vendor";
import { getJobs, getAllWorkorders } from "../services/jobs";
import {  ToastContainer } from "react-toastify";

import AdminNavbar from "./common/adminNavbar";
import TableName from "./common/tableName";
import JobsTable from "./semicommon/jobsTable";


export default class Jobs extends Component {
  state = {
    vendors : null ,
    jobs: null,
    jobStateSelect: null,
    workorders : null,
    load: false
  };

  async componentDidMount() {
    const { data: jobs } = await getJobs();
    const { data: vendors } = await getAllVendors();
    const { data : workorders } = await getAllWorkorders();
    this.setState({
      jobs: jobs,
      vendors : vendors,
      workorders : workorders,
      load: true,
      
    }, () => this.populateJobsArrey());
  }

  handleJobStateSelect = (e) => {
     const select =  e.target.value.toLowerCase() ;
     this.setState({
       jobStateSelect : select 
     });
  }
  
  populateJobsArrey = () => {
    const jobs = this.state.jobs ;
    const vendors = this.state.vendors;
    const workorders = this.state.workorders;
    jobs.map(job => job.vendor = vendors.find(vendor=> job.vendorId === vendor._id) ); 
    jobs.map(job => job.workorder = workorders.find(wo=> job.workorderId === wo._id) );
    

    this.setState({
      jobs : jobs
    })
  }

  
  

  render() {
    if (this.state.load === false) {
      return (
        <>
          <AdminNavbar pageName="Jobs" />
          <TableName tablename="Loading...." />
          <ToastContainer />
        </>
      );
    }

    

    return (
      <> 
        
        <ToastContainer />
        <AdminNavbar pageName="Jobs" />
        <div className="container container-bg">
          <form>
            <div className="form-group row">
              <label  className="col-sm-2 col-form-label">Show jobs </label>
              <div className="col-sm-10 padding-jobs">
                <select onChange={this.handleJobStateSelect} className="form-control form-control-sm">
                   <option>By jobs status</option>
                  <option value="pending">Pending</option>
                  <option value="sent">Sent</option>
                </select>
              </div>
            </div>
          </form>
          {(this.state.jobStateSelect === "by jobs status" || this.state.jobStateSelect === null ) ? null : 
          <JobsTable 
             jobStateSelect={this.state.jobStateSelect}
             jobs={this.state.jobs}
             vendors ={this.state.vendors}
          /> }
           
         

        </div>
      </>
    );
  }
}
