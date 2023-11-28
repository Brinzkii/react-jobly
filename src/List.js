import React from 'react';
import Company from './Company';
import Job from './Job';

function List({ companies, jobs }) {
	return (
		<div className="List-container">
			<ul className="List">
				{companies === undefined
					? jobs.map((j) => (
							<li className="List-item">
								<Job job={j} />
							</li>
					  ))
					: companies.map((c) => (
							<li className="List-item">
								<Company company={c} />
							</li>
					  ))}
			</ul>
		</div>
	);
}

export default List;
