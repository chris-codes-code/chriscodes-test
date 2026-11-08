<script setup>
	import FormInputCheckbox from './Checkbox.vue';
	import FormInputConsent from './Consent.vue';
	import FormInputDate from './Date.vue';
	import FormInputSelect from './Select.vue';
	import FormInputText from './Text.vue';
	import FormInputTextarea from './Textarea.vue';

	const props = defineProps({
		disabled: {
			default: false,
			type: Boolean,
		},
		formSubmissionAttempt: {
			default: 0,
			type: Number,
		},
		input: {
			required: true,
			type: Object,
		},
		width: {
			default: 'full',
			type: String,
			validator: (value) => ['full', 'half'].includes(value),
		},
	});

	const id = `form-input-${useId()}`;

	const emit = defineEmits(['input', 'update:input']);

	const updateFormInput = inject('updateFormInput');

	const fieldComponent = computed(() => {
		const { type } = props.input;

		if (type === 'checkbox') return FormInputCheckbox;
		if (type === 'consent') return FormInputConsent;
		if (type === 'date') return FormInputDate;
		if (type === 'select') return FormInputSelect;
		if (type === 'textarea') return FormInputTextarea;

		return FormInputText;
	});

	const isCheckboxGroup = computed(() => props.input.type === 'checkbox' && props.input.options?.length);
	const isConsent = computed(() => props.input.type === 'consent');

	const onUpdate = (value) => {
		emit('input', value);
		updateFormInput(props.input.name, value, { validate: props.formSubmissionAttempt > 0 });
	};
</script>

<template>
	<div
		:class="{
			FormInput: true,
			[`FormInput--width-${input.width}`]: input.width,
			'FormInput--hidden': input.hidden,
		}"
	>
		<component
			:is="isCheckboxGroup || isConsent ? 'span' : 'label'"
			v-if="input.label && !input.honeypot"
			:class="{
				FormInput__label: true,
				[`FormInput__label--${input.type}`]: input.type,
				'type-ui': true,
			}"
			:for="isCheckboxGroup || isConsent ? undefined : id"
		>
			{{ input.label }}

			<transition name="fade-fast">
				<span
					v-if="input.errorMessage"
					class="FormInput__error-message"
				>
					{{ input.errorMessage }}
				</span>
			</transition>
		</component>

		<div
			:class="{
				'FormInput__input-wrapper': true,
				'FormInput__input-wrapper--checkbox': input.type === 'checkbox',
				'FormInput__input-wrapper--consent': input.type === 'consent',
				'FormInput__input-wrapper--date': input.type === 'date',
				'FormInput__input-wrapper--select': input.type === 'select',
			}"
		>
			<component
				:is="fieldComponent"
				:id="id"
				:disabled="disabled"
				:input="input"
				@update="onUpdate"
			/>
		</div>
	</div>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.FormInput {
		--form-input-width: 100%;
		--form-input-border-color: rgb(from currentColor r g b / 50%);
		--form-input-border-color-focus: currentColor;
		--form-input-box-shadow-focus: 0 0 0 2px rgb(from currentColor r g b / 15%);

		&--width-half {
			@media (--screen-desktop) {
				--form-input-width: 50%;
			}
		}

		&--hidden {
			display: none;
		}

		font: var(--font-body);
		width: var(--form-input-width);
		padding-top: var(--form-gap-y);
		padding-left: var(--form-gap-x);
		text-align: left;

		&__label {
			display: block;
			padding-bottom: var(--space-sm);
			pointer-events: all;
			cursor: default;
			color: currentColor;
			white-space: nowrap;

			&:is(label) {
				cursor: pointer;
			}
		}

		&__error-message {
			grid-area: end;
			color: rgb(from currentColor r g b / 50%);
		}

		&__input-wrapper {
			position: relative;

			&:not(.FormInput__input-wrapper--checkbox):not(.FormInput__input-wrapper--consent) {
				&::after {
					content: '';
					position: absolute;
					inset: 0;
					pointer-events: none;
					box-shadow: var(--form-input-box-shadow-focus);
					opacity: 0;
					transition: opacity var(--transition-fast-ease);
				}

				&:focus-within::after {
					opacity: 1;
				}
			}

			&--checkbox {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: var(--space-md);
			}
		}

		&__input-icon {
			position: absolute;
			right: 15px;
			top: 50%;
			transform: translateY(-50%);
			width: 15px;
			height: auto;
			pointer-events: none;
			color: currentColor;
		}

		&__input {
			position: relative;
			background-color: transparent;
			color: currentColor;
			border-radius: 0;
			border: 1px solid var(--form-input-border-color);
			width: 100%;
			padding: 15px;
			text-align: inherit;
			outline: none;
			transition:
				background-color var(--transition-fast-ease),
				border-color var(--transition-fast-ease),
				color var(--transition-fast-ease);

			&::placeholder {
				color: rgb(from currentColor r g b / 25%);
				transition: opacity var(--transition-fast-ease);
			}

			&:focus {
				border-color: var(--form-input-border-color-focus);

				&::placeholder {
					opacity: 0;
				}
			}
		}
	}
</style>
