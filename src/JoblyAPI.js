import axios from 'axios';

const BASE_API_URL = 'http://localhost:3001';

class JoblyAPI {
	static async getCompanies() {
		try {
			const result = await axios.get(`${BASE_API_URL}/companies`);
			console.log(`Companies: ${result.data}`);
			return result.data.companies;
		} catch (err) {
			console.error(err);
		}
	}

	static async getJobs() {
		try {
			const result = await axios.get(`${BASE_API_URL}/jobs`);
			console.log(`Jobs: ${result.data}`);
			return result.data.jobs;
		} catch (err) {
			console.error(err);
		}
	}
}

export default JoblyAPI;
