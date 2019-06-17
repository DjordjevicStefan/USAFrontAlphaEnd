import React, { Component } from 'react';

const TableName = (props) => {
  return ( <div className="container">
       <div className="table-name">
          <p>{props.tablename}</p>
       </div>
  </div> );
}
 
export default TableName;