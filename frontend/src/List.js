import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import Company from './Company';
import Job from './Job';
import './List.css';

function List({ companies, jobs, updateUser }) {
	return (
		<div className="List-container">
			<ul className="List">
				{companies === undefined
					? jobs.map((j) => (
							<li className="List-item" key={uuid()}>
								<Job job={j} updateUser={updateUser} />
							</li>
					  ))
					: companies.map((c) => (
							<Link to={`/companies/${c.handle}`} className="List-link">
								<li className="List-item" key={uuid()}>
									<Company company={c} />
								</li>
							</Link>
					  ))}
			</ul>
		</div>
	);
}

export default List;
