import React, { useState, useEffect } from 'react';
import JoblyAPI from './JoblyAPI';
import './Forms.css';

function Profile() {
	const INITIAL_DATA = {
		username: localStorage.username,
		firstName: '',
		lastName: '',
		email: '',
	};
	const [formData, setFormData] = useState(INITIAL_DATA);
	useEffect(() => {
		async function getDetails() {
			let res = await JoblyAPI.getUserDetails(localStorage.username);
			setFormData({ ...res });
		}
		getDetails();
	}, []);
	const handleChange = (evt) => {
		let { name, value } = evt.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const res = await JoblyAPI.updateUserDetails(formData);
			setFormData({ ...res });
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="ProfileForm" onSubmit={handleSubmit}>
			<h1 className="ProfileForm-title">Edit User Details</h1>
			<label htmlFor="username" className="ProfileForm-label">
				Username:
			</label>
			<input
				name="username"
				onChange={handleChange}
				value={formData.username}
				disabled
				className="ProfileForm-input-disabled"
			/>

			<label htmlFor="firstName" className="ProfileForm-label">
				First Name:
			</label>
			<input name="firstName" onChange={handleChange} value={formData.firstName} className="ProfileForm-input" />

			<label htmlFor="lastName" className="ProfileForm-label">
				Last Name:
			</label>
			<input name="lastName" onChange={handleChange} value={formData.lastName} className="ProfileForm-input" />

			<label htmlFor="email" className="ProfileForm-label">
				Email:
			</label>
			<input
				name="email"
				type="email"
				onChange={handleChange}
				value={formData.email}
				className="ProfileForm-input"
			/>

			<button className="ProfileForm-button">Save Changes</button>
		</form>
	);
}

export default Profile;
