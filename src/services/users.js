// import getAllWorkorders from "./workOrders";
import http from "./httpService" ;
import qs from "qs"


// const allWorkOrders = getAllWorkorders();

// const users = [
//   {
//     userId: 1,
//     firstName: "dj bog",
//     lastName: "kralj",
//     mail: "dj@gmail.com",
//     password: "12345",
//     region: "California",
//     workOrderIds: [2, 3]
//   },
//   {
//     userId: 2,
//     firstName: "Jao",
//     lastName: "Pakao",
//     mail: "ghdgd@gmail.com",
//     password: "123456789",
//     region: "Denver",
//     workOrderIds: [1, 4]
//   }
// ];

// export function getUserWorkOrders(userId) {
//   let userObj = users.find(e => {
//     return e.userId === userId;
//   });

//   let workOrderList = [];

//   userObj.workOrderIds.forEach(element => {
//     let workOrder = allWorkOrders.filter(order => {
//       return order.id === element;
//     });

//     workOrderList.push(workOrder[0]);
//   });

//   return workOrderList;
// }

export function getUser(id) {
  return http.get(`http://localhost:3500/admin/users/${id}`)
}

export function saveUser(user) {
  if (user._id === "") {
    
    return http.post(`http://localhost:3500/admin/newUser`, qs.stringify({
    email: user.email,
    password: user.password,
    emailPassword: user.emailPassword,
    firstName: user.firstName,
    lastName: user.lastName,
    region: user.region
})) ;
  } 
  return http.post(`http://localhost:3500/admin/editUser/${user._id}`, qs.stringify({
      email: user.email,
      password: user.password,
      emailPassword: user.emailPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      region: user.region
  })) ;
 
}

export function deleteUser(userId) { 
  
  return http.post(`http://localhost:3500/admin/users/${userId}` ) ;

}

export default function getAllUsers() {
  return http.get("http://localhost:3500/admin/users")
}
