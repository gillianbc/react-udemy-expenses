// Stateless functional component
import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <p><NavLink to="/" exact={true} activeClassName="isactive">HOME</NavLink></p>
    <p><NavLink to="/create" activeClassName="isactive">CREATE</NavLink></p>
    <p><NavLink to="/edit" activeClassName="isactive">EDIT</NavLink></p>
    <p><NavLink to="/help" activeClassName="isactive">HELP</NavLink></p>
  </header>
)

export default Header