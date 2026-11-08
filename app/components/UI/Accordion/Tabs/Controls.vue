<script setup>
	defineProps({
		activeTabIndex: {
			required: true,
			type: Number,
		},
		tabs: {
			default: null,
			type: Array,
		},
	});

	const emit = defineEmits(['update-index']);
</script>

<template>
	<div class="UIAccordionTabsControls">
		<PrimitiveButton
			v-for="(tab, index) in tabs"
			:key="`ui-accordion-tabs-control-${index}`"
			class="UIAccordionTabsControls__tab"
			:label="`Click to view ${tab.title} tab`"
			:active="activeTabIndex === index"
			@click="emit('update-index', index)"
		>
			<StyleUILink :text="tab.title" />
		</PrimitiveButton>
	</div>
</template>

<style>
	.UIAccordionTabsControls {
		&__tab {
			display: flex;
			justify-content: flex-start;
			width: 100%;
			padding: var(--space-sm) 0;
		}
	}
</style>
