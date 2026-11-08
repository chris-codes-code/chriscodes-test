<script setup>
	defineProps({
		text: {
			required: true,
			type: String,
		},
	});
</script>

<template>
	<span class="StyleUILink type-ui">{{ text }}</span>
</template>

<style>
	.StyleUILink {
		position: relative;
		display: inline-block;

		&::after {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			bottom: 0;
			height: 1px;
			width: 100%;
			background: currentColor;
			opacity: 0;
		}

		a:focus-visible &,
		a:active &,
		a[data-active='true'] &,
		button:focus-visible &,
		button[data-active='true'] & {
			&::after {
				opacity: 1;
			}
		}

		@media (hover: hover) and (pointer: fine) {
			a:hover &,
			button:hover & {
				&::after {
					opacity: 1;
				}
			}
		}
	}
</style>
