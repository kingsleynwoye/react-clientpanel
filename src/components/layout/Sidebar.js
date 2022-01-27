import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <table className="table table-striped">
        <thead className="thead-inverse">
          <Link to="/client/add" className="btn btn-success btn-block mt-4">
            <i class="bi bi-plus"></i> New
          </Link>
        </thead>
      </table>
    </div>
  );
};
