<script setup>
	import ContentAccordion from './Accordion.vue';
	import ContentImage from './Image.vue';
	import ContentMasonry from './Masonry.vue';
	import ContentText from './Text.vue';
	import ContentTitle from './Title.vue';
	import ContentWork from './Work.vue';

	const components = {
		ContentAccordion,
		ContentImage,
		ContentMasonry,
		ContentText,
		ContentTitle,
		ContentWork,
	};

	defineProps({
		content: {
			default: null,
			type: Array,
		},
	});
</script>

<template>
	<div
		v-if="content && content.length"
		class="Content"
	>
		<section
			v-for="(entry, index) in content"
			:id="entry.id || undefined"
			:key="`content-entry-${index}`"
			class="Content__section"
			:class="`Content__section--${entry.id}`"
		>
			<component
				:is="components[entry.component]"
				v-if="entry.component"
				v-bind="entry.attrs"
			/>
		</section>
	</div>
</template>

<style>
	.Content {
		/* margin-top: 30px; */

		&__section + &__section {
			margin-top: var(--space-xl);
		}
	}
</style>
