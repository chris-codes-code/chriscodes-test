<script setup>
	defineProps({
		active: {
			default: false,
			type: Boolean,
		},
	});
</script>

<template>
	<span class="Action">
		<ActionIconLoader
			class="Action__icon"
			:style="active ? '' : 'display: none;'"
		/>

		<span :style="active ? 'visibility: hidden;' : ''">
			<slot />
		</span>
	</span>
</template>

<style>
	.Action {
		position: relative;

		&__icon {
			position: absolute;
			inset: 0;
			margin: auto;
		}
	}
</style>
