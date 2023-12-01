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
import PrivateRoutes from './PrivateRoutes';
import './App.css';

function App() {
	const [companies, setCompanies] = useState([]);
	const [jobs, setJobs] = useState([]);
	const [user, setUser] = useState(undefined);
	const updateUser = ({ username, token, applications }) => {
		if (username) localStorage.setItem('username', username);
		if (token) localStorage.setItem('token', token);
		if (applications) localStorage.setItem('applications', JSON.stringify(applications));
		setUser({
			username,
			token,
		});
	};
	const logoutUser = () => {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		localStorage.setItem('applications', JSON.stringify([]));
		setUser(undefined);
	};
	useEffect(() => {
		async function getData() {
			let companies = await JoblyAPI.getCompanies();
			setCompanies(companies);

			let jobs = await JoblyAPI.getJobs();
			setJobs(jobs);

			if (localStorage.token) {
				let user = await JoblyAPI.getUserDetails(localStorage.username);
				updateUser({
					username: localStorage.username,
					token: localStorage.token,
					applications: user.applications,
				});
			}
		}
		getData();
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<Nav user={user} logoutUser={logoutUser} />
				<Routes>
					{/* Home */}
					<Route path="/" element={<Home companies={companies} jobs={jobs} />} />

					{/* Register New User */}
					<Route path="/register" element={<RegisterForm updateUser={updateUser} />} />

					{/* Login User */}
					<Route path="/login" element={<LoginForm updateUser={updateUser} />} />

					{/* Protected Routes - Must Be Logged In */}
					<Route element={<PrivateRoutes />}>
						{/* View/Edit User Details */}
						<Route path="/profile" element={<Profile />} />

						{/* View All Companies */}
						<Route path="/companies" element={<List companies={companies} />} />

						{/* View Company Details */}
						<Route path="/companies/:handle" element={<CompanyDetails updateUser={updateUser} />} />

						{/* View All Jobs */}
						<Route path="/jobs" element={<List updateUser={updateUser} jobs={jobs} />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
