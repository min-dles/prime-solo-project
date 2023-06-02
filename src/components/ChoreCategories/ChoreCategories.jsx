import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './ChoreCategories.css';

function ChoreCategories() {

	// make a variable with the chore categories to be easily called/mapped:
	const categoriesArray = [
		'Household',
		'Cleaning',
		'Social',
		'Documents',
		'Health',
		'Shopping'
	];

	let { selectedCategory } = useParams();

	return (
		<div className="container chore-categories">

			<h3 className="h3-styling">Chore Categories:</h3>
			{categoriesArray.map(category => {
				return (
					<Link key={category} to={`/user/categories/${category}`}>
						<button
							className="btn-styling"
							disabled={selectedCategory === category}
						>
							{category}
						</button>
					</Link>
				)
			})}
		</div>
	)
}

export default ChoreCategories;