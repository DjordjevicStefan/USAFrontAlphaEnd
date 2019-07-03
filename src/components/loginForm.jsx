import React from "react";
import axios from "axios";
import qs from "qs";
import { Redirect, Route } from "react-router-dom";
import logo from "../img/ben-leeds-logo.png";
import Joi from "joi-browser";
import Form from "./common/form";

import Room from "./rooms.jsx";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    response: {},
    schema: {
      email: Joi.string()
        .required()
        .label("Email"),
      password: Joi.string()
        .required()
        .label("Password")
    }
  };

  doSubmit = async () => {
    const { data } = this.state;

    const params = {
      email: data.email,
      password: data.password
    };

    const { data: response } = await axios.post(
      process.env.REACT_APP_API_URL + "/login",
      qs.stringify(params)
    );

    console.log("moj log",response);
    

    localStorage.setItem("workorders", JSON.stringify(response.workorders));
    console.log(response.workorders);

    if (response === "no email" || response === "bad password") {
      const errors = { ...this.state.errors };
      if (response === "no email") {
        errors.username = "No email found";
      } else {
        errors.password = "Wrong password";
      }

      this.setState({ errors });
    } else {
      if (response === "admin") {
        localStorage.setItem("admin", JSON.stringify(data));
        this.props.history.push(`./admin`);
      } else {
        const user = response.user._id;
        const workorder = {
          workorder: {
            loginTime: Date(Date.now()),
            completedTime: "",
            apartmentNumber: "",
            sendTime: "",
            userId: user,
            buildingNumber: ""
          },
          jobs: {},
          user: response.user
        };
        localStorage.setItem("workorder", JSON.stringify(workorder));
        const { state } = this.props.location;
        this.props.history.push(`./rooms/${response.user.region}`);

        // window.location = state
        //   ? state.from.pathname
        //   : `./rooms/${response.region}`;
      }
    }

    // {
    //   "email": "johndoe@gmail.com",
    //     "password": "11"
    // }
    // console.log(data.username, data.password);
    // console.log(data);

    // (email : {data.username}, password : {data.password} )

    // const response = await axios.post("http://localhost:3100/login", (
    //   email: `${data.username}`,
    //   password: `${data.password}`
    // ));
  };

  render() {
    // if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="row">
        <div className="col-5 mx-auto m-5  text-center login">
          <div className="m-5">
            <img src={logo} alt="Ben Leeds Logo" />
          </div>
          <h1 className="p-3">Login</h1>
          <form
            className="col-8 offset-2 text-center"
            onSubmit={this.handleSubmit}
          >
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
