import React, { Component } from "react";
import Input from "../common/input";


class UserForm extends Component {
  // state = {};
   render() {
    const {
      firstName,
      onChange,
      onBack,
      lastName,
      region,
      password,
      email,
      onSubmit,
      emailPassword,
      error,
      id,
        
    } = this.props;

   

    return (
      <div>
        <div className="form-container">
          <div>
         
            <form onSubmit={onSubmit} className="form-css" >
              <Input  
                error={error.firstName}
                label="First name"
                name="firstName"
                value={firstName}
                onChange={onChange}
              />
               <Input
                error={error.lastName}
                label="Last name"
                name="lastName"
                value={lastName}
                onChange={onChange}
              />
               <Input
               error={error.password}
                label="Password"
                name="password"
                value={password}
                onChange={onChange}
                type="password"
              />
               <Input
                error={error.email}
                label="Email"
                name="email"
                value={email}
                onChange={onChange}
              />
              <Input
                error={error.emailPassword}
                label="Email Password"
                name="emailPassword"
                value={emailPassword}
                onChange={onChange}
              />
               <Input
                error={error.region}
                label="Region"
                name="region"
                value={region}
                onChange={onChange}
                
              />


              <div className="row">
              <div className="col-6">
                <button type="button" onClick={onBack} className="btn-form-submit">
                  Back
                </button>
              </div>
              <div className="col-6">
                <button className="btn-form-submit">{(id==="") ? "Add new user" : "Edit user" }</button>
              </div>
            </div>
            </form>
           
           
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;
