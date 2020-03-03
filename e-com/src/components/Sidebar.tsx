import * as React from 'react';

function Sidebar() {
  return (
    <aside className="aside">
      <p className="aside-title">Kategorije</p>
      <ul className="aside-list">
        <li><a className="aside-link" href="/#">Računala</a></li>
        <li><a className="aside-link" href="/#">Mobiteli</a></li>
        <li><a className="aside-link" href="/#">Računalne komponente</a></li>
        <li><a className="aside-link" href="/#">Laptopi</a></li>
        <li><a className="aside-link" href="/#">Periferija</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;