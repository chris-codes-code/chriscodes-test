<script setup>
	defineProps({
		title: {
			default: null,
			type: String,
		},
		image: {
			default: null,
			type: Object,
		},
	});

	const rootRef = ref(null);
	let animation = null;
	let rootEl = null;

	onMounted(async () => {
		if (!rootRef.value) return;

		animation = (await import('~/assets/animations/scroll/image.js')).animateContentImage;
		animation.init(rootRef.value);
	});

	onBeforeUnmount(() => {
		rootEl = rootRef.value;
	});

	onUnmounted(() => {
		if (animation && rootEl) animation.cleanup(rootEl);
	});
</script>

<template>
	<div
		v-if="image"
		ref="rootRef"
		class="ContentImage"
	>
		<BlockContainer>
			<BlockColumns class="ContentImage__columns">
				<BlockColumn class="ContentImage__column">
					<h2
						v-if="title"
						class="ContentImage__title"
					>
						{{ title }}
					</h2>

					<MediaImageLazy v-bind="image" />
				</BlockColumn>
			</BlockColumns>
		</BlockContainer>
	</div>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.ContentImage {
		&__columns {
			justify-content: center;
		}

		&__column {
			width: 100%;

			@media (--screen-desktop) {
				width: 50%;
			}
		}

		&__title {
			margin-bottom: var(--space-lg);
		}
	}
</style>
