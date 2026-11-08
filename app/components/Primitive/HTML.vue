<script setup>
	defineProps({
		tag: {
			default: 'span',
			type: String,
			validator: (value) => ['div', 'legend', 'p', 'span'].includes(value),
		},
		html: {
			required: true,
			type: String,
		},
	});
</script>

<template>
	<span
		v-if="tag === 'span'"
		v-html="html"
	/>

	<p
		v-else-if="tag === 'p'"
		v-html="html"
	/>

	<div
		v-else-if="tag === 'div'"
		v-html="html"
	/>

	<legend
		v-else-if="tag === 'legend'"
		v-html="html"
	/>
</template>
