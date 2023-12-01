import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyAPI from './JoblyAPI';
import List from './List';
import './List.css';
import './CompanyDetails.css';

function CompanyDetails() {
	const [company, setCompany] = useState(undefined);
	let { handle } = useParams();

	useEffect(() => {
		async function getDetails(handle) {
			let company = await JoblyAPI.getCompany(handle);
			setCompany(company);
		}
		getDetails(handle);
	}, [handle]);
	if (company === undefined) {
		return <div>Loading....</div>;
	} else {
		return (
			<div className="CompanyDetails">
				<h2 className="CompanyDetails-name">{company.name}</h2>
				<h4 className="CompanyDetails-description">{company.description}</h4>
				<List jobs={company.jobs} />
			</div>
		);
	}
}

export default CompanyDetails;
