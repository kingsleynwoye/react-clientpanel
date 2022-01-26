import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../Layout/Spinner";
import classnames from "classnames";

class ClientDetail extends Component {
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: ""
    };
    // Update balance
    balanceSubmit = e => {
        e.preventDefault();

        const { clients, firestore } = this.props;
        const { balanceUpdateAmount } = this.state;

        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        }

        // Update in firestore
        firestore.update({ collection: "clients", doc: clients.id }, clientUpdate)
    }

    // Delete clients
    onDeleteClick = () => {
        const { clients, firestore } = this.props

        firestore.delete({ collection: "clients", doc: clients.id })
    }


    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { clients } = this.props;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;

        let balanceForm = "";
        // If balance form should display
        if (showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.balanceSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            name="balanceUpdateAmount"
                            placeholder="Add New Balance"
                            value={balanceUpdateAmount}
                            onChange={this.onChange}
                        />
                        <div className="input-group-append">
                            <input type="submit" value="Update" className="btn btn-outline-dark" />
                        </div>
                    </div>
                </form>
            )
        } else {
            balanceForm = null;
        }

        if (clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6 ">
                            <Link to="/" className="btn btn-link">
                                <i className="fa fa-arrow-circle-left"></i>
                                Back to Dashboard
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <Link to={`/client/edit/${clients.id}`} className="btn btn-dark mt-2">
                                    Edit
                                </Link>
                                <Link to="/" className="btn btn-link btn-lg">
                                    <button
                                        onClick={this.onDeleteClick}
                                        className="btn btn-danger mt-2">
                                        Delete
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card">
                        <h3 className="card-header">
                            {clients.firstName} {clients.lastName}
                        </h3>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-10">
                                    <h4 className="d-flex flex-row bd-highlight">Client ID:   <span className="text-secondary">
                                        {clients.id}</span></h4>
                                </div>
                                <div className="text-lead">
                                    <h3 className="d-flex flex-row-reverse bd-highlight mb-5">
                                        <span className={classnames({
                                            'text-danger': clients.balance > 0,
                                            'text-success': clients.balance === 0
                                        })}>${parseFloat(clients.balance).toFixed(2)}
                                            <small>
                                                <a href="#!" onClick={() => this.setState({
                                                    showBalanceUpdate:
                                                        !this.state.showBalanceUpdate
                                                })}>
                                                    <i class="bi bi-pencil-fill"></i>
                                                </a>
                                            </small>
                                        </span>
                                        Balance:
                                    </h3>
                                    {balanceForm}
                                </div>
                            </div>
                            <hr />
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Contact Email: {clients.email}
                                </li>
                                <li className="list-group-item">
                                    Contact Phone: {clients.phone}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Spinner />
        }
    }
}

ClientDetail.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'clients', doc: props.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        clients: ordered.clients && ordered.clients[0]
    }))
)(ClientDetail);
