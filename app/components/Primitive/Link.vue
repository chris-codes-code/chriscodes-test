<script setup>
	const { trackClick } = useGtm();

	defineOptions({
		inheritAttrs: false,
	});

	const props = defineProps({
		active: {
			default: false,
			type: Boolean,
		},
		disabled: {
			default: false,
			type: Boolean,
		},
		gtm: {
			default: null,
			type: Object,
		},
		label: {
			default: null,
			type: String,
		},
		target: {
			default: '_blank',
			type: String,
		},
		type: {
			default: 'internal',
			type: String,
			validator: (value) => ['external', 'internal'].includes(value),
		},
		url: {
			required: true,
			type: String,
		},
	});

	const emit = defineEmits(['click']);

	const to = computed(() => {
		if (props.type === 'external') return props.url;

		const hashIndex = props.url.indexOf('#');
		if (hashIndex === -1) return props.url;

		return {
			path: props.url.slice(0, hashIndex) || '/',
			hash: props.url.slice(hashIndex),
		};
	});

	const onClick = (event) => {
		if (props.disabled) return;
		if (props.gtm) trackClick(props.gtm);
		emit('click', event);
	};
</script>

<template>
	<NuxtLink
		:aria-label="label"
		class="PrimitiveLink"
		:class="[$attrs.class]"
		:data-active="active || null"
		:data-disabled="disabled || null"
		:external="type === 'external'"
		:rel="type === 'external' ? 'noopener noreferrer' : null"
		:target="type === 'external' ? target : null"
		:to="to"
		@click="onClick"
	>
		<slot />
	</NuxtLink>
</template>

<style>
	.PrimitiveLink {
		cursor: pointer;

		&[data-disabled='true'] {
			cursor: default;
			pointer-events: none;
		}
	}
</style>
