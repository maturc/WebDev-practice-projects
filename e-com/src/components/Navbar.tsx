import * as React from 'react';

function Navbar() {
  return (
    <nav className="header__navbar">
      <ul>
        <li><a className="header__navbar-link" href="/#">Kategorije</a></li>
        <li><a className="header__navbar-link" href="/#">O nama</a></li>
        <li><a className="header__navbar-link" href="/#">Dostava</a></li>
        <li><a className="header__navbar-link" href="/#">Plaćanje</a></li>
        <li><a className="header__navbar-link" href="/#">Kontakt</a></li>
      </ul>
    </nav>
  );
}
  
export default Navbar;