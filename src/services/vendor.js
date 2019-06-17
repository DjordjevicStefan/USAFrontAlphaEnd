import http from "./httpService" ;
import qs from "qs"


export function getAllVendors() {
  return http.get("http://localhost:3500/admin/vendors")
}

export function getVendor(vendorId) {
  return http.get(`http://localhost:3500/admin/vendors/${vendorId}`)
}

export function deleteVendor(vendorId) { 
  
  return http.post(`http://localhost:3500/admin/vendors/${vendorId}` ) ;

}

export function saveVendor(vendor) {
  if (vendor._id === "") {
    
    return http.post(`http://localhost:3500/admin/newVendor`, qs.stringify({
    email: vendor.email, 
    firstName: vendor.firstName,
    lastName: vendor.lastName,
    profession: vendor.profession
})) ;
  } 
  return http.post(`http://localhost:3500/admin/editVendor/${vendor._id}`, qs.stringify({
    email: vendor.email, 
    firstName: vendor.firstName,
    lastName: vendor.lastName,
    profession: vendor.profession
  })) ;
 
}