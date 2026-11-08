<script setup>
	defineProps({
		title: {
			default: null,
			type: String,
		},
		entries: {
			default: null,
			type: Array,
		},
	});
</script>

<template>
	<div
		v-if="entries"
		class="ContentAccordion"
	>
		<BlockContainer>
			<BlockColumns class="ContentAccordion__columns">
				<BlockColumn class="ContentAccordion__column">
					<h2
						v-if="title"
						class="ContentAccordion__title"
					>
						{{ title }}
					</h2>

					<UIAccordion :entries="entries" />
				</BlockColumn>
			</BlockColumns>
		</BlockContainer>
	</div>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.ContentAccordion {
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
