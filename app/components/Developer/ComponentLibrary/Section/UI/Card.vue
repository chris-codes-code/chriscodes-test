<script setup>
	const cardComponents = [
		{
			tag: 'CardPrimary',
			props: [],
		},
	];
</script>

<template>
	<div class="DeveloperComponentLibrarySectionUICard">
		<h3 class="DeveloperComponentLibrarySectionUICard__heading">Card</h3>

		<DeveloperStyleGuideTable>
			<thead>
				<tr>
					<th>Component</th>

					<th>Code</th>

					<th>Props</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="component in cardComponents"
					:key="component.tag"
				>
					<td>
						<CardPrimary />
					</td>

					<td>
						<code>&lt;{{ component.tag }} /&gt;</code>
					</td>

					<td>
						<span v-if="!component.props.length">—</span>

						<div
							v-else
							class="DeveloperComponentLibrarySectionUICard__props"
						>
							<div
								v-for="prop in component.props"
								:key="prop.name"
							>
								<code>{{ prop.name }}</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</DeveloperStyleGuideTable>
	</div>
</template>

<style>
	.DeveloperComponentLibrarySectionUICard {
		&__heading {
			margin-bottom: var(--space-lg);
		}

		&__props {
			display: flex;
			flex-direction: column;
			gap: var(--space-xs);
		}
	}
</style>
