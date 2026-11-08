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
	<input
		:id="id"
		:aria-hidden="input.honeypot || null"
		:autocomplete="input.autocomplete || 'on'"
		class="FormInput__input"
		:disabled="disabled || input.disabled"
		:hidden="input.hidden"
		:name="input.name"
		:placeholder="input.placeholder"
		:tabindex="input.tabindex ?? undefined"
		:type="input.type"
		:value="input.value"
		@input="updateInput"
	/>
</template>
