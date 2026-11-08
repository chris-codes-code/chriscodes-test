<script setup>
	const props = defineProps({
		children: {
			default: null,
			type: Array,
		},
		name: {
			required: true,
			type: String,
		},
	});

	const code = computed(() => {
		if (!props.children?.length) {
			return `<${props.name} />`;
		}

		const child = props.children[0];

		return `<${props.name}>
  <${child}>
    ...
  </${child}>
</${props.name}>`;
	});
</script>

<template>
	<pre class="DeveloperStyleGuideComponentName"><code>{{ code }}</code></pre>
</template>

<style>
	.DeveloperStyleGuideComponentName {
		margin: 0;
		padding: var(--space-md);
		overflow-x: auto;
		background: rgba(var(--color-black-rgb), 0.04);
		border: 1px solid rgba(var(--color-black-rgb), 0.1);
		white-space: pre;
	}
</style>
