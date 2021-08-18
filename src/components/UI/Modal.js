import styles from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
	return (
		<div className={styles.backdrop} onClick={props.onClose}></div>
	);
};

const ModalOverlay = (props) => {
	return <div className={styles.modal}>{props.children}</div>;
};

const portalEl = document.getElementById('root-overlay');

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} />,
				portalEl
			)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalEl
			)}
		</>
	);
};

export default Modal;
