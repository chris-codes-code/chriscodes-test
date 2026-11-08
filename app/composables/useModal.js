export function useModal() {
	const isMenuOpen = useState('modal-menu', () => false);

	const setMenuOpen = (value) => {
		isMenuOpen.value = value;
	};

	const closeAll = () => {
		setMenuOpen(false);
	};

	return {
		closeAll,
		isMenuOpen,
		setMenuOpen,
	};
}
