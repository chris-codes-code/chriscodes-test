<script setup>
	defineProps({
		title: {
			default: null,
			type: String,
		},
	});
</script>

<template>
	<div class="Hero">
		<div class="Hero__content">
			<div class="Hero__title-container">
				<BlockContainer>
					<div class="Hero__content-container">
						<!-- <span class="Hero__text type-body type-body--lg"> We are a </span> -->

						<!-- <span /> -->

						<h1
							v-if="title"
							class="Hero__title"
						>
							<StyleTextClip>{{ title }}</StyleTextClip>
						</h1>

						<h1
							v-else
							class="Hero__title"
						>
							Creative Digital Agency
							<!-- <StyleTextClip>Creative Digital Agency</StyleTextClip> -->
						</h1>

						<p class="Hero__text type-body type-body--lg">
							lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Quisquam, quos.
						</p>
					</div>
				</BlockContainer>
			</div>
		</div>
	</div>
</template>

<style>
	.Hero {
		position: relative;
		overflow: hidden;
		/* min-height: 100vh; */
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin-top: calc(var(--core-header-height) * -1);
		/* background-color: var(--color-accent); */

		/* &::before {
			content: '';
			position: absolute;
			z-index: 0;
			inset: -24%;
			pointer-events: none;
			background:
				radial-gradient(circle at 30% 40%, var(--color-accent), transparent 42%),
				radial-gradient(circle at 70% 60%, #b66dff, transparent 42%);
			filter: blur(60px);
			animation: hero-drift 9s ease-in-out infinite alternate;
		}

		> * {
			position: relative;
			z-index: 1;
		} */

		&__content {
			display: grid;
			grid-template-rows: 1fr 1fr;
			width: 100%;
			height: 100%;
			min-height: 100vh;
		}

		&__content-container {
			display: grid;
			grid-template-rows: auto auto 1fr;
			/* flex-direction: column;
			align-items: center; */
			justify-content: center;
			gap: 1vw;
		}

		&__title-container {
			display: flex;
			align-items: flex-end;
			align-items: center;
			justify-content: center;
			padding-top: calc(var(--core-header-height) * 1);
		}

		&__title {
			font-size: 8vw;
			/* transform: translateY(-5%); */
			/* color: var(--color-accent); */
		}

		&__text {
			font-size: 1vw;
			max-width: 40ch;
			margin: 0 auto;
			/* margin-top: 1em; */
		}
	}

	@keyframes hero-drift {
		to {
			translate: 10% -8%;
			rotate: 25deg;
			scale: 1.2;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.Hero::before {
			animation: none;
		}
	}
</style>
