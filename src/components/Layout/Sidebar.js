import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div>
            <Link to="/clients/add" className="btn btn-success btn-block ">
                <i className="bi bi-plus "></i>  New
            </Link>
        </div>
    )
}

export default Sidebar;