import http from "./httpService" ;

export function getJobs(id) {
  return http.get(`http://localhost:3500/admin/jobs`)
}

export  function  getAllWorkorders(){
  return http.get("http://localhost:3500/admin")
}
