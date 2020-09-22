// import React from "react";
// import { Link } from "react-router-dom";
// import { logout } from "../actions/authActions";
// import { connect } from "react-redux";

// const Home = (props) => {
//   const { auth, logout } = props;

//   console.log(auth);
//   return (
//     <div className="bg fullscreen">
//       <h1>Home Page</h1>
//       <div>
//         <div>
//           <a href="/login" className="btn btn-primary">
//             Login Page
//           </a>
//         </div>
//         <div>
//           <a href="/organizer/login" className="btn btn-primary">
//             OrganizerLogin Page
//           </a>
//         </div>
//         <div>
//           <Link to="/room" className="btn btn-primary">
//             Go to Room
//           </Link>
//         </div>
//         <div>
//           <Link to="/organizer/room" className="btn btn-primary">
//             Go to OrganizerRoom
//           </Link>
//         </div>
//         <div>
//           <button onClick={logout}>logout</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { logout })(Home);
