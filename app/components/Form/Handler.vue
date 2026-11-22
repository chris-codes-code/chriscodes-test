<script setup>
	import { isFormConfigValid } from '~/utils/form';
	import { config as formConfig } from '~/utils/form/config';

	const { trackSubmission } = useGtm();

	const props = defineProps({
		form: {
			required: true,
			type: Object,
			validator: isFormConfigValid,
		},
		formLocation: {
			default: null,
			type: String,
		},
	});

	const disabled = ref(false);
	const focus = ref(false);
	const reset = ref(false);
	const sending = ref(false);
	const status = ref(null);

	const submit = async (formData) => {
		sending.value = true;
		disabled.value = true;

		const honeypotName = formConfig.honeypotInput.name;

		try {
			const response = await $fetch('/api/contact', {
				method: 'POST',
				body: {
					name: formData.name,
					email: formData.email,
					message: formData.message,
					...(formData[honeypotName] ? { [honeypotName]: formData[honeypotName] } : {}),
				},
			});

			if (response.status === 200) {
				status.value = 'success';
				trackSubmission({
					form_name: props.form.name,
					form_location: props.formLocation,
					status: 'success',
				});
			} else {
				throw new Error('Contact request failed');
			}
		} catch {
			status.value = 'error';
			trackSubmission({
				form_name: props.form.name,
				form_location: props.formLocation,
				status: 'error',
			});
		}
	};

	const resetFocus = () => (focus.value = false);

	const notificationIn = () => (sending.value = false);

	const resetStatus = () => {
		if (status.value === 'success') reset.value = true;
		status.value = null;
	};

	const submitIn = () => {
		disabled.value = false;
		focus.value = true;
	};
</script>

<template>
	<Form
		:disabled="disabled"
		:focus="focus"
		:form="form"
		:form-name="form.name"
		:reset="reset"
		:sending="sending"
		:status="status"
		@reset-focus="resetFocus"
		@form-reset="reset = false"
		@notification-in="notificationIn"
		@reset-status="resetStatus"
		@submit="submit"
		@submit-in="submitIn"
	/>
</template>
