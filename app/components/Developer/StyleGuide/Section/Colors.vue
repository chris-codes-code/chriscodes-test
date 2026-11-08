<script setup>
	const colors = [
		{
			name: 'Black',
			variable: '--color-black',
			rgbVariable: '--color-black-rgb',
			hex: '#000000',
			rgb: '0, 0, 0',
		},
		{
			name: 'White',
			variable: '--color-white',
			rgbVariable: '--color-white-rgb',
			hex: '#ffffff',
			rgb: '255, 255, 255',
		},
		{
			name: 'Accent',
			variable: '--color-accent',
			rgbVariable: '--color-accent-rgb',
			hex: '#dfff4f',
			rgb: '223, 255, 79',
		},
		{
			name: 'Dark',
			variable: '--color-dark',
			rgbVariable: '--color-dark-rgb',
			hex: '#222522',
			rgb: '34, 37, 34',
		},
	];

	const themeColors = [
		{
			name: 'Primary',
			variable: '--theme-color-primary',
			rgbVariable: '--theme-color-primary-rgb',
		},
		{
			name: 'Secondary',
			variable: '--theme-color-secondary',
			rgbVariable: '--theme-color-secondary-rgb',
		},
	];

	const themeUtilities = ['.--theme', '.--theme-inverse'];
</script>

<template>
	<BlockContainer class="DeveloperStyleGuideSectionColors">
		<h3 class="DeveloperStyleGuideSectionColors__heading">Palette</h3>

		<DeveloperStyleGuideTable>
			<thead>
				<tr>
					<th>Name</th>

					<th>CSS variable</th>

					<th>Hex</th>

					<th>CSS variable (RGB)</th>

					<th>RGB</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="color in colors"
					:key="color.variable"
				>
					<td>
						<div class="DeveloperStyleGuideSectionColors__name">
							<span
								class="DeveloperStyleGuideSectionColors__swatch"
								:class="{ 'DeveloperStyleGuideSectionColors__swatch--bordered': color.variable === '--color-white' }"
								:style="{ backgroundColor: `var(${color.variable})` }"
							/>

							{{ color.name }}
						</div>
					</td>

					<td>
						<code>{{ color.variable }}</code>
					</td>

					<td>
						<code>{{ color.hex }}</code>
					</td>

					<td>
						<code>{{ color.rgbVariable }}</code>
					</td>

					<td>
						<code>{{ color.rgb }}</code>
					</td>
				</tr>
			</tbody>
		</DeveloperStyleGuideTable>

		<h3 class="DeveloperStyleGuideSectionColors__heading">Theme</h3>

		<p class="DeveloperStyleGuideSectionColors__note">
			Semantic theme tokens swap with
			<code>body[data-theme="light|dark"]</code>.
			Utilities:
			<code
				v-for="utility in themeUtilities"
				:key="utility"
			>
				{{ utility }}
			</code>
		</p>

		<DeveloperStyleGuideTable>
			<thead>
				<tr>
					<th>Name</th>

					<th>CSS variable</th>

					<th>CSS variable (RGB)</th>

					<th>Preview</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="color in themeColors"
					:key="color.variable"
				>
					<td>{{ color.name }}</td>

					<td>
						<code>{{ color.variable }}</code>
					</td>

					<td>
						<code>{{ color.rgbVariable }}</code>
					</td>

					<td>
						<span
							class="DeveloperStyleGuideSectionColors__swatch"
							:class="{
								'DeveloperStyleGuideSectionColors__swatch--bordered': color.variable === '--theme-color-primary',
							}"
							:style="{ backgroundColor: `var(${color.variable})` }"
						/>
					</td>
				</tr>
			</tbody>
		</DeveloperStyleGuideTable>
	</BlockContainer>
</template>

<style>
	.DeveloperStyleGuideSectionColors {
		&__heading {
			margin-bottom: var(--space-md);

			&:not(:first-child) {
				margin-top: var(--space-xl);
			}
		}

		&__note {
			margin-bottom: var(--space-md);

			code {
				margin-right: var(--space-xs);
			}
		}

		&__name {
			display: flex;
			align-items: center;
			gap: var(--space-md);
		}

		&__swatch {
			flex-shrink: 0;
			display: block;
			width: 5rem;
			height: 5rem;
			border-radius: 50%;

			&--bordered {
				border: 1px solid rgba(var(--color-black-rgb), 0.15);
			}
		}
	}
</style>
