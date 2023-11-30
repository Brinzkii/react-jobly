import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JoblyAPI from './JoblyAPI';
import Nav from './Nav';
import Home from './Home';
import List from './List';
import CompanyDetails from './CompanyDetails';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import './App.css';

function App() {
	const [companies, setCompanies] = useState([]);
	const [jobs, setJobs] = useState([]);
	const [user, setUser] = useState(undefined);
	const updateUser = ({ username, token }) => {
		setUser({
			username,
			token,
		});
	};
	const logoutUser = () => {
		setUser(undefined);
		// navigate('/');
	};
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
				<Nav user={user} logoutUser={logoutUser} />
				<Routes>
					<Route path="/" element={<Home companies={companies} jobs={jobs} />} />
					<Route path="/register" element={<RegisterForm updateUser={updateUser} />} />
					<Route path="/login" element={<LoginForm updateUser={updateUser} />} />
					<Route path="/profile" element={<Profile user={user} />} />
					<Route path="/companies" element={<List companies={companies} />} />
					<Route path="/companies/:handle" element={<CompanyDetails />} />
					<Route path="/jobs" element={<List jobs={jobs} />} />
					<Route path="/profile" element={null} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
