import axios from 'axios';

const BASE_API_URL = 'http://localhost:3001';

class JoblyAPI {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this ishow you pass it in the header.
		//this has been provided to show you another way to pass the token.you are only expected to read this code for this project.
		const url = `${BASE_API_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${localStorage.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	/** Register user */

	static async register({ username, password, firstName, lastName, email }) {
		let res = await this.request(`auth/register`, { username, password, firstName, lastName, email }, 'post');
		return res.token;
	}

	/** Login user */

	static async login({ username, password }) {
		let res = await this.request(`auth/token`, { username, password }, 'post');
		return res.token;
	}

	/** Get user details */

	static async getUserDetails(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	/** Update user details */

	static async updateUserDetails({ username, firstName, lastName, email }) {
		let res = await this.request(`users/${username}`, { firstName, lastName, email }, 'patch');
		return res.user;
	}

	/** Get list of all companies */

	static async getCompanies() {
		let res = await this.request(`companies`);
		return res.companies;
	}

	/** Get list of all jobs */

	static async getJobs() {
		const res = await this.request(`jobs`);
		return res.jobs;
	}

	/** Get details on a company by handle. */

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	/** Apply for a job */

	static async apply(username, jobId) {
		let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
		return res.applied;
	}
}

// JoblyAPI.token =
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
// 	'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
// 	'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default JoblyAPI;
