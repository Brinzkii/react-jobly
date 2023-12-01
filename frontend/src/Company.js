import React from 'react';
import './Company.css';

function Company({ company }) {
	return (
		<div className="Company">
			<h2 className="Company-name">{company.name}</h2>
			<h3 className="Company-description">{company.description}</h3>
		</div>
	);
}

export default Company;
