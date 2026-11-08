<script setup>
	const SHOW_COOKIES_DELAY = 2000;

	const route = useRoute();
	const { showCookies, showCookiesAfterDelay, accept, decline } = useCookieConsent();
	const { trackPageView } = useGtm();

	async function onAccept() {
		await accept();
		trackPageView(route.fullPath, document.title);
	}

	onMounted(() => {
		showCookiesAfterDelay(SHOW_COOKIES_DELAY);
	});
</script>

<template>
	<ClientOnly>
		<Teleport
			defer
			to="#layout-overlay"
		>
			<Transition name="fade-in-up">
				<div
					v-if="showCookies"
					class="CoreCookies"
				>
					<BlockContainer>
						<div class="CoreCookies__panel --theme">
							<div class="CoreCookies__content">
								<p class="CoreCookies__title type-heading type-heading--h3">Cookies Policy</p>

								<StyleText>
									<p class="CoreCookies__text">
										We use cookies to run this site. Optional analytics show us how the site is used so we can improve
										it. See our
										<PrimitiveLink url="/privacy-policy">Privacy Policy</PrimitiveLink>.
									</p>
								</StyleText>

								<div class="CoreCookies__buttons">
									<PrimitiveButton
										class="CoreCookies__button"
										label="Decline cookies"
										@click="decline"
									>
										<StyleUIButton>Decline</StyleUIButton>
									</PrimitiveButton>

									<PrimitiveButton
										class="CoreCookies__button"
										label="Accept cookies"
										@click="onAccept"
									>
										<StyleUIButton>Accept</StyleUIButton>
									</PrimitiveButton>
								</div>
							</div>
						</div>
					</BlockContainer>
				</div>
			</Transition>
		</Teleport>
	</ClientOnly>
</template>

<style>
	.CoreCookies {
		position: fixed;
		bottom: var(--container-gutter);
		left: 0;
		z-index: 40;
		width: 100%;
		pointer-events: none;

		&__panel {
			position: relative;
			max-width: var(--content-width-sm);
			border-radius: 20px;
			corner-shape: squircle;
			outline: 1px solid color-mix(in srgb, var(--theme-color-primary) 5%, transparent);
			box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
			overflow: visible;
			pointer-events: auto;
		}

		&__content {
			padding: var(--space-lg);
			padding: 40px;
			/* padding: 25px; */
		}

		&__title {
			margin-bottom: var(--space-sm);
			/* font-family: var(--font-family-primary-bold);
			font-size: 1rem;
			line-height: 1.25; */
		}

		/* &__text {
			text-wrap: balance;
		} */

		&__buttons {
			display: flex;
			gap: var(--space-md);
			gap: 15px;

			margin-top: var(--space-md);
		}

		&__button {
			flex: 1;

			.StyleUIButton {
				width: 100%;
				/* font-size: 1rem;
				font-size: 14px; */
				font-size: 0.85rem;
			}
		}
	}
</style>
