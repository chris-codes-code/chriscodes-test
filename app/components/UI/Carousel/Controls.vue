<script setup>
	const props = defineProps({
		activeSlideIndex: {
			required: true,
			type: Number,
		},
		paginationLength: {
			required: true,
			type: Number,
		},
		loop: {
			default: false,
			type: Boolean,
		},
	});

	defineEmits(['previous', 'next', 'go-to']);

	const isPreviousDisabled = computed(() => !props.loop && props.activeSlideIndex <= 0);
	const isNextDisabled = computed(() => !props.loop && props.activeSlideIndex >= props.paginationLength - 1);
</script>

<template>
	<div class="UICarouselControls">
		<span class="UICarouselControls__counter"> {{ activeSlideIndex + 1 }} / {{ paginationLength }} </span>

		<div class="UICarouselControls__buttons">
			<PrimitiveButton
				label="Previous slide"
				:active="!isPreviousDisabled"
				:disabled="isPreviousDisabled"
				@click="$emit('previous')"
			>
				Previous
			</PrimitiveButton>

			<PrimitiveButton
				label="Next slide"
				:active="!isNextDisabled"
				:disabled="isNextDisabled"
				@click="$emit('next')"
			>
				Next
			</PrimitiveButton>
		</div>

		<div class="UICarouselControls__pagination">
			<PrimitiveButton
				v-for="slideIndex in paginationLength"
				:key="slideIndex - 1"
				:label="`Go to slide ${slideIndex}`"
				class="UICarouselControls__pagination-button"
				:active="slideIndex - 1 === activeSlideIndex"
				@click="$emit('go-to', slideIndex - 1)"
			/>
		</div>
	</div>
</template>

<style>
	.UICarouselControls {
		--ui-carousel-controls-size: 10px;
		--ui-carousel-controls-gap: 10px;

		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--columns-gap-x);
		width: 100%;

		&__counter {
			flex: 1;
		}

		&__buttons {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: var(--columns-gap-x);

			.PrimitiveButton:disabled {
				color: rgb(from currentColor r g b / 25%);
			}
		}

		&__pagination {
			display: flex;
			justify-content: flex-end;
			flex-wrap: wrap;
			flex: 1;
			margin: calc(var(--ui-carousel-controls-gap) * -1);
		}

		&__pagination-button {
			display: block;
			padding: var(--ui-carousel-controls-gap);

			&::before {
				content: '';
				display: block;
				width: var(--ui-carousel-controls-size);
				height: var(--ui-carousel-controls-size);
				border: 1px solid currentColor;
				border-radius: 50%;
			}

			&[data-active='true']::before {
				background: currentColor;
			}

			@media (hover: hover) and (pointer: fine) {
				&:hover::before {
					background: currentColor;
				}
			}

			&:focus-visible::before {
				background: currentColor;
			}
		}
	}
</style>
