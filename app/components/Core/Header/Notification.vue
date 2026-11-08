<script setup>
	import PrimitiveLink from '~/components/Primitive/Link.vue';

	const route = useRoute();

	const props = defineProps({
		link: {
			default: null,
			type: Object,
		},
		text: {
			default: null,
			type: String,
		},
	});

	const isCurrentRoute = computed(() => Boolean(props.link?.url && route.path === props.link.url));
</script>

<template>
	<div
		v-if="text"
		class="CoreHeaderNotification"
	>
		<component
			:is="link ? PrimitiveLink : 'div'"
			class="CoreHeaderNotification__wrapper"
			v-bind="link ? { ...link, disabled: isCurrentRoute } : {}"
		>
			<BlockContainer>
				<span class="type-ui type-ui--sm">{{ text }}</span>
			</BlockContainer>
		</component>
	</div>
</template>

<style>
	.CoreHeaderNotification {
		&__wrapper {
			display: flex;
			align-items: center;
			height: var(--core-notification-height);
			background-color: black;
			color: white;
			text-align: center;
		}
	}
</style>
