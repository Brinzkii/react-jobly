import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ companies, jobs }) {
	return (
		<div className="Home">
			<h2 className="Home-message">{`At Jobly, our goal is to help you find the right fit. With over ${jobs.length} jobs from ${companies.length} companies we guarantee it!`}</h2>
			{!localStorage.token ? (
				<>
					<Link to="/login" className="Home-login-link">
						<button className="Home-login-button">Login</button>
					</Link>
					<Link to="/register" className="Home-register-link">
						<button className="Home-register-button">Sign Up</button>
					</Link>
				</>
			) : (
				<></>
			)}
		</div>
	);
}

export default Home;
