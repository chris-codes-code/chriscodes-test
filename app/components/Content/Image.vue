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
</script>

<template>
	<div
		v-if="image"
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
