<script setup>
	const fadeImages = [
		{
			alt: 'Component Library Demo Image 1',
			height: 1350,
			sizes: '400px sm:800px md:1200px',
			src: 'https://placehold.co/2400x1350/jpg',
			width: 2400,
		},
		{
			alt: 'Component Library Demo Image 2',
			height: 1350,
			sizes: '400px sm:800px md:1200px',
			src: 'https://placehold.co/2400x1350/yellow/black/jpg',
			width: 2400,
		},
		{
			alt: 'Component Library Demo Image 3',
			height: 1350,
			sizes: '400px sm:800px md:1200px',
			src: 'https://placehold.co/2400x1350/orange/white/jpg',
			width: 2400,
		},
		{
			alt: 'Component Library Demo Image 4',
			height: 1350,
			sizes: '400px sm:800px md:1200px',
			src: 'https://placehold.co/2400x1350/red/white/jpg',
			width: 2400,
		},
	];

	const uiCarouselProgressProps = [{ name: 'initialSlide', defaultValue: '0' }];

	const uiCarouselFadeProps = [
		{
			name: 'images',
			required: true,
			example: `[{
  src: 'https://placehold.co/2400x1350/jpg',
  alt: 'Example',
  width: 2400,
  height: 1350,
  sizes: '400px sm:800px md:1200px',
}]`,
		},
		{ name: 'autoplay', defaultValue: 'false', options: ['true', 'false'] },
		{ name: 'autoplayDelay', defaultValue: '5000' },
		{ name: 'showControls', defaultValue: 'true', options: ['true', 'false'] },
	];
</script>

<template>
	<div class="DeveloperComponentLibrarySectionUICarousel">
		<div class="DeveloperComponentLibrarySectionUICarousel__entry">
			<DeveloperStyleGuidePropsTable
				:children="['UICarouselProgressSlide']"
				name="UICarouselProgress"
				:rows="uiCarouselProgressProps"
			/>

			<div class="DeveloperComponentLibrarySectionUICarousel__example">
				<UICarouselProgress>
					<UICarouselProgressSlide
						v-for="(_, index) in 8"
						:key="`ui-carousel-slide-progress-${index}`"
						class="DeveloperComponentLibrarySectionUICarousel__slide"
					>
						<CardPrimary />
					</UICarouselProgressSlide>
				</UICarouselProgress>
			</div>
		</div>

		<div class="DeveloperComponentLibrarySectionUICarousel__entry">
			<DeveloperStyleGuideColumns>
				<BlockColumn>
					<DeveloperStyleGuidePropsTable
						name="UICarouselFade"
						:rows="uiCarouselFadeProps"
					/>

					<div class="DeveloperComponentLibrarySectionUICarousel__example">
						<UICarouselFade :images="fadeImages" />
					</div>
				</BlockColumn>

				<BlockColumn>
					<DeveloperComponentLibrarySectionUIForm />
				</BlockColumn>
			</DeveloperStyleGuideColumns>
		</div>
	</div>
</template>

<style>
	.DeveloperComponentLibrarySectionUICarousel {
		&__entry {
			+ .DeveloperComponentLibrarySectionUICarousel__entry {
				margin-top: var(--space-xl);
			}
		}

		&__example {
			margin-top: var(--space-lg);
		}

		&__slide {
			width: calc(2 / var(--columns) * 100%);
		}
	}
</style>
