<script setup>
	const uiFormExampleProps = [
		{ name: 'form', required: true },
		{ name: 'formLocation', defaultValue: 'null' },
	];

	const uiFormExampleNotes = [
		'Create forms in <code>UI/Form</code> that wrap <code>FormHandler</code> (see <code>UIFormExample</code>).',
	];
</script>

<template>
	<div class="DeveloperComponentLibrarySectionUIForm">
		<DeveloperStyleGuidePropsTable
			name="UIFormExample"
			:notes="uiFormExampleNotes"
			:rows="uiFormExampleProps"
		/>

		<div class="DeveloperComponentLibrarySectionUIForm__example">
			<UIFormExample />
		</div>
	</div>
</template>

<style>
	.DeveloperComponentLibrarySectionUIForm {
		&__example {
			margin-top: var(--space-lg);
		}
	}
</style>
