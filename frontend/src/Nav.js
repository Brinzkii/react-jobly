import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Nav({ user, logoutUser }) {
	useEffect(() => {}, [user]);
	return (
		<nav className="NavBar">
			<NavLink to="/">Jobly</NavLink>
			<NavLink to="/companies">Companies</NavLink>
			<NavLink to="/jobs">Jobs</NavLink>
			{!user ? (
				<>
					<NavLink to="/login">Log In</NavLink>
					<NavLink to="/register">Sign Up</NavLink>
				</>
			) : (
				<>
					<NavLink to="/profile">{user.username}</NavLink>
					<NavLink onClick={logoutUser}>Log Out</NavLink>
				</>
			)}
		</nav>
	);
}

export default Nav;
