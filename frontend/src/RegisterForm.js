import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoblyAPI from './JoblyAPI';

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
			JoblyAPI.token = token;
			updateUser({ username: formData.username, token });
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="RegisterForm" onSubmit={handleSubmit}>
			<label htmlFor="username">Username:</label>
			<input name="username" onChange={handleChange} />

			<label htmlFor="password">Password:</label>
			<input name="password" type="password" onChange={handleChange} />

			<label htmlFor="firstName">First Name:</label>
			<input name="firstName" onChange={handleChange} />

			<label htmlFor="lastName">Last Name:</label>
			<input name="lastName" onChange={handleChange} />

			<label htmlFor="email">Email:</label>
			<input name="email" type="email" onChange={handleChange} />

			<button>Register</button>
		</form>
	);
}

export default RegisterForm;
