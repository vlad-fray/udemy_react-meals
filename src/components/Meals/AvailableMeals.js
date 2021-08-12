import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const DUMMY_MEALS = [
	{
		id: 'm1',
		name: 'Sushi',
		description: 'Finest fish and veggies',
		price: 22.99,
	},
	{
		id: 'm2',
		name: 'Schnitzel',
		description: 'A german specialty!',
		price: 16.5,
	},
	{
		id: 'm3',
		name: 'Barbecue Burger',
		description: 'American, raw, meaty',
		price: 12.99,
	},
	{
		id: 'm4',
		name: 'Green Bowl',
		description: 'Healthy...and green...',
		price: 18.99,
	},
];

const AvailableMeals = () => {
	const mealsList = DUMMY_MEALS.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			price={meal.price}
			description={meal.description}
		/>
	));
	return (
		<section className={styles.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;

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
