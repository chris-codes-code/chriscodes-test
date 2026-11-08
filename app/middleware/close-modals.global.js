import { useModal } from '~/composables/useModal';

export default defineNuxtRouteMiddleware(() => {
	const { closeAll } = useModal();
	closeAll();
});
