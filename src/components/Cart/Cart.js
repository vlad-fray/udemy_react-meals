import { useContext } from 'react';
import styles from './Cart.module.css';
import CartContext from './../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHanlder = (item) => {
		const cartItem = { ...item, amount: 1 };
		cartCtx.addItem(cartItem);
	};

	const orderingHandler = () => {
		cartCtx.makeOrder();
	};

	const cartItems = (
		<ul className={styles['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					price={item.price}
					amount={item.amount}
					onAdd={() => cartItemAddHanlder(item)}
					onRemove={() => cartItemRemoveHandler(item.id)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button
					onClick={props.onClose}
					className={styles['button--alt']}
				>
					Close
				</button>
				{hasItems && (
					<button onClick={orderingHandler} className={styles.button}>
						Order
					</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;
