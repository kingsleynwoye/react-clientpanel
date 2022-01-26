import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";

class AppNavbar extends Component {
    state = {
        isAuthenticated: false
    }

    static getDerivedStateFromProps(props, state) {
        const { auth } = props;

        if (auth.uid) {
            return { isAuthenticated: true }
        } else {
            return { isAuthenticated: false }
        }
    }

    onLogoutClick = e => {
        e.preventDefault();

        const { firebase } = this.props;

        firebase.logout();
    }

    render() {
        const { isAuthenticated } = this.state;
        const { auth } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="#">ClientPanel</Link>
                        <button className="navbar-toggler" type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {isAuthenticated ? (
                                    <li className="nav-item">
                                        <Link className="nav-link active"
                                            aria-current="page" to="/">Dashboard</Link>
                                    </li>
                                ) : null}
                            </ul>
                            {isAuthenticated ? (
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a href="#!" className="nav-link">
                                            {auth.email}
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#!" className="nav-link"
                                            onClick={this.onLogoutClick}>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            ) : null}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}


AppNavbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(AppNavbar)