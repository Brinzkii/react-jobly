import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JoblyAPI from './JoblyAPI';
import Nav from './Nav';
import Home from './Home';
import List from './List';
import './App.css';

function App() {
	const [companies, setCompanies] = useState([]);
	const [jobs, setJobs] = useState([]);
	const [user, setUser] = useState(undefined);
	useEffect(() => {
		async function getData() {
			let companies = await JoblyAPI.getCompanies();
			setCompanies(companies);

			let jobs = await JoblyAPI.getJobs();
			setJobs(jobs);
		}
		getData();
	}, []);
	return (
		<div className="App">
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" element={<Home companies={companies} jobs={jobs} />} />
					<Route path="/companies" element={<List companies={companies} />} />
					<Route path="/jobs" element={<List jobs={jobs} />} />
					<Route path="/profile/:username" element={null} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
