<script setup>
	import { isFormConfigValid } from '~/utils/form';

	const mockFetch = () => new Promise((resolve) => setTimeout(() => resolve({ status: 200 }), 500));

	const { trackSubmission } = useGtm();

	const {
		public: { API_URL, DEFAULT_LOCALE },
	} = useRuntimeConfig();

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

	const submit = async (formData, turnstileToken) => {
		sending.value = true;
		disabled.value = true;

		setTimeout(async () => {
			try {
				const response = await mockFetch(`${API_URL}/${DEFAULT_LOCALE}/api/form`, {
					body: {
						form: {
							data: formData,
							form_id: props.form.id,
						},
						...(turnstileToken && { turnstileToken }),
					},
					method: 'POST',
				});

				if (response.status === 200) {
					status.value = 'success';
					trackSubmission({
						form_name: props.form.name,
						form_location: props.formLocation,
						status: 'success',
					});
				} else throw new Error();
			} catch {
				status.value = 'error';
				trackSubmission({
					form_name: props.form.name,
					form_location: props.formLocation,
					status: 'error',
				});
			}
		}, 1000);
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
