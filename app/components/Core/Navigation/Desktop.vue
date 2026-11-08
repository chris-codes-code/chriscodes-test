<script setup>
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
		class="CoreNavigationDesktop"
	>
		<ul class="CoreNavigationDesktop__links">
			<li
				v-for="link in links"
				:key="`desktop-navigation-link-${link.url}`"
			>
				<PrimitiveLink
					v-bind="link"
					class="CoreNavigationDesktop__link"
					:active="route.path === link.url"
				>
					<StyleUILink :text="link.text" />
				</PrimitiveLink>
			</li>
		</ul>
	</nav>
</template>

<style>
	.CoreNavigationDesktop {
		&__links {
			display: flex;
			align-items: center;
			margin: -10px;
		}

		&__link {
			display: block;
			padding: 10px;
		}
	}
</style>
