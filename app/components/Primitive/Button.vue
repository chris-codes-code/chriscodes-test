<script setup>
	const { trackClick } = useGtm();

	const props = defineProps({
		active: {
			default: false,
			type: Boolean,
		},
		disabled: {
			default: false,
			type: Boolean,
		},
		gtm: {
			default: null,
			type: Object,
		},
		label: {
			default: null,
			type: String,
		},
		type: {
			default: 'button',
			type: String,
			validator: (value) => ['button', 'reset', 'submit'].includes(value),
		},
	});

	const emit = defineEmits(['click']);

	const onClick = (event) => {
		if (props.disabled) return;
		emit('click', event);
		if (props.gtm) trackClick(props.gtm);
	};
</script>

<template>
	<button
		:aria-label="label"
		class="PrimitiveButton"
		:data-active="active || null"
		:disabled="disabled || null"
		:type="type"
		@click="onClick"
	>
		<slot />
	</button>
</template>

<style>
	.PrimitiveButton {
		cursor: pointer;

		&:disabled {
			cursor: default;
			pointer-events: none;
		}
	}
</style>
