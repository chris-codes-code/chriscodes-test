<script setup>
	const props = defineProps({
		disabled: {
			default: null,
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
		sending: {
			default: null,
			type: Boolean,
		},
		status: {
			default: null,
			type: String,
		},
		type: {
			default: 'submit',
			type: String,
		},
	});

	const formSubmit = ref(null);
	let formSubmitAnimation = null;
	let formSubmitEl = null;

	const submitCta = props.form.submit?.cta || null;
	const successMessage = props.form.submit?.success?.message || null;
	const successResetText = props.form.submit?.success?.resetText || null;
	const errorMessage = props.form.submit?.error?.message || null;
	const errorResetText = props.form.submit?.error?.resetText || null;

	const emit = defineEmits(['reset-status', 'submit-in', 'notification-in', 'notification-out']);

	onMounted(async () => {
		formSubmitAnimation = (await import('~/assets/animations/form')).animateFormSubmit;
	});

	watch(
		() => props.status,
		(value, previousValue) => {
			if (formSubmitAnimation && formSubmit.value) {
				formSubmitAnimation.toggle(formSubmit.value, value, previousValue, emit);
			}
		},
	);

	onBeforeUnmount(() => {
		formSubmitEl = formSubmit.value;
	});

	onUnmounted(() => {
		if (formSubmitAnimation && formSubmitEl) formSubmitAnimation.cleanup(formSubmitEl);
	});
</script>

<template>
	<div
		ref="formSubmit"
		class="FormSubmit"
	>
		<div class="FormSubmit__section FormSubmit__section--submit">
			<PrimitiveButton
				class="FormSubmit__submit"
				:disabled="disabled"
				:type="type"
			>
				<StyleUIButton>
					<Action :active="sending">
						{{ submitCta }}
					</Action>
				</StyleUIButton>
			</PrimitiveButton>
		</div>

		<div class="FormSubmit__section FormSubmit__section--success">
			<div class="FormSubmit__notice type-body">
				<PrimitiveHTML
					v-if="successMessage"
					:html="successMessage"
				/>

				<PrimitiveButton
					v-if="successResetText"
					class="FormSubmit__action FormSubmit__action--success"
					:gtm="{
						type: 'button',
						category: 'button',
						label: 'form_success_reset',
						clicked_from: `${formName} form`,
					}"
					@click="emit('reset-status')"
				>
					{{ successResetText }}
				</PrimitiveButton>
			</div>
		</div>

		<div class="FormSubmit__section FormSubmit__section--error">
			<div class="FormSubmit__notice type-body">
				<PrimitiveHTML
					v-if="errorMessage"
					:html="errorMessage"
				/>

				<PrimitiveButton
					v-if="errorResetText"
					class="FormSubmit__action"
					:gtm="{
						type: 'button',
						category: 'button',
						label: 'form_error_reset',
						clicked_from: `${formName} form`,
					}"
					@click="emit('reset-status')"
				>
					{{ errorResetText }}
				</PrimitiveButton>
			</div>
		</div>
	</div>
</template>

<style>
	.FormSubmit {
		display: flex;

		&__section {
			position: relative;
			width: 100%;
			flex-shrink: 0;
			opacity: 0;
			visibility: hidden;

			&--submit {
				opacity: 1;
				visibility: visible;
			}

			&--success {
				transform: translate3d(-100%, 0, 0);
			}

			&--error {
				transform: translate3d(-200%, 0, 0);
			}
		}

		&__submit {
			display: block;
			margin: 0;
		}

		&__action {
			opacity: 0.5;
			transition: opacity var(--transition-fast-ease);

			&:hover,
			&:focus-visible {
				opacity: 1;
			}
		}

		&__notice {
			word-break: break-word;
			text-wrap: balance;

			@supports not (text-wrap: balance) {
				text-wrap: pretty;
			}
		}
	}
</style>
