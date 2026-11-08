<script setup>
	const modalSlideOutProps = [
		{ name: 'direction', defaultValue: "'ltr'", options: ["'ltr'", "'rtl'"] },
		{ name: 'isOpen', defaultValue: 'false', options: ['true', 'false'] },
	];

	const modalSlideOutNotes = [
		'Wrap <code>ModalSlideOut</code> in a <code>UI/Modal</code> composition (see <code>UIModalExampleSlideOut</code> / <code>UIModalMenu</code>).',
		'Slots: <code>main</code>, <code>footer</code>. Emits: <code>close-modal</code>.',
	];

	const modalOverlayProps = [{ name: 'isOpen', defaultValue: 'false', options: ['true', 'false'] }];

	const modalOverlayNotes = [
		'Wrap <code>ModalOverlay</code> in a <code>UI/Modal</code> composition (see <code>UIModalExampleOverlay</code>).',
		'Slots: <code>main</code>, <code>footer</code>. Emits: <code>close-modal</code>.',
	];
</script>

<template>
	<div class="DeveloperComponentLibrarySectionUIModal">
		<DeveloperStyleGuidePropsTable
			name="ModalSlideOut"
			:notes="modalSlideOutNotes"
			:rows="modalSlideOutProps"
		/>

		<div class="DeveloperComponentLibrarySectionUIModal__example">
			<UIModalExampleSlideOut />
		</div>

		<DeveloperStyleGuidePropsTable
			name="ModalOverlay"
			:notes="modalOverlayNotes"
			:rows="modalOverlayProps"
			class="DeveloperComponentLibrarySectionUIModal__table"
		/>

		<div class="DeveloperComponentLibrarySectionUIModal__example">
			<UIModalExampleOverlay />
		</div>
	</div>
</template>

<style>
	.DeveloperComponentLibrarySectionUIModal {
		&__example {
			margin-top: var(--space-lg);
		}

		&__table {
			margin-top: var(--space-xl);
		}
	}
</style>
