<script setup>
	defineProps({
		title: {
			required: true,
			type: String,
		},
	});
</script>

<template>
	<div class="DeveloperStyleGuideSection">
		<BlockContainer>
			<h2 class="DeveloperStyleGuideSection__title">{{ title }}</h2>

			<hr class="DeveloperStyleGuideSection__divider" />
		</BlockContainer>

		<div class="DeveloperStyleGuideSection__content">
			<slot />
		</div>
	</div>
</template>

<style>
	.DeveloperStyleGuideSection {
		overflow: hidden;

		+ .DeveloperStyleGuideSection {
			margin-top: var(--space-xxl);
		}

		&__divider {
			margin: var(--space-lg) 0;
			border: none;
			border-top: 1px solid rgba(var(--color-black-rgb), 0.1);
		}
	}
</style>
