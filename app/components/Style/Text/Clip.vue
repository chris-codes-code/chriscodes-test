<template>
	<span class="StyleTextClip">
		<span
			class="StyleTextClip__glow"
			aria-hidden="true"
		/>

		<span class="StyleTextClip__text">
			<slot />
		</span>
	</span>
</template>

<style>
	@property --style-text-clip-accent {
		syntax: '<color>';
		inherits: true;
		initial-value: #dfff4f;
	}

	@property --style-text-clip-violet {
		syntax: '<color>';
		inherits: true;
		initial-value: #b66dff;
	}

	.StyleTextClip {
		--style-text-clip-accent: var(--color-accent);
		--style-text-clip-violet: #b66dff;

		position: relative;
		display: inline-block;
		transition:
			--style-text-clip-accent var(--theme-color-ease),
			--style-text-clip-violet var(--theme-color-ease);

		&__glow {
			display: none;
		}

		&__text {
			display: block;
			color: transparent;
			background:
				radial-gradient(circle at 30% 40%, var(--style-text-clip-accent), transparent 42%),
				radial-gradient(circle at 70% 60%, var(--style-text-clip-violet), transparent 42%),
				linear-gradient(100deg in oklch, var(--style-text-clip-accent), var(--style-text-clip-violet));
			background-size: 160% 160%;
			background-position: 30% 40%;
			-webkit-background-clip: text;
			background-clip: text;
			animation: style-text-clip-shift 9s ease-in-out infinite alternate;
		}

		@supports (mask-clip: text) {
			-webkit-mask-image: linear-gradient(#000, #000);
			mask-image: linear-gradient(#000, #000);
			-webkit-mask-clip: text;
			mask-clip: text;
			-webkit-mask-repeat: no-repeat;
			mask-repeat: no-repeat;

			.StyleTextClip__glow {
				display: block;
				position: absolute;
				inset: -24%;
				pointer-events: none;
				background:
					radial-gradient(circle at 30% 40%, var(--style-text-clip-accent), transparent 42%),
					radial-gradient(circle at 70% 60%, var(--style-text-clip-violet), transparent 42%),
					linear-gradient(100deg in oklch, var(--style-text-clip-accent), var(--style-text-clip-violet));
				filter: blur(60px);
				animation: style-text-clip-drift 9s ease-in-out infinite alternate;
			}

			.StyleTextClip__text {
				background: none;
				animation: none;
			}
		}
	}

	[data-theme='light'] .StyleTextClip {
		--style-text-clip-accent: oklch(from var(--color-accent) 0.58 c h);
		--style-text-clip-violet: oklch(from #b66dff 0.55 c h);
	}

	@keyframes style-text-clip-drift {
		to {
			translate: 10% -8%;
			rotate: 25deg;
			scale: 1.2;
		}
	}

	@keyframes style-text-clip-shift {
		to {
			background-position: 80% 70%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.StyleTextClip {
			transition: none;
		}

		.StyleTextClip__glow,
		.StyleTextClip__text {
			animation: none;
		}
	}
</style>
