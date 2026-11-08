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

	const updateInput = (event, optionValue = null) => {
		if (props.input.options?.length) {
			const selectedValues = Array.isArray(props.input.value) ? [...props.input.value] : [];

			emit(
				'update',
				event.target.checked
					? [...selectedValues, optionValue]
					: selectedValues.filter((selectedValue) => selectedValue !== optionValue),
			);
			return;
		}

		emit('update', event.target.checked);
	};
</script>

<template>
	<label
		v-for="(option, index) in input.options"
		:key="`${id}-option-${index}`"
		class="FormInput__checkbox"
		:for="`${id}-option-${index}`"
	>
		<input
			:id="`${id}-option-${index}`"
			class="FormInput__checkbox-input"
			:checked="Array.isArray(input.value) && input.value.includes(option.value)"
			:disabled="disabled || input.disabled || option.disabled"
			:name="input.name"
			type="checkbox"
			:value="option.value"
			@change="updateInput($event, option.value)"
		/>

		<span
			aria-hidden="true"
			class="FormInput__checkbox-box"
		/>

		<span class="FormInput__checkbox-text">{{ option.label }}</span>
	</label>

	<label
		v-if="!input.options?.length"
		class="FormInput__checkbox"
		:for="id"
	>
		<input
			:id="id"
			class="FormInput__checkbox-input"
			:checked="Boolean(input.value)"
			:disabled="disabled || input.disabled"
			:hidden="input.hidden"
			:name="input.name"
			type="checkbox"
			@change="updateInput"
		/>

		<span
			aria-hidden="true"
			class="FormInput__checkbox-box"
		/>
	</label>
</template>

<style>
	.FormInput {
		&__checkbox {
			display: inline-flex;
			align-items: center;
			gap: var(--space-sm);
			cursor: pointer;
			color: currentColor;

			&:has(.FormInput__checkbox-input:disabled) {
				cursor: not-allowed;
			}
		}

		&__checkbox-input {
			position: absolute;
			opacity: 0;
			width: 1px;
			height: 1px;
			margin: 0;
			pointer-events: none;

			&:checked + .FormInput__checkbox-box {
				&::after {
					opacity: 1;
					transform: translate(-50%, -60%) rotate(45deg) scale(1);
				}
			}

			&:focus + .FormInput__checkbox-box,
			&:focus-visible + .FormInput__checkbox-box {
				border-color: var(--form-input-border-color-focus);

				&::before {
					opacity: 1;
				}
			}
		}

		&__checkbox-box {
			position: relative;
			flex-shrink: 0;
			width: 1.25rem;
			height: 1.25rem;
			background-color: transparent;
			border: 1px solid var(--form-input-border-color);
			transition: border-color var(--transition-fast-ease);

			&::before {
				content: '';
				position: absolute;
				inset: 0;
				pointer-events: none;
				box-shadow: var(--form-input-box-shadow-focus);
				opacity: 0;
				transition: opacity var(--transition-fast-ease);
			}

			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				width: 0.3rem;
				height: 0.55rem;
				border: solid currentColor;
				border-width: 0 1.5px 1.5px 0;
				opacity: 0;
				transform: translate(-50%, -60%) rotate(45deg) scale(0.8);
				transition:
					opacity var(--transition-fast-ease),
					transform var(--transition-fast-ease);
			}
		}

		&__checkbox-text {
			user-select: none;
		}
	}
</style>
