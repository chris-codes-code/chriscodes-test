const THEME_COOKIE = 'theme';
const THEMES = ['light', 'dark'];

export function useTheme() {
	const theme = useCookie(THEME_COOKIE, {
		default: () => 'light',
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
