<template>
	<div class="ComponentLibrary">
		<div class="ComponentLibrary__heading">
			<BlockContainer>
				<span class="ComponentLibrary__subtitle">Chris Codes Launch Kit</span>

				<h1 class="ComponentLibrary__title">Component Library</h1>
			</BlockContainer>
		</div>

		<DeveloperComponentLibrary />
	</div>
</template>

<style>
	.ComponentLibrary {
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
