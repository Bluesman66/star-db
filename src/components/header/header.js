/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = ({ onServiceChange }) => {
  return (
    <div className="header d-flex">
      <h3 className="header__title title">
        <Link className="title__href" to="/">
          Star DB
        </Link>
      </h3>
      <ul className="d-flex">
        <li className="header__item item">
          <Link to="/people">People</Link>
        </li>
        <li className="header__item item">
          <Link to="/planets">Planets</Link>
        </li>
        <li className="header__item item">
          <Link to="/starships">Starships</Link>
        </li>
      </ul>
      <button onClick={onServiceChange} className="btn btn-primary btn-sm header__button">
        Change Service
      </button>
    </div>
  );
};

export default Header;