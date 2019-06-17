import http from "./httpService" ;
import qs from "qs"

export function getRooms() {
  return http.get(`http://localhost:3500/admin/newItem`)
}

export function getItemsFromRoom(name) {
  return http.get(`http://localhost:3500/admin/rooms/${name}`)
}

export function saveNewItem(item) {
  return http.post("http://localhost:3500/admin/newItem" , qs.stringify({
      name : item.name ,
      subCategory : item.subCategory,
      room : item.room ,
      price : item.price
  }) ) ;
}

export function deleteItem(itemId){
  return http.post(`http://localhost:3500/admin/items/${itemId}`)
}

export function editItem(item) {
  return http.post(`http://localhost:3500/admin/editItem/${item._id}` , qs.stringify({
      name : item.name ,
      subCategory : item.subCategory,
      room : item.room ,
      price : item.price
  }) ) ;
}





