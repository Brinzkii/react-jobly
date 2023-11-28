import React from 'react';

function Home({ companies, jobs }) {
	return (
		<div className="Home">
			<h1>Jobly</h1>
			<h3>{`Our goal is to help you find the right fit, with over ${jobs.length} jobs from ${companies.length} companies we guarantee it!`}</h3>
		</div>
	);
}

export default Home;
