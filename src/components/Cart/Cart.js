import { useContext, useState } from 'react';
import styles from './Cart.module.css';
import CartContext from './../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
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
		setIsCheckout(true);
		// cartCtx.makeOrder();
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

	const modalActions = (
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
	);

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && <Checkout onClose={props.onClose} />}
			{!isCheckout && modalActions}
		</Modal>
	);
};

export default Cart;
