import React, { Component } from "react";
// import { connect } from "react-redux";
// import { compose } from "redux";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase"

class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e => {
        e.preventDefault();

        const { firebase } = this.props;
        const { email, password } = this.state;

        firebase.login({
            email,
            password
        }).catch(err => alert("Invalid Login Cresdentials"))
    };

    render() {
        return (
            <div className="row mt-4">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-primary">
                                    <i class="bi bi-file-lock-fill"></i>
                                    Login
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passsword">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Login"
                                    className="btn btn-primary btn-block mt-2 form-control" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login);