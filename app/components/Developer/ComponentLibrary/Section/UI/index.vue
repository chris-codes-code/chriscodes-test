<template>
	<BlockContainer class="DeveloperComponentLibrarySectionUI">
		<div class="DeveloperComponentLibrarySectionUI__entry">
			<DeveloperComponentLibrarySectionUIButton />
		</div>

		<div class="DeveloperComponentLibrarySectionUI__entry">
			<DeveloperComponentLibrarySectionUILink />
		</div>

		<div class="DeveloperComponentLibrarySectionUI__entry">
			<DeveloperComponentLibrarySectionUICard />
		</div>

		<div class="DeveloperComponentLibrarySectionUI__entry">
			<DeveloperComponentLibrarySectionUIModal />
		</div>

		<div class="DeveloperComponentLibrarySectionUI__entry">
			<DeveloperComponentLibrarySectionUIAccordion />
		</div>

		<div class="DeveloperComponentLibrarySectionUI__entry">
			<DeveloperComponentLibrarySectionUIAccordionTabs />
		</div>

		<div class="DeveloperComponentLibrarySectionUI__entry">
			<DeveloperComponentLibrarySectionUICarousel />
		</div>
	</BlockContainer>
</template>

<style>
	.DeveloperComponentLibrarySectionUI {
		&__entry {
			+ .DeveloperComponentLibrarySectionUI__entry {
				margin-top: var(--space-xl);
			}
		}
	}
</style>
