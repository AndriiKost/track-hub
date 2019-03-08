import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    const privateNavigation = (
      <ul id="nav-mobile" class="right ">
              <li>
                <Link
                  to="/dashboard"
                  className="black-text">
                  {/* <i className="material-icons">code</i> */}
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/track-hub"
                  className="black-text">
                  {/* <i className="material-icons">code</i> */}
                  Hub
                </Link>
              </li>
            </ul>
    )

    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/track-hub"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo left black-text">
              <i className="material-icons">code</i>
              Track Hub
            </Link>
            {this.props.auth.isAuthenticated ? privateNavigation : null}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
      auth: state.auth
   };
};

export default connect(mapStateToProps)(Navbar);