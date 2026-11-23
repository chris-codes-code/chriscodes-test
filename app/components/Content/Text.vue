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

	useScrollAnimation(rootRef, () => import('~/assets/animations/scroll/text.js'), 'animateContentText');
</script>

<template>
	<div
		v-if="text"
		ref="rootRef"
		class="ContentText"
		data-scroll-reveal
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

					<StyleText>
						<PrimitiveHTML :html="text" />
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

		&__split-word {
			display: inline-block;
			will-change: transform, opacity, filter;
		}
	}
</style>
