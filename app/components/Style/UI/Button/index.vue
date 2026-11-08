<script setup>
	defineProps({
		theme: {
			default: 'primary',
			type: String,
			validator: (value) => ['primary', 'secondary'].includes(value),
		},
	});
</script>

<template>
	<span
		class="StyleUIButton"
		:class="`StyleUIButton--theme-${theme}`"
	>
		<span class="StyleUIButton__text">
			<slot />
		</span>

		<span
			class="StyleUIButton__bg"
			aria-hidden="true"
		/>
	</span>
</template>

<style>
	.StyleUIButton {
		--style-ui-button-color: var(--theme-color-secondary);
		--style-ui-button-border: color-mix(in srgb, currentColor 20%, transparent);
		--style-ui-button-hover: color-mix(in srgb, currentColor 5%, transparent);
		--style-ui-button-hover-active: color-mix(in srgb, currentColor 15%, transparent);
		--style-ui-button-scale-factor: 4;
		--style-ui-button-size-unit: 40;

		&--theme-secondary {
			--style-ui-button-color: var(--theme-color-primary);
		}

		isolation: isolate;
		position: relative;
		display: block;
		border-radius: 3em;
		font-family: var(--font-family-primary);
		font-size: 0.75rem;
		font-weight: normal;
		font-style: normal;
		line-height: 1.25;
		color: var(--style-ui-button-color);
		white-space: nowrap;
		text-align: center;
		transition: var(--theme-interactive-transition);

		&__text {
			position: relative;
			z-index: 1;
			display: block;
			padding: 1em 2em;
			color: inherit;
		}

		&__bg {
			position: absolute;
			z-index: -1;
			inset: 0;
			border: 1px solid var(--style-ui-button-border);
			border-radius: inherit;
			background-color: transparent;
			scale: 1;
			transition:
				scale 0.5s var(--transition-spring),
				var(--theme-interactive-transition);

			&::after {
				content: '';
				position: absolute;
				inset: 0;
				border-radius: inherit;
				background-color: rgba(0, 0, 0, 0.1);
				opacity: 0;
				transition: opacity 0.3s var(--transition-ease-out);
			}
		}

		button:focus-visible:has(&),
		a:focus-visible:has(&) {
			outline: none;
		}

		a:focus-visible &,
		button:focus-visible & {
			.StyleUIButton__bg {
				background-color: var(--style-ui-button-hover);
				scale: calc(
					(var(--style-ui-button-size-unit) + var(--style-ui-button-scale-factor)) / var(--style-ui-button-size-unit)
				);
			}
		}

		a[data-active='true'] &,
		button[data-active='true'] & {
			.StyleUIButton__bg {
				background-color: var(--style-ui-button-hover-active);
			}
		}

		a:active &,
		button:active & {
			.StyleUIButton__bg::after {
				opacity: 1;
			}
		}

		@media (hover: hover) and (pointer: fine) {
			a:hover &,
			button:not(:disabled):hover & {
				.StyleUIButton__bg {
					background-color: var(--style-ui-button-hover);
					scale: calc(
						(var(--style-ui-button-size-unit) + var(--style-ui-button-scale-factor)) / var(--style-ui-button-size-unit)
					);
				}
			}
		}

		@media (prefers-reduced-motion: reduce) {
			&,
			&__bg,
			&__bg::after {
				transition: none;
			}

			a:focus-visible & &__bg,
			button:focus-visible & &__bg,
			a:hover & &__bg,
			button:hover & &__bg {
				scale: 1;
			}
		}
	}
</style>
