import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
	return (
		<nav className="NavBar">
			<NavLink to="/">Jobly</NavLink>
			<NavLink to="/companies">Companies</NavLink>
			<NavLink to="/jobs">Jobs</NavLink>
			<NavLink>Profile</NavLink>
			<NavLink>Log Out</NavLink>
		</nav>
	);
}

export default Nav;
