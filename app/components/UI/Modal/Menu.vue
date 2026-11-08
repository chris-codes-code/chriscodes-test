<script setup>
	const { isMenuOpen, setMenuOpen } = useModal();
	const route = useRoute();

	defineProps({
		links: {
			default: null,
			type: Array,
		},
	});
</script>

<template>
	<ModalSlideOut
		class="UIModalMenu"
		:is-open="isMenuOpen"
		@close-modal="setMenuOpen(false)"
	>
		<template #main>
			<nav
				v-if="links"
				class="UIModalMenu__navigation"
			>
				<ul class="UIModalMenu__links">
					<li
						v-for="(link, index) in links"
						:key="`ui-modal-menu-link-${index}`"
					>
						<PrimitiveLink
							v-bind="link"
							class="UIModalMenu__link"
							:active="route.path === link.url"
							:disabled="route.path === link.url"
						>
							<StyleUILink :text="link.text" />
						</PrimitiveLink>
					</li>
				</ul>
			</nav>
		</template>
	</ModalSlideOut>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.UIModalMenu {
		--modal-menu-link-space: var(--space-md);

		&__navigation {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
		}

		&__links {
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		&__link {
			display: block;
			width: 100%;
			padding: var(--modal-menu-link-space);
		}
	}
</style>
