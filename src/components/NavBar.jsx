import React from 'react'
import { Link } from 'react-router'

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Skill Board</Link>
      <Link to="/manage">Edit List</Link>
    </nav>
  );
}
