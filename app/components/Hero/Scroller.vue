<script setup>
	const rootRef = ref(null);

	useScrollAnimation(rootRef, () => import('~/assets/animations/scroll/hero.js'), 'animateHeroScroller');
</script>

<template>
	<div
		ref="rootRef"
		class="HeroScroller"
		data-scroll-reveal
	>
		<div class="HeroScroller__container HeroScroller__container--primary">
			<StyleTitlePrimary
				title="code"
				direction="right"
			/>
		</div>

		<div
			id="about"
			class="HeroScroller__region HeroScroller__region--secondary"
		>
			<!-- Outside the GSAP title target — fades in only when the GLB is ready. -->
			<CharacterCompanion />

			<div class="HeroScroller__container HeroScroller__container--secondary">
				<StyleTitlePrimary
					title="create"
					level="span"
				/>
			</div>
		</div>
	</div>
</template>

<style>
	.HeroScroller {
		margin-top: calc(var(--core-header-height) * -1);
		transform-origin: 50% 30%;
		will-change: transform, opacity, filter;

		&__region {
			position: relative;

			&--secondary {
				height: 50vh;
			}
		}

		&__container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 50vh;
			will-change: transform, opacity, filter, clip-path;
			isolation: isolate;

			&--primary {
				padding-top: var(--core-header-height);
			}

			&--secondary {
				position: relative;
				height: 100%;
				padding-bottom: var(--core-header-height);

				.StyleTitlePrimary {
					opacity: 0.25;
				}
			}
		}
	}
</style>
