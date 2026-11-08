<script setup>
	const linkComponents = [
		{
			tag: 'StyleUILink',
			props: [{ name: 'text', required: true }],
			demoText: 'Book your escape',
		},
	];
</script>

<template>
	<div class="DeveloperComponentLibrarySectionUILink">
		<h3 class="DeveloperComponentLibrarySectionUILink__heading">Link</h3>

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
					v-for="component in linkComponents"
					:key="component.tag"
				>
					<td>
						<PrimitiveLink
							type="internal"
							url="/"
						>
							<StyleUILink :text="component.demoText" />
						</PrimitiveLink>
					</td>

					<td>
						<code>&lt;{{ component.tag }} /&gt;</code>
					</td>

					<td>
						<div class="DeveloperComponentLibrarySectionUILink__props">
							<div
								v-for="prop in component.props"
								:key="prop.name"
							>
								<code>{{ prop.name }}</code>

								<template v-if="prop.required"> (required)</template>

								<template v-else-if="prop.default">
									— default <code>{{ prop.default }}</code>
								</template>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</DeveloperStyleGuideTable>
	</div>
</template>

<style>
	.DeveloperComponentLibrarySectionUILink {
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
