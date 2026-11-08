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

	const tabs = [
		{
			title: 'General',
			entries: accordionEntries,
		},
		{
			title: 'Facilities',
			entries: accordionEntries.slice(0, 2),
		},
		{
			title: 'Events',
			entries: accordionEntries,
		},
	];

	const uiAccordionTabsProps = [
		{
			name: 'tabs',
			defaultValue: 'null',
			example: `[{
  title: 'General',
  entries: [{ title: 'Option 1', text: '<p>…</p>' }],
}]`,
		},
	];
</script>

<template>
	<div class="DeveloperComponentLibrarySectionUIAccordionTabs">
		<DeveloperStyleGuidePropsTable
			name="UIAccordionTabs"
			:rows="uiAccordionTabsProps"
		/>

		<div class="DeveloperComponentLibrarySectionUIAccordionTabs__example">
			<UIAccordionTabs :tabs="tabs" />
		</div>
	</div>
</template>

<style>
	.DeveloperComponentLibrarySectionUIAccordionTabs {
		&__example {
			margin-top: var(--space-lg);
		}
	}
</style>
