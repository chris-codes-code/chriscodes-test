<template>
	<div class="StyleText">
		<slot />
	</div>
</template>

<style>
	.StyleText {
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		.type-heading {
			&:not(:last-child) {
				margin-bottom: var(--space-lg);
			}

			&:not(:first-child) {
				margin-top: var(--space-lg);
			}
		}

		p,
		.type-body,
		ul,
		ol,
		table,
		blockquote,
		&__table-wrapper {
			&:not(:last-child) {
				margin-bottom: var(--space-md);
			}
		}

		ul {
			list-style-type: disc;
			list-style-position: inside;
		}

		ol {
			list-style-type: decimal;
			list-style-position: inside;
		}

		li + li {
			margin-top: var(--space-md);
		}

		a {
			text-decoration: underline;
			text-underline-offset: 0.15em;
			transition: text-decoration-thickness var(--transition-fast-ease);

			&:hover,
			&:focus-visible {
				text-decoration-thickness: 2px;
			}
		}

		&__table-wrapper {
			overflow-x: auto;
			max-width: 100%;
		}

		table {
			width: 100%;
			border-collapse: collapse;
		}

		th,
		td {
			padding: 0.75rem 1rem;
			text-align: left;
			border: 1px solid rgba(var(--color-black-rgb), 0.1);
			vertical-align: top;
		}

		th {
			font-weight: bold;
			background: rgba(var(--color-black-rgb), 0.025);
		}

		hr {
			border: none;
			border-top: 1px solid currentColor;
			margin: var(--space-xl) 0;
		}
	}
</style>
