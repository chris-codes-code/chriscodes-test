<script setup>
	import { Mousewheel } from 'swiper/modules';

	defineOptions({
		inheritAttrs: false,
	});

	const props = defineProps({
		initialSlide: {
			default: 0,
			type: Number,
		},
	});

	const carouselRef = ref(null);
	const activeSlideIndex = ref(0);
	const paginationLength = ref(0);

	const progressBarStyle = computed(() => {
		if (paginationLength.value <= 1) return {};

		const progress = activeSlideIndex.value / (paginationLength.value - 1);

		return {
			transform: `translate3d(${(progress - 1) * 100}%, 0, 0)`,
		};
	});

	let swiper;
	let isUnmounted = false;

	const previousSlide = () => {
		swiper?.slidePrev();
	};

	const nextSlide = () => {
		swiper?.slideNext();
	};

	const goToSlide = (slideIndex) => {
		swiper?.slideTo(slideIndex);
	};

	onMounted(async () => {
		const { default: Swiper } = await import('swiper');

		if (isUnmounted || !carouselRef.value) return;

		swiper = new Swiper(carouselRef.value, {
			allowTouchMove: true,
			grabCursor: true,
			initialSlide: props.initialSlide,
			modules: [Mousewheel],
			mousewheel: {
				forceToAxis: true,
			},
			slidesPerView: 'auto',
			spaceBetween: 0,
			on: {
				init: (instance) => {
					paginationLength.value = instance.snapGrid.length;
					activeSlideIndex.value = instance.snapIndex;
				},
				slideChange: (instance) => {
					activeSlideIndex.value = instance.snapIndex;
				},
				snapGridLengthChange: (instance) => {
					paginationLength.value = instance.snapGrid.length;
				},
			},
		});

		if (isUnmounted) {
			swiper.destroy();
			swiper = undefined;
		}
	});

	onBeforeUnmount(() => {
		isUnmounted = true;
	});

	onUnmounted(() => {
		swiper?.destroy();
	});
</script>

<template>
	<div class="UICarouselProgress">
		<div
			v-if="paginationLength > 1"
			class="UICarouselProgress__controls"
		>
			<UICarouselControls
				:active-slide-index="activeSlideIndex"
				:pagination-length="paginationLength"
				@previous="previousSlide"
				@next="nextSlide"
				@go-to="goToSlide"
			/>
		</div>

		<div
			ref="carouselRef"
			class="UICarouselProgress__swiper swiper"
		>
			<BlockColumns
				v-bind="$attrs"
				class="swiper-wrapper"
				gap-y="0"
			>
				<slot />
			</BlockColumns>
		</div>

		<div
			v-if="paginationLength > 1"
			class="UICarouselProgress__progress"
		>
			<div
				class="UICarouselProgress__bar"
				:style="progressBarStyle"
			/>
		</div>
	</div>
</template>

<style>
	.UICarouselProgress {
		width: 100%;

		&__controls {
			margin-bottom: var(--space-md);
		}

		&__swiper {
			width: 100%;
		}

		.swiper-wrapper {
			display: flex;
			flex-wrap: nowrap;
		}

		.swiper-slide {
			flex-shrink: 0;

			&:last-child {
				margin-right: calc(0px - var(--block-columns-gap-x));
			}
		}

		&__progress {
			position: relative;
			overflow: hidden;
			margin-top: var(--space-md);
			height: 2px;
			background: rgb(from currentColor r g b / 15%);
		}

		&__bar {
			position: absolute;
			inset: 0;
			background: currentColor;
			transform: translate3d(0, 0, 0);
			transition: transform var(--transition-duration-fast);
		}
	}
</style>
