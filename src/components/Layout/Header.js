import React from 'react';
import styles from './Header.module.css';
import mealsImg from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
	return (
		<>
			<header className={styles.header}>
				<h1>ReactMeal</h1>
				<HeaderCartButton />
			</header>
			<div className={styles['main-image']}>
				<img src={mealsImg} alt='A table full of delicious food' />
			</div>
		</>
	);
};

export default Header;
