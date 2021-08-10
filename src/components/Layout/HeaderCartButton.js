import { useContext, useEffect, useState } from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from './../Cart/CartIcon';
import CartContext from './../../store/cart-context';

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const cartItemsAmount = cartCtx.items.reduce(
		(acc, item) => acc + item.amount,
		0
	);

	const btnStyles = `${styles.button} ${
		btnIsHighlighted ? styles.bump : ''
	}`;

	useEffect(() => {
		if (cartCtx.items.length === 0) return;
		setBtnIsHighlighted(true);

		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [cartCtx.items]);

	return (
		<button className={btnStyles} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>{cartItemsAmount}</span>
		</button>
	);
};

export default HeaderCartButton;
