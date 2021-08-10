import styles from './Input.module.css';

const Input = (props) => {
	const onValueChange = (e) => {
		props.onChange(e.target.value);
	};
	return (
		<div className={styles.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input
				{...props.input}
				value={props.value}
				onChange={onValueChange}
			/>
		</div>
	);
};

export default Input;
