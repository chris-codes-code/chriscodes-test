<script setup>
	const accordionCopy =
		'<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quidem rerum dicta? Odio, cupiditate. At necessitatibus nam vitae officia impedit assumenda consectetur eos quas, porro autem. Laborum molestiae maiores quibusdam! Necessitatibus veniam eaque voluptatum quidem provident laboriosam fugit amet ut accusamus iure placeat ratione possimus libero voluptate, dolor eligendi cumque ea fuga magni cum consequuntur dolorem expedita asperiores.</p>';

	const accordionEntries = [
		{
			title: 'Option 1',
			text: accordionCopy,
			link: {
				text: 'Example link',
				type: 'internal',
				url: '/',
			},
		},
		{
			title: 'Option 2',
			text: accordionCopy,
		},
		{
			title: 'Option 3',
			text: accordionCopy,
		},
	];

	const uiAccordionProps = [
		{
			name: 'entries',
			defaultValue: 'null',
			example: `[{
  title: 'Option 1',
  text: '<p>…</p>',
  link: { text: 'Example', type: 'internal', url: '/' },
}]`,
		},
		{ name: 'disabled', defaultValue: 'false', options: ['true', 'false'] },
	];
</script>

<template>
	<div class="DeveloperComponentLibrarySectionUIAccordion">
		<DeveloperStyleGuidePropsTable
			name="UIAccordion"
			:rows="uiAccordionProps"
		/>

		<div class="DeveloperComponentLibrarySectionUIAccordion__example">
			<UIAccordion :entries="accordionEntries" />
		</div>
	</div>
</template>

<style>
	.DeveloperComponentLibrarySectionUIAccordion {
		&__example {
			margin-top: var(--space-lg);
		}
	}
</style>
