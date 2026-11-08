<script setup>
	const route = useRoute();
	const { isVisible, isSnap } = useCoreHeaderContext();
	const { isMenuOpen } = useModal();

	defineProps({
		links: {
			default: null,
			type: Array,
		},
	});

	const classObj = computed(() => ({
		'CoreHeader--hidden': !isVisible.value,
		'CoreHeader--snap': isSnap.value,
		'CoreHeader--menu-open': isMenuOpen.value,
	}));
</script>

<template>
	<header
		class="CoreHeader"
		:class="classObj"
	>
		<div class="CoreHeader__main">
			<!-- <CoreHeaderNotification
				v-if="notification"
				:link="notification.link"
				:text="notification.text"
			/> -->

			<BlockContainer>
				<div class="CoreHeader__container">
					<div class="CoreHeader__island">
						<div
							class="CoreHeader__background"
							aria-hidden="true"
						/>

						<CoreHeaderMenu :links="links" />

						<div class="CoreHeader__sections">
							<div class="CoreHeader__section CoreHeader__section--start">
								<div class="CoreHeader__controls">
									<ButtonMenu />

									<ButtonTheme />
								</div>

								<div class="CoreHeader__navigation CoreHeader__navigation--desktop">
									<CoreNavigationDesktop :links="links" />
								</div>
							</div>

							<div class="CoreHeader__section CoreHeader__section--center">
								<PrimitiveLink
									:disabled="route.path === '/'"
									label="Home"
									:url="'/'"
								>
									<SVGIcon
										class="CoreHeader__logo"
										icon="logo"
									/>
								</PrimitiveLink>
							</div>

							<div class="CoreHeader__section CoreHeader__section--end">
								<ButtonProject />
							</div>
						</div>
					</div>
				</div>
			</BlockContainer>
		</div>
	</header>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.CoreHeader {
		--core-header-container-height: 50px;
		--core-header-scale: 1;
		--core-header-opacity: 1;
		--core-header-ease: var(--transition-ease-out);

		pointer-events: none;

		&--hidden {
			--core-header-scale: 0.95;
			--core-header-opacity: 0;
		}

		&__main {
			position: relative;
			pointer-events: auto;
		}

		&__background {
			position: absolute;
			z-index: 0;
			inset: 0;
			background-color: color-mix(in srgb, var(--theme-color-primary) 50%, transparent);
			border-radius: 20px;
			corner-shape: squircle;
			outline: 1px solid color-mix(in srgb, var(--theme-color-secondary) 5%, transparent);
			transition:
				background-color var(--theme-color-ease),
				outline-color var(--theme-color-ease);
			overflow: hidden;
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
			box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		}

		&__container {
			display: flex;
			align-items: center;
			justify-content: center;
			height: var(--core-header-height);
		}

		&__island {
			position: relative;
			margin: 0 auto;
			height: var(--core-header-container-height);
			width: fit-content;
			scale: var(--core-header-scale);
			opacity: var(--core-header-opacity);
			transform-origin: center;
			transition:
				scale 0.3s var(--core-header-ease),
				opacity 0.3s var(--core-header-ease);

			.CoreHeader--hidden & {
				pointer-events: none;
			}

			.CoreHeader--snap & {
				transition: none;
			}
		}

		&__sections {
			position: relative;
			z-index: 1;
			display: flex;
			gap: var(--space-sm);
			padding: 4px;
			height: var(--core-header-container-height);
			max-width: 400px;
			color: var(--theme-color-secondary);
			/* backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
			box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); */
			transition: var(--theme-interactive-transition);

			.CoreHeader--menu-open & {
				color: var(--theme-color-primary);
			}
		}

		&__controls {
			display: flex;
			align-items: stretch;
			gap: var(--space-xs);
			height: 100%;
		}

		&__section {
			display: flex;
			align-items: center;
			height: 100%;

			&--start,
			&--end {
				flex: 1;
			}

			&--start {
				justify-content: flex-start;
			}

			&--center {
				justify-content: center;
			}

			&--end {
				justify-content: flex-end;
			}
		}

		&__navigation {
			&--mobile {
				display: block;

				/* @media (--screen-desktop) {
					display: none;
				} */
			}

			&--desktop {
				display: none;

				/* @media (--screen-desktop) {
					display: block;
				} */
			}
		}

		&__logo {
			width: auto;
			max-width: 100%;
			max-height: 15px;
			position: relative;
			top: -1px;
		}
	}
</style>
