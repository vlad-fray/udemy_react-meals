import { useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [fetchError, setFetchError] = useState(null);

	useEffect(() => {
		const fetchMeals = async () => {
			const res = await fetch(
				'https://react-fetch-e6fb1-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
			);
			if (!res.ok) {
				throw new Error('Fetching data is failed');
			}
			const data = await res.json();
			if (!data) return;

			const loadedMeals = [];

			for (const key in data) {
				loadedMeals.push({
					id: key,
					price: data[key].price,
					description: data[key].description,
					name: data[key].name,
				});
			}
			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch((err) => {
			setIsLoading(false);
			setFetchError(err.message);
		});
	}, []);

	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			price={meal.price}
			description={meal.description}
		/>
	));
	return (
		<>
			{!isLoading && !fetchError && (
				<section className={styles.meals}>
					<Card>
						<ul>{mealsList}</ul>
					</Card>
				</section>
			)}
			{isLoading && (
				<section className={styles.mealsLoading}>
					<p>Loading...</p>
				</section>
			)}
			{fetchError && (
				<section className={styles.mealsError}>
					<p>{fetchError}</p>
				</section>
			)}
		</>
	);
};

export default AvailableMeals;

// const DUMMY_MEALS = [
// 	{
// 		id: 'm1',
// 		name: 'Sushi',
// 		description: 'Finest fish and veggies',
// 		price: 22.99,
// 	},
// 	{
// 		id: 'm2',
// 		name: 'Schnitzel',
// 		description: 'A german specialty!',
// 		price: 16.5,
// 	},
// 	{
// 		id: 'm3',
// 		name: 'Barbecue Burger',
// 		description: 'American, raw, meaty',
// 		price: 12.99,
// 	},
// 	{
// 		id: 'm4',
// 		name: 'Green Bowl',
// 		description: 'Healthy...and green...',
// 		price: 18.99,
// 	},
// ];
// async function fetchMealsHandler() {
// 	let data = null;
// 	try {
// 		const res = await fetch(
// 			'https://react-fetch-e6fb1-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
// 		);
// 		console.log(res);
// 		// if (!res.ok) throw new Error('Unvalid fetching data');
// 		data = await res.json();
// 		return data;
// 	} catch (err) {
// 		console.error(err);
// 	}
// }

// async function addMealHandler(meal) {
// 	try {
// 		const check = await fetchMealsHandler();
// 		console.log(check);
// 		if (check) return;

// 		const res = await fetch(
// 			'https://react-fetch-e6fb1-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
// 			{
// 				method: 'POST',
// 				body: JSON.stringify(meal),
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			}
// 		);
// 		if (!res.ok) throw new Error('wow');
// 		const data = await res.json();
// 		console.log(data);
// 	} catch (err) {
// 		console.error(err);
// 	}
// }

// addMealHandler({
// 	id: 'm1',
// 	name: 'Sushi',
// 	description: 'Finest fish and veggies',
// 	price: 22.99,
// });
