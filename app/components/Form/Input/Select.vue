<script setup>
	const props = defineProps({
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

	const firstOptionValue = computed(() => props.input.options?.[0]?.value ?? '');

	const selectValue = computed(() => props.input.value || firstOptionValue.value || '');

	const updateInput = (event) => {
		emit('update', event.target.value);
	};

	onMounted(() => {
		if (!props.input.value && firstOptionValue.value) {
			emit('update', firstOptionValue.value);
		}
	});
</script>

<template>
	<select
		:id="id"
		autocomplete="off"
		class="FormInput__input"
		:disabled="disabled || input.disabled"
		:hidden="input.hidden"
		:name="input.name"
		:value="selectValue"
		@change="updateInput"
	>
		<option
			v-for="(option, index) in input.options"
			:key="`${id}-option-${index}`"
			:disabled="option.disabled"
			:value="option.value"
		>
			{{ option.label }}
		</option>
	</select>

	<SVGIcon
		class="FormInput__input-icon"
		icon="chevron"
	/>
</template>

<style>
	.FormInput {
		select.FormInput__input {
			appearance: none;
			cursor: pointer;
			padding-right: 40px;
		}
	}
</style>
