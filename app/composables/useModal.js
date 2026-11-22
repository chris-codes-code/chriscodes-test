export function useModal() {
	const headerPanel = useState('header-panel', () => null);

	const isHeaderPanelOpen = computed(() => Boolean(headerPanel.value));
	const isMenuOpen = computed(() => headerPanel.value === 'menu');
	const isContactOpen = computed(() => headerPanel.value === 'contact');

	const setHeaderPanel = (value) => {
		headerPanel.value = value;
	};

	const openMenu = () => setHeaderPanel('menu');
	const openContact = () => setHeaderPanel('contact');

	const setMenuOpen = (value) => {
		setHeaderPanel(value ? 'menu' : null);
	};

	const setContactOpen = (value) => {
		setHeaderPanel(value ? 'contact' : null);
	};

	const toggleMenu = () => {
		setHeaderPanel(headerPanel.value === 'menu' ? null : 'menu');
	};

	const toggleContact = () => {
		setHeaderPanel(headerPanel.value === 'contact' ? null : 'contact');
	};

	const closeAll = () => {
		setHeaderPanel(null);
	};

	return {
		closeAll,
		headerPanel,
		isContactOpen,
		isHeaderPanelOpen,
		isMenuOpen,
		openContact,
		openMenu,
		setContactOpen,
		setHeaderPanel,
		setMenuOpen,
		toggleContact,
		toggleMenu,
	};
}
