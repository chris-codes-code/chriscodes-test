const THEME_COOKIE = 'theme';
const THEMES = ['light', 'dark'];

const getDefaultTheme = () => {
	// const hour = new Date().getHours();
	// return hour >= 18 || hour < 6 ? 'dark' : 'light';
	return 'dark';
};

export function useTheme() {
	const theme = useCookie(THEME_COOKIE, {
		default: getDefaultTheme,
		maxAge: 60 * 60 * 24 * 365,
		path: '/',
		sameSite: 'lax',
		secure: !import.meta.dev,
	});

	if (!THEMES.includes(theme.value)) theme.value = 'light';

	const toggleTheme = () => {
		theme.value = theme.value === 'dark' ? 'light' : 'dark';
	};

	return {
		theme,
		toggleTheme,
	};
}
