// import React,{useState, useEffect}from 'react';
// import { connect } from 'react-redux';
// import { Alert as AlertBox, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import {removeAlert} from '../../actions/alertActions'
// const Alert = ({ alert, removeAlert }) => {
//     let status ;
//     const [modal, setModal] = useState(status);
//     const toggle = () => {setModal(!modal);}

//     useEffect(() => {
//         status = (alert !== null)
//         setModal(status)
//     } ,[alert])

//     const closeBtn = (
//         <button className="close" onClick={toggle}>
//           &times;
//         </button>
//       );

//     return(
//     alert !== null &&
//         <Modal isOpen={modal} toggle={toggle} size="lg" centered onClosed={removeAlert}>
//             <ModalHeader
//             close={closeBtn}
//             className="border-0 pb-0"
//             cssModule={{ "modal-title": "w-100 text-center pt-5" }}
//             >
//             <p className="org-h3">alert</p>
//             </ModalHeader>
//             <ModalBody>
//             <div>
//                 <AlertBox  color={alert.alertType}>
//                     {alert.msg}
//                 </AlertBox>
//             </div>
//             </ModalBody>
//         </Modal>
    
//   )
// }
// const mapStateToProps = state => ({
//   alert: state.alert
// });

// export default connect(mapStateToProps,{removeAlert})(Alert);
