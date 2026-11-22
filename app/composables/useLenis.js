export const useLenis = () => {
	const { $lenis } = useNuxtApp();

	return $lenis ?? null;
};
