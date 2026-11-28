<script setup>
	defineProps({
		title: {
			default: null,
			type: String,
		},
		text: {
			default: null,
			type: String,
		},
	});

	const rootRef = ref(null);
	let animation = null;
	let rootEl = null;

	onMounted(async () => {
		if (!rootRef.value) return;

		animation = (await import('~/assets/animations/scroll/text.js')).animateContentText;
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
		v-if="text"
		ref="rootRef"
		class="ContentText"
	>
		<BlockContainer>
			<BlockColumns class="ContentText__columns">
				<BlockColumn class="ContentText__column">
					<h2
						v-if="title"
						class="ContentText__title"
					>
						{{ title }}
					</h2>

					<StyleText class="type-body type-body--lg">
						<PrimitiveHTML
							class="ContentText__text"
							:html="text"
						/>
					</StyleText>
				</BlockColumn>
			</BlockColumns>
		</BlockContainer>
	</div>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.ContentText {
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
