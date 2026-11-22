<script setup>
	const rootRef = ref(null);

	if (import.meta.client) {
		document.documentElement.setAttribute('data-intro', 'pending');
	}

	useScrollAnimation(rootRef, () => import('~/assets/animations/scroll/hero.js'), 'animateHeroScroller');
</script>

<template>
	<div
		ref="rootRef"
		class="HeroScroller"
	>
		<div class="HeroScroller__container HeroScroller__container--primary">
			<StyleTitlePrimary
				title="code"
				direction="right"
			/>
		</div>

		<div
			id="about"
			class="HeroScroller__container HeroScroller__container--secondary"
		>
			<CharacterCompanion />

			<StyleTitlePrimary
				title="create"
				level="span"
			/>
		</div>
	</div>
</template>

<style>
	.HeroScroller {
		margin-top: calc(var(--core-header-height) * -1);
		transform-origin: 50% 30%;
		will-change: transform, opacity, filter;

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
				padding-bottom: var(--core-header-height);

				.StyleTitlePrimary {
					opacity: 0.25;
				}
			}
		}
	}
</style>
