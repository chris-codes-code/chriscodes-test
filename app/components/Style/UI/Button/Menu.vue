<template>
	<StyleUIButtonDisc>
		<span
			class="StyleUIButtonMenu"
			aria-hidden="true"
		>
			<span class="StyleUIButtonMenu__bar StyleUIButtonMenu__bar--start" />

			<span class="StyleUIButtonMenu__bar StyleUIButtonMenu__bar--center" />

			<span class="StyleUIButtonMenu__bar StyleUIButtonMenu__bar--end" />
		</span>
	</StyleUIButtonDisc>
</template>

<style>
	.StyleUIButtonMenu {
		--style-ui-menu-offset: 6px;
		--style-ui-menu-duration: var(--transition-duration-fast);
		--style-ui-menu-translate-delay: var(--style-ui-menu-duration);
		--style-ui-menu-rotate-delay: 0s;
		--style-ui-menu-opacity-delay: var(--style-ui-menu-duration);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 15px;

		button[data-active='true'] & {
			--style-ui-menu-translate-delay: 0s;
			--style-ui-menu-rotate-delay: var(--style-ui-menu-duration);
			--style-ui-menu-opacity-delay: 0s;
		}

		&__bar {
			width: 100%;
			height: 2px;
			background-color: currentColor;
			transform-origin: center;
			outline: 1px solid transparent;

			&--start,
			&--end {
				rotate: 0deg;
				transition:
					translate var(--style-ui-menu-duration) var(--transition-timing-ease) var(--style-ui-menu-translate-delay),
					rotate var(--style-ui-menu-duration) var(--transition-timing-ease) var(--style-ui-menu-rotate-delay);

				button[data-active='true'] & {
					translate: 0 0;
				}
			}

			&--start {
				margin-bottom: -1px;
				translate: 0 var(--style-ui-menu-offset);

				button[data-active='true'] & {
					rotate: 45deg;
				}
			}

			&--center {
				opacity: 1;
				transition: opacity var(--style-ui-menu-duration) var(--transition-timing-ease)
					var(--style-ui-menu-opacity-delay);

				button[data-active='true'] & {
					opacity: 0;
				}
			}

			&--end {
				margin-top: -1px;
				translate: 0 calc(-1 * var(--style-ui-menu-offset));

				button[data-active='true'] & {
					rotate: -45deg;
				}
			}
		}
	}
</style>
