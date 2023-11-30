import React from 'react';
import { Link } from 'react-router-dom';
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
							<Link to={`/companies/${c.handle}`}>
								<li className="List-item">
									<Company company={c} />
								</li>
							</Link>
					  ))}
			</ul>
		</div>
	);
}

export default List;
