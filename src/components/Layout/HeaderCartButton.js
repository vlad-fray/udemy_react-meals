import { useContext } from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from './../Cart/CartIcon';
import CartContext from './../../store/cart-context';

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);
	console.log(cartCtx);
	const cartItemsAmount = cartCtx.items.reduce(
		(acc, item) => acc + item.amount,
		0
	);
	return (
		<button className={styles.button} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>{cartItemsAmount}</span>
		</button>
	);
};

export default HeaderCartButton;
