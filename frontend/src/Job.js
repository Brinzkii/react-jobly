import React from 'react';
import JoblyAPI from './JoblyAPI';
import uuid from 'react-uuid';
import './Job.css';

function Job({ job, updateUser }) {
	let applications = JSON.parse(localStorage.applications);
	const apply = async () => {
		try {
			await JoblyAPI.apply(localStorage.username, job.id);
			applications.push(job.id);
			updateUser({
				applications,
			});
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="Job" key={uuid()}>
			<h2 className="Job-title">{job.title}</h2>
			{job.companyName !== undefined ? <h3 className="Job-company">{job.companyName}</h3> : <></>}
			<div className="Job-details-container">
				<h4 className="Job-detail">Salary: {job.salary || 'Negotiable based upon qualifications'}</h4>
				<h4 className="Job-detail">Equity: {job.equity || 'N/A'}</h4>
			</div>
			{applications && applications.includes(job.id) !== false ? (
				<button disabled className="Job-apply-button-disabled">
					Applied
				</button>
			) : (
				<button onClick={apply} className="Job-apply-button">
					APPLY
				</button>
			)}
		</div>
	);
}

export default Job;
