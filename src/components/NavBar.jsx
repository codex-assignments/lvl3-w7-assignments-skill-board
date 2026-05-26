import React from 'react'
import { Link } from 'react-router'

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link className="navbar-logo" to="/">
        🚀 Skill Board
      </Link>
      <div className="navbar-links">
      <Link to="/">Board View</Link>
      <Link to="/manage">
        Manage List
      </Link>
      </div>
    </nav>
  );
}
