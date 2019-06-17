import React from "react";

import { Link } from "react-router-dom";

import _ from "lodash";
import "../css/room.css";

const room = props => (
  <div className="col-4">
    <div className="card mb-3 text-center">
      <Link to={"/rooms/" + props.id + "/" + props.region}>
        <img
          className="card-img-top img-fluid"
          src={props.image}
          alt="Card image cap"
        />
        <div className="card-footer text-center">{props.name}</div>
      </Link>
    </div>
  </div>
);
export default room;
