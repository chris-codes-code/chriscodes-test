<template>
	<div class="DeveloperStyleGuideTable">
		<table>
			<slot />
		</table>
	</div>
</template>

<style>
	.DeveloperStyleGuideTable {
		overflow-x: auto;
		max-width: 100%;

		&:not(:first-child) {
			margin-top: var(--space-md);
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

		pre {
			margin: 0;
			font: inherit;
			white-space: pre-wrap;
		}
	}
</style>
