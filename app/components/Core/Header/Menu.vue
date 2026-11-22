<script setup>
	import { isNavLinkActive } from '~/utils/is-nav-link-active';

	const route = useRoute();

	defineProps({
		links: {
			default: null,
			type: Array,
		},
	});
</script>

<template>
	<nav
		v-if="links"
		class="CoreHeaderMenu"
	>
		<ul class="CoreHeaderMenu__links">
			<li
				v-for="link in links"
				:key="link.url"
			>
				<PrimitiveLink
					v-bind="link"
					class="CoreHeaderMenu__link"
					:active="isNavLinkActive(link, route)"
				>
					<StyleUIButtonIcon text>
						{{ link.text }}
					</StyleUIButtonIcon>
				</PrimitiveLink>
			</li>
		</ul>
	</nav>
</template>

<style>
	.CoreHeaderMenu {
		display: flex;
		justify-content: center;

		&__links {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--space-xs);
		}

		&__link {
			display: flex;
		}
	}
</style>
