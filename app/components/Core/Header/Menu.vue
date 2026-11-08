<script setup>
	const route = useRoute();
	const { isMenuOpen, setMenuOpen } = useModal();

	defineProps({
		links: {
			default: null,
			type: Array,
		},
	});

	watch(
		() => route.path,
		() => setMenuOpen(false),
	);
</script>

<template>
	<div
		class="CoreHeaderMenu"
		:class="{ 'CoreHeaderMenu--open': isMenuOpen }"
		:inert="!isMenuOpen"
	>
		<div class="CoreHeaderMenu__background --theme-inverse" />

		<nav
			v-if="links"
			class="CoreHeaderMenu__content"
		>
			<ul class="CoreHeaderMenu__links">
				<li
					v-for="link in links"
					:key="link.url"
				>
					<PrimitiveLink
						v-bind="link"
						class="CoreHeaderMenu__link"
						:active="route.path === link.url"
						:disabled="route.path === link.url"
					>
						<StyleUIButtonIcon text>
							{{ link.text }}
						</StyleUIButtonIcon>
					</PrimitiveLink>
				</li>
			</ul>
		</nav>
	</div>
</template>

<style>
	.CoreHeaderMenu {
		--core-header-menu-ease: var(--transition-ease-out);
		--core-header-menu-spring: var(--transition-spring);

		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		width: 100%;
		pointer-events: none;

		&--open {
			pointer-events: auto;
		}

		&__background {
			position: absolute;
			top: 0;
			left: 50%;
			translate: -50% 0;
			width: calc(100% + 20px);
			height: var(--core-header-container-height);
			opacity: 0;
			scale: 0.96;
			transform-origin: top center;
			border-radius: 20px;
			corner-shape: squircle;
			border: 1px solid color-mix(in srgb, var(--theme-color-primary) 5%, transparent);
			transition:
				height 0.5s var(--core-header-menu-spring),
				scale 0.5s var(--core-header-menu-spring),
				opacity 0.3s var(--core-header-menu-ease),
				top 0.3s var(--core-header-menu-ease),
				var(--theme-transition);
		}

		&--open &__background {
			top: -5px;
			height: calc(100% + 20px);
			opacity: 1;
			scale: 1;
		}

		&__content {
			position: relative;
			z-index: 1;
			display: flex;
			justify-content: center;
			height: fit-content;
			padding: calc(var(--core-header-container-height) + var(--space-sm)) var(--space-sm) var(--space-sm);
			color: var(--theme-color-primary);
			opacity: 0;
			transition: opacity 0.3s var(--core-header-menu-ease);
		}

		&__links {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--space-xs);
		}

		&__link {
			display: flex;
		}

		&--open &__content {
			opacity: 1;
			transition: opacity 0.3s var(--core-header-menu-ease) 0.15s;
		}

		@media (prefers-reduced-motion: reduce) {
			&__background,
			&__content,
			&--open &__content {
				transition: none;
			}
		}
	}
</style>
