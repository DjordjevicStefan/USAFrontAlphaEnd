import React, { Component } from "react";
import {Link} from "react-router-dom"

import { Modal } from "react-bootstrap";

import './modal.css';

class ModalMy extends Component {
  state = {};
  render() {

    const {onShowModal,isOpen,onClose,user, workOrders} = this.props ;
    const firstName = user.firstName ;  
    const lastName = user.lastName ;    

    console.log(workOrders);
     


    return (
      <div>
         <div className="showWoBtn">
            <button onClick={onShowModal} className="mdc-button btn-sm btn">
                  Show all work orders
            </button>
         </div>
        <Modal  show={isOpen} onHide={onClose}>
          <Modal.Header className="mHeader" closeButton>
            <Modal.Title>{firstName+" "+lastName +" work orders"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{
             <>
                {workOrders.map(order => 
                <div className="row">
                  <div className="col-sm-4"> <Link to={`/admin/workorder/${order._id}`}>
                  Open workorder  </Link> </div>
                  <div className="col-sm-4">Building num : {order.buildingNumber}</div>
                  <div className="col-sm-4">Workorder send time: {order.sendTime.substring(0, 19)}</div>
                </div> )}   
             </>   
              }
            </Modal.Body>
          <Modal.Footer>
            
            <button className="btn mdc-button" onClick={onClose}>
              Go back
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalMy;
