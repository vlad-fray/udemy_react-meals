import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useState } from 'react';

const checkIsValid = (value) => {
	return !(value.trim().length === 0 || +value < 1 || +value > 5);
};

const MealItemForm = (props) => {
	const [inputText, setInputText] = useState('1');
	const [isValidInput, setIsValidInput] = useState(true);

	const changeInputTextHandler = (value) => {
		setInputText(value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!checkIsValid(inputText)) {
			setIsValidInput(false);
			return;
		}
		setIsValidInput(true);
		setInputText('1');
		props.onAddToCart(+inputText);
	};

	return (
		<form onSubmit={submitHandler} className={styles.form}>
			<Input
				label='Amount'
				onChange={changeInputTextHandler}
				value={inputText}
				isValid={isValidInput}
				input={{
					id: props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
				}}
			/>
			<button>+ Add</button>
			{!isValidInput && <p>Please, write a correct value</p>}
		</form>
	);
};

export default MealItemForm;
