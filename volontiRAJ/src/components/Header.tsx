import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserRole } from './UserRoleContext';
import '../styles/header.css';

const Navigation: React.FC = () => {
  const { role, toggleRole } = useUserRole();

  return (
    <nav className="navigationBar">
      <ul className="navigationLinks">
        <li>
          <NavLink to="/">Početna</NavLink>
        </li>
        <li>
          <NavLink to="/aktivnosti">Aktivnosti</NavLink>
        </li>
        <li>
          <NavLink to="/volonteri">Volonteri</NavLink>
        </li>
        <li>
          <NavLink to="/udruge">Udruge</NavLink>
        </li>
        <li className="adminCheckbox">
          <label>
            <input type="checkbox" checked={role === 'admin'} onChange={toggleRole} />
            <span className="adminLabel">{role === 'admin' ? 'Admin' : 'Korisnik'}</span>
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
