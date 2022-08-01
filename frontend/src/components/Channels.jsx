import React from 'react';
import { PlusSquare } from 'react-bootstrap-icons';

const Channels = () => {
  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        <li className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
            <span className="me-1">#</span>
              general
          </button>
        </li>
        <li className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn">
            <span className="me-1">#</span>
              random
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Channels;
