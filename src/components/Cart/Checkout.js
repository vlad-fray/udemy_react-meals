import { useRef, useState } from 'react';
import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const nameInput = nameInputRef.current.value;
		const streetInput = streetInputRef.current.value;
		const postalInput = postalInputRef.current.value;
		const cityInput = cityInputRef.current.value;

		const nameInputIsValid = !isEmpty(nameInput);
		const streetInputIsValid = !isEmpty(streetInput);
		const postalInputIsValid = isFiveChars(postalInput);
		const cityInputIsValid = !isEmpty(cityInput);

		setFormInputsValidity({
			name: nameInputIsValid,
			street: streetInputIsValid,
			city: cityInputIsValid,
			postalCode: postalInputIsValid,
		});

		const formIsValid =
			nameInputIsValid &&
			streetInputIsValid &&
			postalInputIsValid &&
			cityInputIsValid;

		if (!formIsValid) return;

		props.onSubmit({
			name: nameInput,
			street: streetInput,
			city: cityInput,
			postalCode: postalInput,
		});
	};

	const nameControlStyles = `${styles.control} ${
		formInputsValidity.name ? '' : styles.invalid
	}`;
	const streetControlStyles = `${styles.control} ${
		formInputsValidity.street ? '' : styles.invalid
	}`;
	const postalControlStyles = `${styles.control} ${
		formInputsValidity.postalCode ? '' : styles.invalid
	}`;
	const cityControlStyles = `${styles.control} ${
		formInputsValidity.city ? '' : styles.invalid
	}`;

	return (
		<form className={styles.form} onSubmit={confirmHandler}>
			<div className={nameControlStyles}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef} />
				{!formInputsValidity.name && (
					<p>Please, enter a valid name</p>
				)}
			</div>
			<div className={streetControlStyles}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef} />
				{!formInputsValidity.street && (
					<p>Please, enter a valid street</p>
				)}
			</div>
			<div className={postalControlStyles}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalInputRef} />
				{!formInputsValidity.postalCode && (
					<p>Please, enter a valid postal code</p>
				)}
			</div>
			<div className={cityControlStyles}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityInputRef} />
				{!formInputsValidity.city && (
					<p>Please, enter a valid city</p>
				)}
			</div>
			<div className={styles.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={styles.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
