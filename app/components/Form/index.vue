<script setup>
	import {
		clearFormInputValues,
		formatFormInputValues,
		getFirstInputError,
		getFormFieldsets,
		isFormValid,
		updateFormInput as updateFormInputUtils,
		validateForm,
	} from '~/utils/form';
	import { config as formConfig } from '~/utils/form/config';

	const { honeypotInput } = formConfig;

	const {
		public: { CLOUDFLARE_TURNSTILE_SITE_KEY: turnstileSiteKey },
	} = useRuntimeConfig();

	const props = defineProps({
		disabled: {
			default: false,
			type: Boolean,
		},
		focus: {
			default: false,
			type: Boolean,
		},
		form: {
			required: true,
			type: Object,
		},
		formName: {
			required: true,
			type: String,
		},
		formSize: {
			default: 'md',
			type: String,
			validator: (value) => ['md', 'lg'].includes(value),
		},
		reset: {
			default: false,
			type: Boolean,
		},
		sending: {
			default: false,
			type: Boolean,
		},
		status: {
			default: null,
			type: String,
		},
	});

	const root = ref(null);
	const turnstile = ref(null);
	const fieldsets = reactive(getFormFieldsets(props.form.fieldsets));
	const submissionAttempt = ref(0);
	const verifying = ref(false);

	const turnstileEnabled = Boolean(turnstileSiteKey);
	const formIsValid = computed(() => isFormValid(fieldsets));
	const formBusy = computed(() => props.disabled || props.sending || verifying.value);

	const classObj = {
		Form: true,
		[`Form--size-${props.formSize}`]: props.formSize,
	};

	const emit = defineEmits([
		'form-reset',
		'notification-in',
		'notification-out',
		'reset-focus',
		'reset-status',
		'submit',
		'submit-in',
	]);

	const submit = async () => {
		if (!submissionAttempt.value) validateForm(fieldsets);
		submissionAttempt.value++;
		if (!formIsValid.value || formBusy.value) return;

		let turnstileToken;
		if (turnstileEnabled) {
			verifying.value = true;
			try {
				turnstileToken = await turnstile.value?.getToken();
			} catch {
				verifying.value = false;
				return;
			}
			verifying.value = false;
			if (!turnstileToken) return;
		}

		emit('submit', formatFormInputValues(fieldsets), turnstileToken);
	};

	const updateFormInput = (name, value, opts = {}) => {
		updateFormInputUtils(fieldsets, name, value, opts);
	};

	provide('updateFormInput', updateFormInput);

	watch(
		() => props.reset,
		(value) => {
			if (value) {
				clearFormInputValues(fieldsets);
				submissionAttempt.value = 0;
				turnstile.value?.reset();
				emit('form-reset');
			}
		},
	);

	watch(
		() => props.focus,
		async (value) => {
			if (value) {
				await nextTick();

				root.value.querySelector('.FormInput input')?.focus();

				emit('reset-focus');
			}
		},
	);

	watch(submissionAttempt, () => {
		if (!formIsValid.value) {
			const firstInputError = getFirstInputError(fieldsets);

			root.value.querySelector(`[name="${firstInputError.name}"]`)?.focus();
		}
	});
</script>

<template>
	<form
		ref="root"
		aria-labelledby="form-legend"
		:class="classObj"
		novalidate
		@submit.prevent="submit"
	>
		<fieldset
			v-for="(fieldset, fieldsetIndex) in fieldsets"
			:key="fieldsetIndex"
			:aria-hidden="fieldset.id === honeypotInput.name || null"
			:class="{
				Form__fieldset: true,
				[`Form__fieldset--id-${fieldset.id}`]: fieldset.id,
			}"
		>
			<PrimitiveHTML
				v-if="fieldset.legend"
				class="Form__legend type-ui"
				tag="legend"
				:html="fieldset.legend"
			/>

			<div class="Form__inputs">
				<FormInput
					v-for="(input, inputIndex) in fieldset.inputs"
					:key="inputIndex"
					:disabled="disabled"
					:form-submission-attempt="submissionAttempt"
					:input="input"
				/>
			</div>
		</fieldset>

		<div
			v-if="form.footnote"
			class="Form__footnote"
		>
			<PrimitiveHTML
				class="type-body"
				tag="p"
				:html="form.footnote"
			/>
		</div>

		<FormTurnstile
			v-if="turnstileEnabled"
			ref="turnstile"
			class="Form__turnstile"
		/>

		<div class="Form__submit">
			<FormSubmit
				:disabled="formBusy"
				:form="form"
				:form-name="formName"
				:sending="sending || verifying"
				:status="status"
				@notification-in="emit('notification-in')"
				@notification-out="emit('notification-out')"
				@submit-in="emit('submit-in')"
				@reset-status="emit('reset-status')"
			/>
		</div>
	</form>
</template>

<style>
	.Form {
		--form-gap-x: 15px;
		--form-gap-y: 15px;

		fieldset + fieldset {
			margin-top: var(--form-gap-y);
		}

		&__fieldset {
			width: 100%;

			&--id-extension {
				position: absolute !important;
				left: -10000px !important;
				top: auto !important;
				width: 1px !important;
				height: 1px !important;
				overflow: hidden !important;
				opacity: 0 !important;
				pointer-events: none !important;
			}
		}

		&__legend {
			margin-bottom: var(--space-sm);
		}

		&__inputs {
			display: flex;
			flex-wrap: wrap;
			margin-top: calc(0px - var(--form-gap-y));
			margin-left: calc(0px - var(--form-gap-x));
		}

		&__footnote {
			margin-top: var(--space-lg);
			text-wrap: balance;

			@supports not (text-wrap: balance) {
				text-wrap: pretty;
			}
		}

		&__submit {
			margin-top: var(--space-lg);
		}
	}
</style>
