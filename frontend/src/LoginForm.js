import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoblyAPI from './JoblyAPI';

function LoginForm({ updateUser }) {
	const INITIAL_DATA = {
		username: '',
		password: '',
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
			const token = await JoblyAPI.login(formData);
			JoblyAPI.token = token;
			updateUser({ username: formData.username, token });
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="LoginForm" onSubmit={handleSubmit}>
			<label htmlFor="username">Username:</label>
			<input name="username" onChange={handleChange} />

			<label htmlFor="password">Password:</label>
			<input name="password" type="password" onChange={handleChange} />

			<button>Login</button>
		</form>
	);
}

export default LoginForm;
