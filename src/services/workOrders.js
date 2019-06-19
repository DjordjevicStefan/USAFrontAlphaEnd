import http from "./httpService" ;
import qs from "qs"

  

export default function  getAllWorkorders(){
    return http.get("http://localhost:3500/admin")
}

export function getWorkOrder(workOrderId){
  return http.get(`http://localhost:3500/admin/workorders/${workOrderId}`);
} 

export function assignJob(jobId, job, vendor, workorder){

  console.log( "jobid as" , jobId);
  console.log( "wo as" , workorder);
  console.log( "job as" , job);
  console.log( "jvendor as" , vendor);

  
    // jq.post(`http://localhost:3500/admin/assignJob/${jobId}`, 
    // {   
    //   job : {
    //      id : job._id ,
    //      status : "sent" ,
    //      name : job.name ,
    //      subCategory : job.subCategory ,  
    //      room : job.room ,
    //      price : job.price ,  
    //      quantity : job.quantity ,
    //      comment : job.comment,
    //      workorderId : job.workorderId,
    //      vendorId : job.vendorId,
    //      assignmentDate : job.assignmentDate     
    //   },
    //   vendor : {
    //      id : vendor._id ,
    //      firstName : vendor.firstName,
    //      lastName : vendor.lastName,
    //      email : vendor.email ,
    //      profession : vendor.profession, 
    //    },
    //   workorder : {
    //     id : workorder._id ,
    //     status : workorder.status,
    //     buildingNumber : workorder.buildingNumber,
    //     apartmentNumber : workorder.apartmentNumber
    //   } 

    // }
     
    // ,
    // function(data, status){
    //   console.log(data);
      
    //   return data;
    // });
 
  


  return http.post(`http://localhost:3500/admin/assignJob/${jobId}` ,
  JSON.stringify({   
      job : {
         id : job._id ,
         status : "sent" ,
         name : job.name ,
         subCategory : job.subCategory ,  
         room : job.room ,
         price : job.price ,  
         quantity : job.quantity ,
         comment : job.comment,
         workorderId : job.workorderId,
         vendorId : job.vendorId,
         assignmentDate : Date(job.assignmentDate)     
      },
      vendor : {
         id : vendor._id ,
         firstName : vendor.firstName,
         lastName : vendor.lastName,
         email : vendor.email ,
         profession : vendor.profession, 
       },
      workorder : {
        id : workorder._id ,
        status : workorder.status,
        buildingNumber : workorder.buildingNumber,
        apartmentNumber : workorder.apartmentNumber
      } 

    })
   
  )}


