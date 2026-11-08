<template>
	<BlockColumns class="DeveloperStyleGuideColumns">
		<slot />
	</BlockColumns>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.DeveloperStyleGuideColumns {
		+ .DeveloperStyleGuideColumns {
			margin-top: var(--space-xl);
		}

		.BlockColumn {
			width: 100%;

			@media (--screen-desktop) {
				width: 50%;
			}
		}
	}
</style>
