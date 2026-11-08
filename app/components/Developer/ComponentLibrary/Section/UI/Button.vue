<script setup>
	const buttonVariants = [
		{
			label: 'Primary',
			tag: 'StyleUIButton',
			props: {
				theme: 'primary',
			},
		},
		{
			label: 'Secondary',
			tag: 'StyleUIButton',
			props: {
				theme: 'secondary',
			},
		},
		{
			icon: 'menu',
			tag: 'StyleUIButtonIcon',
			props: {},
		},
	];
</script>

<template>
	<div class="DeveloperComponentLibrarySectionUIButton">
		<h3 class="DeveloperComponentLibrarySectionUIButton__heading">Button</h3>

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
					v-for="(variant, index) in buttonVariants"
					:key="index"
				>
					<td>
						<PrimitiveButton :label="variant.icon ? 'Open menu' : null">
							<component
								:is="variant.tag"
								v-bind="variant.props"
							>
								<SVGIcon
									v-if="variant.icon"
									:icon="variant.icon"
								/>

								<template v-else>
									{{ variant.label }}
								</template>
							</component>
						</PrimitiveButton>
					</td>

					<td>
						<code>&lt;{{ variant.tag }} /&gt;</code>
					</td>

					<td>
						<div class="DeveloperComponentLibrarySectionUIButton__props">
							<div
								v-for="(value, name) in variant.props"
								:key="name"
							>
								<code>{{ name }}: {{ value }}</code>
							</div>

							<div v-if="variant.icon">
								<code>slot: {{ variant.icon }}</code>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</DeveloperStyleGuideTable>
	</div>
</template>

<style>
	.DeveloperComponentLibrarySectionUIButton {
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
