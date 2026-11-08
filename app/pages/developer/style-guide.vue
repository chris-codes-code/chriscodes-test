<template>
	<div class="StyleGuide">
		<div class="StyleGuide__heading">
			<BlockContainer>
				<span class="StyleGuide__subtitle">Chris Codes Launch Kit</span>

				<h1 class="StyleGuide__title">Style Guide</h1>
			</BlockContainer>
		</div>

		<DeveloperStyleGuide />
	</div>
</template>

<style>
	.StyleGuide {
		&__heading {
			display: flex;
			align-items: center;
			padding: var(--space-xl) 0;
			min-height: 50vh;
			text-wrap: balance;

			@supports not (text-wrap: balance) {
				text-wrap: pretty;
			}
		}

		&__subtitle {
			display: block;
			margin-bottom: var(--space-md);
		}
	}
</style>
