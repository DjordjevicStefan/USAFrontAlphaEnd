import http from "./httpService";
import qs from "qs";

export function getAllVendors() {
  return http.get("http://localhost:3500/admin/vendors");
}

export function getVendor(vendorId) {
  return http.get(`http://localhost:3500/admin/vendors/${vendorId}`);
}

export function deleteVendor(vendor) {
  return http.post(
    `http://localhost:3500/admin/editVendor/${vendor._id}`,
    qs.stringify({
      email: vendor.email,
      name: vendor.name,
      phone : vendor.phone, 
      profession: vendor.profession,
      status : "disabled"
    })
  );


}

export function saveVendor(vendor) {
  // console.log(vendor);

  if (vendor._id === "") {
    // console.log("ovde sam");
    
    return http.post(
      `http://localhost:3500/admin/newVendor`,
      qs.stringify({
        email: vendor.email,
        name: vendor.name,
        phone : vendor.phone, 
        profession: vendor.profession
      })
    );
  }

  return http.post(
    `http://localhost:3500/admin/editVendor/${vendor._id}`,
    qs.stringify({
      email: vendor.email,
      name: vendor.name,
      phone : vendor.phone, 
      profession: vendor.profession
    })
  );
}
