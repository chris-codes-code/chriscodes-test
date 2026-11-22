<script setup>
	const form = {
		id: 'header-contact',
		name: 'Contact',
		fieldsets: [
			{
				legend: null,
				inputs: [
					{
						label: 'Name',
						name: 'name',
						placeholder: 'Your name',
						required: true,
						type: 'text',
					},
					{
						label: 'Email',
						name: 'email',
						placeholder: 'your@email.com',
						required: true,
						type: 'email',
					},
					{
						label: 'Message',
						name: 'message',
						placeholder: 'Hey 👋 hit me up',
						required: true,
						type: 'textarea',
					},
				],
			},
		],
		submit: {
			cta: 'Send',
			success: {
				message: 'Thanks for your message, I’ll be in touch soon.',
				resetText: null,
			},
			error: {
				message: 'Something went wrong. ',
				resetText: 'Try again',
			},
		},
	};
</script>

<template>
	<div class="CoreHeaderContact">
		<FormHandler
			class="CoreHeaderContact__form"
			:form="form"
			form-location="header"
		/>
	</div>
</template>

<style>
	.CoreHeaderContact {
		width: 100%;
		max-width: 360px;
		margin: 0 auto;
		text-align: left;

		&__form {
			width: 100%;

			:deep(.Form) {
				--form-gap-x: 10px;
				--form-gap-y: 10px;
			}

			:deep(.Form__submit) {
				display: flex;
				margin-top: var(--space-md);
			}

			:deep(.FormSubmit) {
				width: 100%;
				overflow: hidden;
			}

			:deep(.FormSubmit__submit) {
				display: flex;
				width: 100%;
			}

			:deep(.FormSubmit__submit .StyleUIButtonIcon) {
				width: 100%;
				justify-content: center;
				min-height: 44px;
				color: var(--theme-color-primary);
				background-color: var(--theme-color-secondary);
				border-color: color-mix(in srgb, var(--theme-color-primary) 8%, transparent);
			}

			:deep(.FormSubmit__submit:hover .StyleUIButtonIcon),
			:deep(.FormSubmit__submit:focus-visible .StyleUIButtonIcon) {
				background-color: color-mix(in srgb, var(--theme-color-secondary) 90%, var(--theme-color-primary));
			}

			:deep(textarea.FormInput__input) {
				min-height: 6.5rem;
			}
		}
	}
</style>
