import React from "react";
import { Link } from "react-router";
// import "../App.css";
export default function Navbar() {
  return (
    // <nav className="navbar navbar-expand-md navbar-light bg-light">
    //   <div className="container">
    //     <a className="navbar-brand" href="#">
    //       Movie Box
    //     </a>
    //     <button
    //       className="navbar-toggler d-lg-none"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#collapsibleNavId"
    //       aria-controls="collapsibleNavId"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="collapsibleNavId">
    //       <ul className="navbar-nav me-auto mt-2 mt-lg-0">
    //         <li className="nav-item">
    //           {/* <a className="nav-link active" href="#" aria-current="page"> */}
    //           <Link className="nav-link active" to="/">
    //             Home
    //             <span className="visually-hidden">(current)</span>
    //           </Link>
    //           {/* </a> */}
    //         </li>
    //         <li className="nav-item">
    //           <Link to="/favs">Fav</Link>
    //           {/* <a className="nav-link" href="#">
    //             Link
    //           </a> */}
    //         </li>
    //         <li className="nav-item dropdown">
    //           <a
    //             className="nav-link dropdown-toggle"
    //             href="#"
    //             id="dropdownId"
    //             data-bs-toggle="dropdown"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //           >
    //             Dropdown
    //           </a>
    //           <div className="dropdown-menu" aria-labelledby="dropdownId">
    //             <a className="dropdown-item" href="#">
    //               Action 1
    //             </a>
    //             <a className="dropdown-item" href="#">
    //               Action 2
    //             </a>
    //           </div>
    //         </li>
    //       </ul>
    //       <form className="d-flex my-2 my-lg-0">
    //         <input
    //           className="form-control me-sm-2"
    //           type="text"
    //           placeholder="Search"
    //         />
    //         <button
    //           className="btn btn-outline-success my-2 my-sm-0"
    //           type="submit"
    //         >
    //           Search
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </nav>
    <nav>
      <div className="logo">Music Arena</div>
      <div className="menu-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favs">Favourites</Link>
          </li>
          {/* <li>
            <Link to="/contacts">Contact</Link>
          </li> */}
          <li className="d">
            Other Projects
            <ul className="dropdown-projects">
              <li>
                <Link to="/todo"> Todo App</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
