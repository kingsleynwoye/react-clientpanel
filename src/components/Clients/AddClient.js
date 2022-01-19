import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddClient extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i class="bi bi-arrow-left-circle-fill"></i> Back to Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Add Client</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddClient;