import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD-ITEM':
			const isInCart = state.items.some(
				(item) => item.id === action.item.id
			);

			let items = null;
			if (isInCart) {
				items = state.items.map((item) => {
					if (item.id === action.item.id)
						return {
							...item,
							amount: item.amount + action.item.amount,
						};
					return item;
				});
			} else {
				items = [...state.items, action.item];
			}

			return {
				totalAmount:
					state.totalAmount + action.item.price * action.item.amount,
				items,
			};
		case 'REMOVE-ITEM':
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.id),
			};
		default:
			return state;
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: 'ADD-ITEM', item: item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE-ITEMS', id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
