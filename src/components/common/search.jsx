import React from "react";

export default function SearchBox({ onOptionChange, options,  value, onChange }) {
  return (
    <div className="container">
      <div className="ml-auto offset-9 col-3 reset-right-padding">
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <select onChange={onOptionChange} className="form-control form-control-sm">
               {options.map((optionX , index) => <option key={index}>{optionX}</option> )}
            </select>
          </div>

          <input
            type="text"
            name="query"
            placeholder="Search.."
            value={value}
            onChange={e => onChange(e.target.value)}
            className="form-control form-control-sm"
          />
        </div>
      </div>
    </div>
  );
}
