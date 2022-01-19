import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types"
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../Layout/Spinner";

class Clients extends Component {
    state = {
        totalOwed: null
    }

    static getDerivedStateFromProps(props, state) {
        const { clients } = props

        if (clients) {
            // Add the balance
            const total = clients.reduce((total, client) => {
                return total + parseFloat(client.balance.toString());
            }, 0);
            return { totalOwed: total }
        }
        return null;
    }
    render() {
        const { clients } = this.props;
        const { totalOwed } = this.state;

        if (clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-10">
                            {/* <table className="table table-striped">
                                <thead className="thead-inverse">
                                    <tr>
                                        <th>
                                            <h2>
                                                <i className="bi bi-people-fill"></i>Clients</h2>
                                        </th>
                                    </tr>
                                </thead>
                            </table> */}
                            <table className="table table-striped">
                                <thead className="thead-inverse">
                                    <tr>
                                        <th>
                                            <h2>
                                                <i className="bi bi-people-fill"></i>Clients</h2>
                                        </th>
                                        <th className="h2">
                                            Total Owed{""}
                                            <span className="text-primary h2">
                                                ${parseFloat(totalOwed).toFixed(2)}
                                            </span> </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <table className="table table-striped">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Balance</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map(client => (
                                    <tr key={client.id}>
                                        <td>{client.firstName} {client.lastName}</td>
                                        <td>{client.email}</td>
                                        <td>${parseFloat(client.balance).toFixed(2)}</td>
                                        <td>
                                            <Link to={`/clients/${client.id}`} className="btn btn-secondary btn-sm">
                                                <i className="bi bi-arrow-right-circle"></i> Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            return <Spinner />
        }
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}

export default compose(
    firestoreConnect([{ collection: "clients" }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);