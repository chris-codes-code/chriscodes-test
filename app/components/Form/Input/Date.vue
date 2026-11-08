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
		:autocomplete="input.autocomplete || 'off'"
		class="FormInput__input"
		:disabled="disabled || input.disabled"
		:hidden="input.hidden"
		:max="input.max"
		:min="input.min"
		:name="input.name"
		type="date"
		:value="input.value"
		@input="updateInput"
	/>

	<SVGIcon
		class="FormInput__input-icon"
		icon="calendar"
		override-size
	/>
</template>

<style>
	.FormInput {
		input[type='date'].FormInput__input {
			cursor: pointer;
			padding-right: 40px;

			&::-webkit-calendar-picker-indicator {
				position: absolute;
				right: 0;
				top: 0;
				opacity: 0;
				cursor: pointer;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
