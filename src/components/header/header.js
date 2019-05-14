import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3 className="header__title title">
        <a className="title__href" href="#">
          Star DB
        </a>
      </h3>
      <ul className="d-flex">
        <li className="header__item item">
          <a className="item__href" href="#">People</a>
        </li>
        <li className="header__item item">
          <a className="item__href" href="#">Planets</a>
        </li>
        <li className="header__item item">
          <a className="item__href" href="#">Starships</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;