import React, { Component } from "react";
import AdminNavbar from "./common/adminNavbar";
import { getAllVendors, deleteVendor } from "../services/vendor";
import { toast, ToastContainer } from "react-toastify";
import TableName from "./common/tableName";
import { Link } from "react-router-dom";



class Vendors extends Component {
  state = {
    vendors: null,
    load: false
  };

  async componentDidMount() {
    const response = await getAllVendors();
    if (response.data.error) {
      toast.error("Database error!");
      return;
    }

    const vendors = response.data;
    this.setState(() => ({
      vendors: vendors,
      load: true
    }));
  }

  hadnleDeleteVendor = async (vendorX) => {
    const vendorsCopy = {...this.state.vendors} ;

    let yesNo = window.confirm(`Are you sure you wont to delete ${vendorX.firstName} ${vendorX.lastName} ?`)
     
    if (yesNo === true) {
      let vendors = this.state.vendors.filter(vendor => vendor._id !== vendorX._id);
      this.setState({vendors : vendors}) ;
    } else {
         return ;
    }
    const response  = await deleteVendor(vendorX._id);

    if (response.data.error) {
          toast.error(response.data.error);
          this.setState({vendors : vendorsCopy}) ;
      }
  }

  handleBack = () => {
    this.props.history.push("/admin");
  };

  newVendorRoute = () => {
    this.props.history.push("/admin/vendor/new");
  };

  render() {
    const { vendors } = this.state;

    if (this.state.load === false) {
      return (
        <div>
          <AdminNavbar pageName="Vendors" />
          <TableName tablename="Loading...." />
          <ToastContainer />
        </div>
      );
    }

    return (
      <div>
        <ToastContainer />
        <AdminNavbar pageName="Vendors" />
        <div className="container">
        <TableName tablename="List of vendors" />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Select</th>
                <th scope="col">Name</th>
                <th scope="col">Profession</th>
                <th scope="col">Delete vendor</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length === 0 ? (
                <tr>
                  <td className="mt-3" colSpan="3">
                    <p className="h6">
                      There are no vendors at this moment, please add one or
                      more
                    </p>
                  </td>
                </tr>
              ) : null}
              {vendors.map(vendor => (
                <tr key={vendor._id}>
                  <td>
                    <Link
                      to={`/admin/vendor/${vendor._id}`}
                      className="mdc-button btn-sm btn"
                    >
                      Select
                    </Link>
                  </td>
                  <td>{vendor.firstName + " " + vendor.lastName}</td>
                  <td>{vendor.profession}</td>
                  <td>
                    <button
                      onClick={() => this.hadnleDeleteVendor(vendor)}
                      className="btn-sm btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">
                  <div
                    onClick={() => this.handleBack()}
                    className="btn-table-end"
                  >
                    Back
                  </div>
                </td>
                <td colSpan="2">
                  <div
                    onClick={() => {
                      this.newVendorRoute();
                    }}
                    className="btn-table-end"
                  >
                    Add new
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Vendors;
