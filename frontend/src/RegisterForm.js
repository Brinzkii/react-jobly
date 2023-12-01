import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoblyAPI from './JoblyAPI';
import './Forms.css';

function RegisterForm({ updateUser }) {
	const INITIAL_DATA = {
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		email: '',
	};
	const [formData, setFormData] = useState(INITIAL_DATA);
	const navigate = useNavigate();
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
			const token = await JoblyAPI.register(formData);
			updateUser({ username: formData.username, token });
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="RegisterForm" onSubmit={handleSubmit}>
			<h1 className="RegisterForm-title">Sign Up</h1>
			<label htmlFor="username" className="RegisterForm-label">
				Username:
			</label>
			<input name="username" onChange={handleChange} className="RegisterForm-input" />

			<label htmlFor="password" className="RegisterForm-label">
				Password:
			</label>
			<input name="password" type="password" onChange={handleChange} className="RegisterForm-input" />

			<label htmlFor="firstName" className="RegisterForm-label">
				First Name:
			</label>
			<input name="firstName" onChange={handleChange} className="RegisterForm-input" />

			<label htmlFor="lastName" className="RegisterForm-label">
				Last Name:
			</label>
			<input name="lastName" onChange={handleChange} className="RegisterForm-input" />

			<label htmlFor="email" className="RegisterForm-label">
				Email:
			</label>
			<input name="email" type="email" onChange={handleChange} className="RegisterForm-input" />

			<button className="RegisterForm-button">Register</button>
		</form>
	);
}

export default RegisterForm;
