<script setup>
	defineProps({
		formLocation: {
			default: null,
			type: String,
		},
	});

	const form = {
		id: 'example-form',
		name: 'Example form',
		fieldsets: [
			{
				legend: null,
				inputs: [
					{
						label: 'Text',
						name: 'text',
						placeholder: 'Example text',
						required: true,
						type: 'text',
					},
					{
						label: 'Email',
						name: 'email',
						placeholder: 'example@email.com',
						required: true,
						type: 'email',
						width: 'half',
					},
					{
						label: 'Telephone',
						name: 'tel',
						placeholder: '01234 567890',
						required: true,
						type: 'tel',
						width: 'half',
					},
					{
						label: 'Date',
						name: 'date',
						required: true,
						type: 'date',
					},
					{
						label: 'Select',
						name: 'select',
						options: [
							{ disabled: true, label: 'Please select', value: '' },
							{ label: 'Option 1', value: 'option-1' },
							{ label: 'Option 2', value: 'option-2' },
							{ label: 'Option 3', value: 'option-3' },
						],
						required: true,
						type: 'select',
					},
					{
						label: 'Textarea',
						name: 'textarea',
						placeholder: 'Example textarea',
						required: true,
						type: 'textarea',
					},
					{
						label: 'Checkbox',
						name: 'checkbox',
						required: true,
						type: 'checkbox',
					},
					{
						label: 'Checkbox group',
						name: 'checkbox_group',
						options: [
							{ label: 'One', value: 'one' },
							{ label: 'Two', value: 'two' },
							{ label: 'Three', value: 'three' },
						],
						required: true,
						type: 'checkbox',
					},
					{
						description: '<p>You can withdraw consent at any time.</p>',
						label: 'Consent',
						name: 'consent',
						required: true,
						text: 'I agree to the privacy policy',
						type: 'consent',
					},
				],
			},
		],
		footnote: 'This is an example of a form footnote. Submit to preview validation and success states.',
		submit: {
			cta: 'Submit',
			success: {
				message: 'Form submitted successfully. To test the reset functionality, ',
				resetText: 'click here.',
			},
			error: {
				message: 'There was an error. To test the reset functionality, ',
				resetText: 'click here.',
			},
		},
	};
</script>

<template>
	<FormHandler
		:form="form"
		:form-location="formLocation"
	/>
</template>
