import { useContext, useState } from 'react';
import styles from './Cart.module.css';
import CartContext from './../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
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
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			'https://react-fetch-e6fb1-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
			{
				method: 'POST',
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.madeOrder();
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

	const cartModalContent = (
		<>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout
					onSubmit={submitOrderHandler}
					onCancel={props.onClose}
				/>
			)}
			{!isCheckout && modalActions}
		</>
	);

	const isSubmittingModalContent = <p>Sending oreder data...</p>;
	const didSubmitModalContent = (
		<>
			<p>Successfully sent the order!</p>
			<div className={styles.actions}>
				<button onClick={props.onClose} className={styles.button}>
					Close
				</button>
			</div>
		</>
	);

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
