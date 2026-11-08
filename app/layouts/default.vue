<script setup>
	import { lockBodyScroll, unlockBodyScroll } from '~/assets/animations/utils/body-scroll-lock';

	const { navigation, notification } = await useSiteContent();
	const isDev = import.meta.dev;
	const { theme } = useTheme();
	const { isMenuOpen, setMenuOpen } = useModal();

	useHead(() => ({
		bodyAttrs: {
			'data-theme': theme.value,
		},
	}));

	const headerRef = ref(null);

	const { isSticky } = useCoreHeader(headerRef);

	const headerClass = computed(() => ({
		'Layout__header--sticky': isSticky.value,
	}));

	const layoutClass = computed(() => ({
		'Layout--menu-open': isMenuOpen.value,
	}));

	watch(isMenuOpen, (isOpen) => {
		if (!import.meta.client) return;

		if (isOpen) lockBodyScroll();
		else unlockBodyScroll();
	});

	onBeforeUnmount(() => {
		if (isMenuOpen.value) unlockBodyScroll();
	});
</script>

<template>
	<div
		class="Layout"
		:class="layoutClass"
		:style="{
			'--core-notification-height': notification?.text ? '40px' : '0px',
		}"
	>
		<CoreHeaderNotification
			v-if="notification"
			:link="notification.link"
			:text="notification.text"
		/>

		<div
			ref="headerRef"
			class="Layout__header"
			:class="headerClass"
		>
			<CoreHeader :links="navigation.links" />
		</div>

		<div class="Layout__content">
			<main class="Layout__main">
				<slot />
			</main>

			<div class="Layout__footer">
				<CoreFooter />
			</div>
		</div>

		<CharacterCompanion />

		<div
			class="Layout__menuScrim"
			:class="{ 'Layout__menuScrim--open': isMenuOpen }"
			@click="setMenuOpen(false)"
		/>

		<div
			id="layout-overlay"
			class="Layout__overlay"
		>
			<DeveloperGrid v-if="isDev" />
		</div>

		<CoreCookies />
	</div>
</template>

<style>
	.Layout {
		--core-header-height: 110px;
		--core-total-header-height: calc(var(--core-header-height) + var(--core-notification-height));

		&__header {
			position: relative;
			top: 0;
			z-index: 10;
			pointer-events: none;

			&--sticky {
				position: sticky;
			}

			.Layout--menu-open & {
				z-index: 28;
			}
		}

		&__menuScrim {
			position: fixed;
			z-index: 25;
			inset: 0;
			background-color: rgba(var(--theme-color-primary-rgb), 0.5);
			backdrop-filter: blur(5px);
			-webkit-backdrop-filter: blur(5px);
			transform: translate3d(0, 0, 0);
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
			transition:
				background-color var(--theme-color-ease),
				opacity 0.3s cubic-bezier(0, 0, 0.2, 1),
				visibility 0.3s cubic-bezier(0, 0, 0.2, 1);

			&--open {
				opacity: 1;
				visibility: visible;
				pointer-events: auto;
			}

			@media (prefers-reduced-motion: reduce) {
				transition: none;
			}
		}

		&__content {
			position: relative;
			z-index: 0;
		}

		&__main {
			min-height: 100vh;
		}

		&__overlay {
			position: relative;
			z-index: 30;
		}
	}
</style>
