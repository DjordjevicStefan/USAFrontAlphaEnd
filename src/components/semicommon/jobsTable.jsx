import React from "react";

export default function JobsTable(props) {
  const { jobs , jobStateSelect} = props ;
   
  const filteredJobsArrey = jobs.filter(job => job.status === jobStateSelect);
 
  if (filteredJobsArrey.length === 0) {
     return ( 
      <table className="table table-bordered ">
        <thead>
           <tr>
             <th>There is no jobs whit that status at this moment</th>
           </tr>
          </thead>   
      </table>
      )
  }

  return (
    <>
      {filteredJobsArrey.map(job=> (
          
        <table key={job._id} className="table table-bordered ">

           <thead>
             <tr>
            <th>Building num</th>
            <th>Apartment num</th>
            <th>Vendor</th>
            <th>End Date</th>
          </tr>
           </thead>
           <tbody>
           <tr>
             <td>{job.workorder.buildingNumber}</td>
             <td>{job.workorder.apartmentNumber}</td>
             <td>{(job.vendor) ?  job.vendor.firstName +" " + job.vendor.lastName : "not selected"}</td>
             <td>{(job.assignmentDate === null) ?  "not assigned" : job.assignmentDate.substring(0, 19)} </td>
           </tr>
           <tr className="table-border-bottom">
             <th>Room: <span className="font-weight-normal"> {job.room} </span></th>
             <th>Name: <span className="font-weight-normal"> {job.name} </span></th>
             <th>Price: <span className="font-weight-normal"> {job.price} </span></th>
             <th>Quantity: <span className="font-weight-normal"> {job.quantity} </span></th>
           </tr>
           </tbody>
           </table>

          
         ))}  
       
      
    </>
  );
}
