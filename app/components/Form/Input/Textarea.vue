<script setup>
	defineProps({
		disabled: {
			default: false,
			type: Boolean,
		},
		id: {
			required: true,
			type: String,
		},
		input: {
			required: true,
			type: Object,
		},
	});

	const emit = defineEmits(['update']);

	const updateInput = (event) => {
		emit('update', event.target.value);
	};
</script>

<template>
	<textarea
		:id="id"
		:autocomplete="input.autocomplete || 'on'"
		class="FormInput__input"
		:disabled="disabled || input.disabled"
		:hidden="input.hidden"
		:name="input.name"
		:placeholder="input.placeholder"
		:value="input.value"
		@input="updateInput"
	/>
</template>

<style>
	.FormInput {
		textarea.FormInput__input {
			display: block;
			min-height: 10rem;
		}
	}
</style>
