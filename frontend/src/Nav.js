import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Nav.css';

function Nav({ user, logoutUser }) {
	return (
		<nav className="Navbar">
			<NavLink to="/" className="Navbar-brand">
				Jobly
			</NavLink>
			<div className="Navbar-links-container">
				<NavLink to="/companies" className="Navbar-link">
					Companies
				</NavLink>
				<NavLink to="/jobs" className="Navbar-link">
					Jobs
				</NavLink>
				{!localStorage.token ? (
					<>
						<NavLink to="/login" className="Navbar-link">
							Log In
						</NavLink>
						<NavLink to="/register" className="Navbar-link">
							Sign Up
						</NavLink>
					</>
				) : (
					<>
						<NavLink to="/profile" className="Navbar-link">
							{localStorage.username}
						</NavLink>
						<Link onClick={logoutUser} className="Navbar-link">
							Log Out
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default Nav;
