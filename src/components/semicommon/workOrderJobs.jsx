import React from "react";
import DatePicker from "react-datepicker";

export default function WorkOrderJobs(props) {
  const { jobs, onDateChange, onVendorChange , vendors, handleId, onOk } = props;

  return (
    <>
      {jobs.map(job => (
        <table key={job._id} className="table table-bordered table-border-bottom">
          <thead>
            <tr>
              <th>
                Name:  <span className="font-weight-normal">{job.name}</span>{" "}
              </th>
              <th>
                Room:  <span className="font-weight-normal">{job.room}</span>{" "}
              </th>
              <th>
                Price:  <span className="font-weight-normal">{job.price} &#36; </span>{" "}
              </th>
              <th>
                quantity:  <span className="font-weight-normal">{job.quantity}</span>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th >
                User comment:  <span className="font-weight-normal">{job.comment}</span>
              </th>
              <th >
                Subcategory:  <span className="font-weight-normal">{job.subCategory}</span>{" "}
              </th>
            </tr>

            <tr>
              <th id={job._id}>
                Select vendor:
                <select  onChange={onVendorChange} className="form-control form-control-sm">
                  <option value="">Select vendor</option>
                  {vendors.map(vendor=> (
                    <option value={vendor._id} key={vendor._id}> {`${vendor.firstName + " " + vendor.lastName}`} { `Profession: ${vendor.profession}`   } </option>
                  ))}
                </select>
              </th>
              <th>
                Pick end date:
                <div onClick={() => handleId(job._id)} className="btn-dsp-block">
                  
                  <DatePicker
                    selected = {job.assignmentDate}
                    placeholderText="Click to select a date"
                    onChange={onDateChange}
                    className="form-control form-control-sm"
                  />
                </div>
              </th>
              <th>
                Status:   {(job.status==="sent") ? <p className="green-status font-weight-bold">{job.status}</p> : <p>{job.status}</p> }  
              </th>
              <th className="th-text-align">
                Confirm:
                <span className="">
                  
                  <button type="button" onClick={(e) => onOk(e, job._id)} className="btn btn-sm mdc-button btn-dsp-block">
                    Ok
                  </button>
                </span>
              </th>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
}
